import { Request, Response } from "express";
import ConversationService from "../services/ConversationService";

class ConversationController{
    public async getConversation(req: Request, res: Response){
        const { memberOneId , memberTwoId } = req.query;
        if(!memberOneId || !memberTwoId){
            res.status(400).json({message : "Both memberOneId and memberTwoId are required"});
            return;
        }
        try {
            const conversation = await ConversationService.getOrCreateConversation(String(memberOneId), String(memberTwoId));
            res.json(conversation);
        }
        catch(err: any){
            res.status(500).json(err);
        }
    }
}

export default new ConversationController();