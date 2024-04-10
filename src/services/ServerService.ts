import { Request } from 'express';
import { DB } from '../../prisma/DB';
import {v4 as uuidv4} from 'uuid';
class ServerService{
    
    public async createServer(req: Request){
        const {name , imageUrl} = req.body;
        
        // lấy profile bang email
     
        let profileId: any = req.body.info.profileId;
        if(!profileId){
            throw new Error('Profile not found');
        }
        const newServer = await DB.server.create({
            data:{
                profileId : profileId,
                name,
                imageUrl,
                inviteCode : uuidv4(),
                channels : {
                    create : [
                        {name : 'general' ,profileId : profileId},
                    ]
                },
                members : {
                    create : [
                        {profileId : profileId, role : 'ADMIN'}
                    ]
                }
            }
    
        });
        return newServer;
    }
    
    public async getServerById(req : Request){
        const profileId = req.body.info.profileId;
        const id =  req.params.id;
        return await DB.server.findFirst({
            where : {
                id : id,
                profileId : profileId
            }
        });
    }

    public async getAllServer(profileId : string){
         console.log(profileId);
         const servers = await DB.server.findMany({
            where :{
                profileId : profileId
            }
         })
         return servers;
    }
}

export default new ServerService();