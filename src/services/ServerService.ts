import { Request } from 'express';
import { DB } from '../../prisma/DB';
import {v4 as uuidv4} from 'uuid';
class ServerService{
    
    public async createServer(req: Request){
        const {name , imageUrl} = req.body;
        
        // chưa hoàn thiện phải sử dụng middleware để lấy profile
        const profile =  {
            id : "dadkajd"
        };
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