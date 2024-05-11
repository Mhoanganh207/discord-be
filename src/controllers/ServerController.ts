import { Request, Response } from "express";
import ServerService from "../services/ServerService";

class ServerController{

    // tạo server
    public async createServer(req: Request, res: Response){
        const newServer = await ServerService.createServer(req);
        res.json(newServer);
    }
    
    // get  server theo id
    public async getServerById(req : Request, res : Response){
        const server = await ServerService.getServerById(req);
        res.json(server)
    }

    // get all server mà profile tham gia
    public async getServers(req : Request, res : Response){
        const profileId = req.body.info.profileId;
        res.json(await ServerService.getAllServer(profileId));
    }

    // member bất kỳ trừ admin rời server
    public async leaveServer(req : Request, res : Response){
        if(!req.params.id){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        const server = await ServerService.leaveServer(req);
        res.json(server);
    }

    // admin xóa server
    public async deleteServer(req : Request, res : Response){
        if(!req.params.id){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        const server = await ServerService.deleteServer(req);
        res.json(server);
    }

    public async newInviteCode(req : Request, res : Response){
        if(!req.params.id){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        const server =  await ServerService.newInviteCode(req);
        res.json(server);
    }

    public async joinServer(req : Request, res : Response){
        if(!req.params.inviteCode){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        const server =  await ServerService.joinServer(req);
        res.json(server);
    }

    public async updateServer(req : Request, res : Response){
        if(!req.params.id){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        const server =  await ServerService.updateServer(req);
        res.json(server);
    }



}


export default new ServerController();