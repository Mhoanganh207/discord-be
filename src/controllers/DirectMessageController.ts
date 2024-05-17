import { Request, Response } from "express";
import DirectMessageService from "../services/DirectMessageService";

class DirectMessageController {

    public async getMessages(req: Request, res: Response) {
        if (!req.query.conversationId) {
            res.status(400).json({ message: "Conversation id is required" });
            return;
        }
    
        try {
            
            await DirectMessageService.getDirectMessages(req, res);
        } catch (err) {
            
            res.status(500).json({ message: "Internal server error" });
        }
    }


    public async sendMessage(req: Request, res: Response) {
        if (!req.query.conversationId) {
            res.status(400).json({ message: "Conversation id is required" });
            return;
        }
    
        try {
            
            const message = await DirectMessageService.createDirectMessage(req, res);
            res.json(message);
        } catch (err) {
            
            res.status(500).json({ message: "Internal server error" });
        }
    }

}


export default new DirectMessageController();