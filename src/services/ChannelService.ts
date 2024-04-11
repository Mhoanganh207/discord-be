import { Request } from "express";
import { DB } from "../../prisma/DB";

class ChannelService{

    
    public async createChannel(req : Request){
        const {name, type } = req.body;
        // @ts-ignore
        // serverId là id của server mà channel sẽ được tạo
        const serverId : string = req.query.serverId;
        const profileId = req.body.info.profileId;

        return await DB.server.update({
            where : {
                id : serverId,
                members :{
                    some :{
                        profileId : profileId,
                        role : {in : ['ADMIN' , 'MODERATOR']}
                    }
                }
            },
            data : {
                channels : {
                    create : [
                        {
                            name : name,
                            type : type,
                            profileId : profileId
                        }
                    ]
                }
            }
        })
    }

}

export default new ChannelService();