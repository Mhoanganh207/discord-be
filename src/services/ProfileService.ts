import { Request } from "express";
import { DB } from "../../prisma/DB";

class ProfileService{

    public async createProfile(req : Request){
        const profileId = req.body.info.profileId;
        const name = req.body.name;
        const imageUrl = req.body.imageUrl;
        
        const profile = await DB.profile.update({
            where : {
                id : profileId
            },
            data :{
                name : name,
                imageUrl : imageUrl
            }
        })

        return profile;

    }

    public async getProfile(profileId: string){
        const profile = await DB.profile.findUnique({
            where :{
                id : profileId
            },
            include :{
                user : true
            }
        })

        return profile;
    }

    public async updateProfile(req : Request){

        const profileId = req.body.info.profileId;
        const name = req.body.name;
        const imageUrl = req.body.imageUrl;

        const profile = await DB.profile.update({
            where : {
                id : profileId
            },
            data :{
                name : name,
                imageUrl : imageUrl
            }
        })

        return profile;
    }

}


export default new ProfileService();