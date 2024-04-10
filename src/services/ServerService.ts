import { Request } from 'express';
import { DB } from '../../prisma/DB';
import {v4 as uuidv4} from 'uuid';
class ServerService{
    
    public async createServer(req: Request){
        const {name , imageUrl} = req.body;
        
        // lấy profile bang email
        let profile : any = await DB.user.findFirst({
            where :{
                email : req.body.info.email
            },
            include :{
                profile : true
            }
        });
        profile = profile?.profile;
        if(!profile){
            throw new Error('Profile not found');
        }
        const newServer = await DB.server.create({
            data:{
                profileId : profile.id,
                name,
                imageUrl,
                inviteCode : uuidv4(),
                channels : {
                    create : [
                        {name : 'general' ,profileId : profile.id},
                    ]
                },
                members : {
                    create : [
                        {profileId : profile.id, role : 'ADMIN'}
                    ]
                }
            }
    
        });
        return newServer;
    }
}

export default new ServerService();