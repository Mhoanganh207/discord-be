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

    public async deleteChannel(req : Request){
        // @ts-ignore
        const channelId : string = req.query.channelId;
        // @ts-ignore
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
                    delete : {
                        id : channelId
                    }
                }
            }
        })
    }

    public async updateChannel(req : Request){
        const {name, type } = req.body;
        // @ts-ignore
        const channelId : string = req.query.channelId;
        // @ts-ignore
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
                    update : {
                        where : {
                            id : channelId
                        },
                        data : {
                            name : name,
                            type : type
                        }
                    }
                }
            }
        })
    }

}

export default new ChannelService();