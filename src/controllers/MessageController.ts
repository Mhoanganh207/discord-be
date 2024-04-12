import { Request, Response } from "express";
import MessageService from "../services/MessageService";
import { messageValidator } from "../validators/MessageValidator";

class MessageController{

    public async sendMessage(req : Request, res : Response){

        if(!req.query.serverId){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        if(!req.query.channelId){
            res.status(400).json({message : "Channel id is required"});
            return;
        }
        try{
            await messageValidator(req.body);
        }
        catch(err : any){
            res.status(400).json({message : err.message});
            return;
        }
        const message = await MessageService.createMessage(req,res);
        res.json(message);

    }
}