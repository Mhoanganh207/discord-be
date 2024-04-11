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

}

export default new ChannelController();