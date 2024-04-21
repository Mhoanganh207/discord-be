import { Request, Response } from "express";
import MemberService from "../services/MemberService";

class MemberController {

    public async changeMemberRole(req : Request, res : Response){
         if(!req.params.memberId){
            res.status(400).json({message : "Server id is required"});
            return;
         }
        const server = await MemberService.changeMemberRole(req);
        res.json(server);
    }

    public async deleteMember(req : Request, res : Response){
        if(!req.params.memberId){
            res.status(400).json({message : "Server id is required"});
            return;
        }
        const server = await MemberService.deleteMember(req);
        res.json(server);
    }

    public async getMember(req : Request, res : Response){
        const profileId = req.body.info.profileId;
        const {serverId} = req.query;
        if(!profileId || !serverId){
            res.status(400).json({message : "Both profileId and serverId are required"});
            return;
        }
        const server = await MemberService.getMember(String(serverId), String(profileId));
        res.json(server);
    }
}

export default new MemberController();