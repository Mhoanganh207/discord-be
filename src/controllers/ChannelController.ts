import { Request, Response } from "express";
import ChannelService from "../services/ChannelService";
import { channelValidator } from "../validators/ChannelValidator";

class ChannelController {

    public async createChannel(req: Request, res: Response) {
         try {
            await channelValidator({name: req.body.name, type: req.body.type});
            const newChannel = await ChannelService.createChannel(req);
            res.json(newChannel);
         }
         catch(err: any){
             res.status(400).json(err);
         }
    }


    public async deleteChannel(req: Request, res: Response) {
        const channelId : string = req.params.id;
        const serverId : string = req.query.serverId as string;
        if(!channelId){
            res.status(400).json({message : "Channel id is required"});
            return;
        }
        if(!serverId){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        try {
            const deletedChannel = await ChannelService.deleteChannel(req);
            res.json(deletedChannel);
        }
        catch(err: any){
            res.status(400).json(err);
        }
    }

    public async updateChannel(req: Request, res: Response) {
        const channelId : string = req.params.id;
        const serverId : string = req.query.serverId as string;
        if(!channelId){
            res.status(400).json({message : "Channel id is required"});
            return;
        }
        if(!serverId){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        try {
            const channel = await ChannelService.updateChannel(req,res);
            res.json(channel);
        }
        catch(err: any){
            res.status(400).json(err);
        }
    }

    public async getChannelById(req: Request, res: Response) {
        const channelId : string = req.params.id;
        if(!channelId){
            res.status(400).json({message : "Channel id is required"});
            return;
        }
        try {
            const channel = await ChannelService.getChannelById(req,res);
            res.json(channel);
        }
        catch(err: any){
            res.status(400).json(err);
        }
    }

}

export default new ChannelController();