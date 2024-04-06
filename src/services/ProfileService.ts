import { db } from "../../prisma/db";

class ProfileService{

    public async createProfile(profile: any){

    }

    public async getProfile(profileId: any){
        const profile = await db.profile.findUnique({
            where :{
                id : profileId
            }
        })

        return profile;
    }

}


export default new ProfileService();