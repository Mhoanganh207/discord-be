import { Request } from "express";
import { DB } from "../../prisma/DB";

class MemberService {

    public async changeMemberRole(req : Request){
        const profileId = req.body.info.profileId;
        const serverId = req.body.serverId;
        const memberId = req.params.memberId;
        const role = req.body.roles;

        const server = await DB.server.update({
            where : {
                id : serverId,
                profileId : profileId
            },
            data : {
                members : {
                    update : {
                        where : {
                            id : memberId,
                            profileId : {
                                not : profileId
                            }
                        },
                        data : {
                            role : role
                        }
                    }
                }
            },
            include : {
                members : {
                    include : {
                        profile : true
                    },
                    orderBy : {
                        role : "asc"
                    }
                }
            }
        });
        return server;
    }

    public async deleteMember(req : Request){
        const profileId = req.body.info.profileId;
        const serverId = req.params.serverId;
        const memberId = req.params.memberId;

        const server = await DB.server.update({
            where : {
                id : serverId,
                profileId : profileId
            },
            data : {
                members : {
                    deleteMany : {
                        id : memberId,
                        profileId : {
                            not : profileId
                        }
                    }
                }
            },
            include : {
                members : {
                    include : {
                        profile : true
                    },
                    orderBy : {
                        role : "asc"
                    }
                }
            }
        });
        return server;
    }

    public async getMember(serverId: string, profileId: string){
        return await DB.member.findFirst({
            where : {
                serverId : serverId,
                profileId : profileId
            },
            include : {
                profile : true
            }
        });
    }
}

export default new MemberService();