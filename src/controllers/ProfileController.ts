import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";

class ProfileController {

     public async getProfile(req: Request, res: Response) {
          try {
               const profile = await ProfileService.getProfile(req.body.info.profileId);
               res.status(200).json(profile);
          }
          catch (err: any) {
               res.status(500).json(err);
          }
     }

     public async createProfile(req: Request, res: Response) {
          try {
               const profile = await ProfileService.createProfile(req);
               res.status(201).json(profile);
          }
          catch (err: any) {
               res.status(500).json(err);
          }
     }


     public async updateProfile(req: Request, res: Response) {
          try {
               const profile = await ProfileService.updateProfile(req);
               res.status(200).json(profile);
          }
          catch (err: any) {
               res.status(500).json(err);
          }
     }
}

export default new ProfileController();