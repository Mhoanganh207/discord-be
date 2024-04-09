import { Request, Response } from "express";
import ServerService from "../services/ServerService";

class ServerController{


    public async createServer(req: Request, res: Response){
        const newServer = await ServerService.createServer(req);
        res.json(newServer);
    }
}


export default new ServerController();