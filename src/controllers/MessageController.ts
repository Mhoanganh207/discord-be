import { Request, Response } from "express";
import MessageService from "../services/MessageService";

class MessageController {
    public async sendMessage(req: Request, res: Response) {
        if (!req.query.serverId) {
            res.status(400).json({ message: "Server id is required" });
            return;
        }
        if (!req.query.channelId) {
            res.status(400).json({ message: "Channel id is required" });
            return;
        }

        try {
            // Call the service to create the message
            const message = await MessageService.createMessage(req, res);
            res.json(message);
        } catch (err) {
            // Handle any errors from the service
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public async getMessages(req: Request, res: Response) {
        if (!req.query.channelId) {
            res.status(400).json({ message: "Channel id is required" });
            return;
        }
    
        try {
            // Call the service to get messages
            await MessageService.getMessages(req, res);
        } catch (err) {
            // Handle any errors from the service
            res.status(500).json({ message: "Internal server error" });
        }
    }
    
}

export default new MessageController();
