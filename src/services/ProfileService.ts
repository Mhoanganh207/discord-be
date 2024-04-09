import { DB } from "../../prisma/DB";

class ProfileService{

    public async createProfile(profile: any){

    }

    public async getProfile(profileId: any){
        const profile = await DB.profile.findUnique({
            where :{
                id : profileId
            }
        })

        return profile;
    }

}


export default new ProfileService();