import { Request,Response  } from 'express';
import { DB } from '../../prisma/DB';
import {v4 as uuidv4} from 'uuid';
class ServerService{
    
    public async createServer(req: Request){
        const {name , imageUrl} = req.body;
        
    
        // profileId là id của người tạo server được extract từ token 
        let profileId: any = req.body.info.profileId;
        if(!profileId){
            throw new Error('Profile not found');
        }
        // Tam thoi nhu nay 
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
            },
            include :{
                channels :{
                    orderBy :{
                        createdAt : "asc",
                    }
                },
                members :{
                    include : {
                        profile : true
                    },
                    orderBy : {
                        role : "asc"
                    }
                }
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


    public async leaveServer(req : Request){
        const profileId = req.body.info.profileId;
        const server = await DB.server.update({
            where :{
                id : req.params.id,
                profileId : {
                    not : profileId
                },
                members : {
                    some : {
                        profileId : profileId
                    }
                }
            },
            data :{
                 members : {
                        deleteMany : {
                            profileId : profileId
                        }
                 }
            }
        })
        return server;
    }

    public async deleteServer(req : Request){
        const profileId = req.body.info.profileId;
        const server = await DB.server.delete({
            where :{
                id : req.params.id,
                profileId : profileId
            }
        })
        return server;
    }

    public async newInviteCode(req : Request){
        const serverId =  req.params.id;
        const profileId = req.body.info.profileId;
        console.log(serverId);
        console.log(profileId);

        const server =  await DB.server.update({
            where : {
                id : serverId,
                profileId : profileId

            },
            data : {
                inviteCode : uuidv4()
            }
        })

        return server;
    }

    public async joinServer(req : Request){
        const inviteCode = req.params.inviteCode;
        const profileId = req.body.info.profileId;
        
        // Check if the profileId already exists in the server members
        const existingMember = await DB.server.findUnique({
          where: {
            inviteCode: inviteCode,
          },
          select: {
            members: {
              where: {
                profileId: profileId,
              },
            },
          },
        });

        console.log(existingMember);
        
        if (!existingMember || !existingMember.members.length) {
          // If the profileId does not exist, perform the update
          const server = await DB.server.update({
            where: {
              inviteCode: inviteCode,
            },
            data: {
              members: {
                create: [
                  {
                    profileId: profileId,
                  },
                ],
              },
            },
          });
          return server;
        } else {
          // If the profileId already exists, return the existing server data
          return existingMember;
        }
        
    }

    public async updateServer(req : Request){
        const serverId = req.params.id;
        const name = req.body.name;
        const imageUrl = req.body.imageUrl;
        const profileId = req.body.info.profileId;

        const server = await DB.server.update({
            where : {
                id : serverId,
                profileId : profileId
            },
            data : {
                name : name,
                imageUrl : imageUrl
            }
        })
        return server;
    }
}

export default new ServerService();