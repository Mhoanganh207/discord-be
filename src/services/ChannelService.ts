import { Request,Response } from "express";
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
        const channelId : string = req.params.id;
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

    public async updateChannel(req : Request,res : Response){
        const {name, type } = req.body;
        // @ts-ignore
        const channelId : string = req.params.id;
        // @ts-ignore
        const serverId : string = req.query.serverId;
        const profileId = req.body.info.profileId;

        if(name === "general"){
            res.status(400).json({message : "Name cannot be general"});
            return;
        }

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

    public async getChannelById(req: Request,res : Response) {
        // @ts-ignore
        const channelId: string = req.params.id;
        // @ts-ignore
        return await DB.channel.findFirst({
            where: {
                id: channelId,
                server : {
                    members : {
                        some : {
                            profileId : req.body.info.profileId
                        }
                    }
                }
            }
        });
    }
    

}

export default new ChannelService();