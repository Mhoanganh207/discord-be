import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";

class ProfileController{
 
     public async getProfile(req: Request, res: Response){
            const profile = await ProfileService.getProfile(req.body.info.profileId);
            res.json(profile);
     }
}

export default new ProfileController();