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
        try {
            const deletedChannel = await ChannelService.deleteChannel(req);
            res.json(deletedChannel);
        }
        catch(err: any){
            res.status(400).json(err);
        }
    }

    public async updateChannel(req: Request, res: Response) {
        try {
            const channel = await ChannelService.updateChannel(req,res);
            res.json(channel);
        }
        catch(err: any){
            res.status(400).json(err);
        }
    }

}

export default new ChannelController();