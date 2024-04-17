import { Request, Response } from "express";
import { DB } from "../../prisma/DB";
import io from "../app"

class MessageService {
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
}

export default new MessageService();