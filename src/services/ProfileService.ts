import { DB } from "../../prisma/DB";

class ProfileService{

    public async createProfile(profile: any){

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

}


export default new ProfileService();