import { DirectMessage } from "@prisma/client";
import { DB } from "../../prisma/DB";
import { Request, Response } from "express";
import io from "../app";

 class DirectMessageService {


    private MESSAGE_BATCH : number = 10;



    public async createDirectMessage(req: Request, res: Response): Promise<any> {
        const { content, fileUrl } = req.body;
        const conversationId = req.query.conversationId;
        const profileId = req.body.info.profileId;



        const conversation = await DB.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR : [
                    {
                        memberOne : {
                            profileId : profileId
                        },
                    },
                    {
                        memberTwo : {
                            profileId : profileId
                        }
                    }
                    
                ],
            },
            include: {
                memberOne : {
                    include : {
                        profile : true
                    }
                },
                memberTwo : {
                    include : {
                        profile : true
                    }
                }
            }
        });
        if (!conversation) {
            res.status(404).json({ message: "Conversation not found" });
            return;
        }

        const member = conversation.memberOne.profileId === profileId ? conversation.memberOne : conversation.memberTwo;

        if (!member) {
            res.status(403).json({ message: "You are not a member of this server" });
            return;
        }

        try {
            const message = await DB.directMessage.create({
                data: {
                    content,
                    fileUrl,
                    memberId: member.id,
                    conversationId: conversationId as string
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }
            });
            const channelKey = `chat:${conversationId}:messages`;
            io.emit(channelKey, message);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }


    }

    public async getDirectMessages(req: Request,res: Response): Promise<any> {
        const conversationId = req.query.conversationId;
        const cursor = req.query.cursor;

        const profileId = req.body.info.profileId;

        let messages: DirectMessage[] = [];

        if (cursor) {
            messages = await DB.directMessage.findMany({
                take: this.MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor as string
                },
                where: {
                    conversationId: conversationId as string
                },
                include: {
                    member:
                    {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        } else {
            messages = await DB.directMessage.findMany({
                take: this.MESSAGE_BATCH,
                where: {
                    conversationId: conversationId as string
                },
                include: {
                    member:
                    {
                        include: {
                            profile: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        }
        let nextCursor = null;
        if (messages.length === this.MESSAGE_BATCH) {
            nextCursor = messages[this.MESSAGE_BATCH - 1].id;
        }
        res.json({ items: messages, nextCursor });
        return;
    }


}

export default new DirectMessageService();