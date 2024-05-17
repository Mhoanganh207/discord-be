import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";

class ProfileController {

     public async getProfile(req: Request, res: Response) {
          const profile = await ProfileService.getProfile(req.body.info.profileId);
          res.status(200).json(profile);
     }

     public async createProfile(req: Request, res: Response) {
          const profile = await ProfileService.createProfile(req);
          res.status(201).json(profile);
     }


     public async updateProfile(req: Request, res: Response) {
          const profile = await ProfileService.updateProfile(req);
          res.status(200).json(profile);
     }
}

export default new ProfileController();