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
}

export default new MemberController();