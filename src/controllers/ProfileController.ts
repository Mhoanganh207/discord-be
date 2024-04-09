import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";

class ProfileController{
 
     public async getProfile(req: Request, res: Response){
            console.log(req.params.id);
            const profile = await ProfileService.getProfile(req.params.id);
            res.json(profile);
     }
}

export default new ProfileController();