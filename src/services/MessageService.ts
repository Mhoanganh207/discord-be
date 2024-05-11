import { Request, Response } from "express";
import { DB } from "../../prisma/DB";
import io from "../app"
import { Message } from "@prisma/client";

class MessageService {

    private MESSAGE_BATCH = 20;

    async createMessage(req: Request, res: Response) {

        const { content, fileUrl } = req.body;
        const channelId = req.query.channelId;
        const serverId = req.query.serverId;
        const profileId = req.body.info.profileId;

        const server = await DB.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profileId
                    }
                }
            },
            include: {
                members: true
            }
        });
        if (!server) {
            res.status(404).json({ message: "Server not found" });
            return;
        }


        const channel = await DB.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        });
        if (!channel) {
            res.status(404).json({ message: "Channel not found" });
            return;
        }

        const member = server.members.find((member: any) => member.profileId === profileId);

        if (!member) {
            res.status(403).json({ message: "You are not a member of this server" });
            return;
        }

        try {
            const message = await DB.message.create({
                data: {
                    content,
                    fileUrl,
                    memberId: member.id,
                    channelId: channelId as string
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }
            });
            const channelKey = `chat:${channelId}:messages`;
            io.emit(channelKey, message);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }




    }

    public async getMessages(req: Request, res: Response) {
        const channelId = req.query.channelId;
        const cursor = req.query.cursor;

        const profileId = req.body.info.profileId;

        let messages: Message[] = [];

        if (cursor) {
            messages = await DB.message.findMany({
                take: this.MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor as string
                },
                where: {
                    channelId: channelId as string
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
            messages = await DB.message.findMany({
                take: this.MESSAGE_BATCH,
                where: {
                    channelId: channelId as string
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
        res.json({ messages, nextCursor });

    }
}

export default new MessageService();