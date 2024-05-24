import { Request, Response } from "express";
import ServerService from "../services/ServerService";

class ServerController {

    // tạo server
    public async createServer(req: Request, res: Response) {
        try {
            const newServer = await ServerService.createServer(req);
            res.json(newServer);
        }
        catch (err: any) {
            res.status(500).json(err);

        }
    }

    // get  server theo id
    public async getServerById(req: Request, res: Response) {
        try {
            const server = await ServerService.getServerById(req);
            res.json(server);
        }
        catch (err: any) {
            res.status(500).json(err);
        }
    }

    // get all server mà profile tham gia
    public async getServers(req: Request, res: Response) {
        try {
            const profileId = req.body.info.profileId;
            res.json(await ServerService.getAllServer(profileId));
        }
        catch (err: any) {
            res.status(500).json(err);
        }
    }

    // member bất kỳ trừ admin rời server
    public async leaveServer(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(400).json({ message: "Server id is required" });
            return;
        }
        try {
            const server = await ServerService.leaveServer(req);
            res.json(server);
        }
        catch (err: any) {
            res.status(500).json(err);
        }

    }

    // admin xóa server
    public async deleteServer(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(400).json({ message: "Server id is required" });
            return;
        }
        try {
            const server = await ServerService.deleteServer(req);
            res.json(server);
        }
        catch (err: any) {
            res.status(500).json(err);
        }
    }

    public async newInviteCode(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(400).json({ message: "Server id is required" });
            return;
        }
        try {
            const server = await ServerService.newInviteCode(req);
            res.json(server);
        }
        catch (err: any) {
            res.status(500).json(err);
        }
    }

    public async joinServer(req: Request, res: Response) {
        if (!req.params.inviteCode) {
            res.status(400).json({ message: "Server id is required" });
            return;
        }
        try {
            const server = await ServerService.joinServer(req);
            res.json(server);
        }
        catch (err: any) {
            res.status(500).json(err);
        }
    }

    public async updateServer(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(400).json({ message: "Server id is required" });
            return;
        }
        try {
            const server = await ServerService.updateServer(req);
            res.json(server);
        }
        catch (err: any) {
            res.status(500).json(err);
        }
    }



}


export default new ServerController();