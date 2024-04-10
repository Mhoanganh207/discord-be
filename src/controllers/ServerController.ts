import { Request, Response } from "express";
import ServerService from "../services/ServerService";

class ServerController{


    public async createServer(req: Request, res: Response){
        const newServer = await ServerService.createServer(req);
        res.json(newServer);
    }

    public async getServerById(req : Request, res : Response){
        const server = await ServerService.getServerById(req);
        res.json(server)
    }

    public async getServers(req : Request, res : Response){
        const profileId = req.body.info.profileId;
        res.json(await ServerService.getAllServer(profileId));
    }




}


export default new ServerController();