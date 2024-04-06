import ProfileService from "../services/ProfileService";

class ProfileController{
 
     public async getProfile(req: any, res: any){
            console.log(req.params.id);
            const profile = await ProfileService.getProfile(req.params.id);
            res.json(profile);
     }
}

export default new ProfileController();