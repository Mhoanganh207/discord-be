import { Request } from 'express';
import { DB } from '../../prisma/DB';
import { v4 as uuidv4 } from 'uuid';
import AsyncLock from 'async-lock';

const lock = new AsyncLock();
class ServerService {



    public async createServer(req: Request) {
        const { name, imageUrl } = req.body;


        // profileId là id của người tạo server được extract từ token 
        let profileId: any = req.body.info.profileId;
        if (!profileId) {
            throw new Error('Profile not found');
        }
        // Tam thoi nhu nay 
        const newServer = await DB.server.create({
            data: {
                profileId: profileId,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        { name: 'general', profileId: profileId },
                    ]
                },
                members: {
                    create: [
                        { profileId: profileId, role: 'ADMIN' }
                    ]
                }
            }

        });
        return newServer;
    }

    public async getServerById(req: Request) {
        const profileId = req.body.info.profileId;
        const id = req.params.id;
        return await DB.server.findFirst({
            where: {
                id: id,
                members: {
                    some: {
                        profileId: profileId
                    }
                }
            },
            include: {
                channels: {
                    orderBy: {
                        createdAt: "asc",
                    }
                },
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });
    }

    public async getAllServer(profileId: string) {
        const servers = await DB.server.findMany({
            where: {
                members: {
                    some: {
                        profileId: profileId
                    }

                }
            }
        })
        return servers;
    }


    public async leaveServer(req: Request) {
        const profileId = req.body.info.profileId;
        const server = await DB.server.update({
            where: {
                id: req.params.id,
                profileId: {
                    not: profileId
                },
                members: {
                    some: {
                        profileId: profileId
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profileId
                    }
                }
            }
        })
        return server;
    }

    public async deleteServer(req: Request) {
        const profileId = req.body.info.profileId;
        const server = await DB.server.delete({
            where: {
                id: req.params.id,
                profileId: profileId
            }
        })
        return server;
    }

    public async newInviteCode(req: Request) {
        const serverId = req.params.id;
        const profileId = req.body.info.profileId;

        const server = await DB.server.update({
            where: {
                id: serverId,
                profileId: profileId

            },
            data: {
                inviteCode: uuidv4()
            }
        })

        return server;
    }



    public async joinServer(req: Request) {
        const inviteCode = req.params.inviteCode;
        const profileId = req.body.info.profileId;

        try {
            const server = await lock.acquire(inviteCode, async () => {
                // Kiểm tra xem profileId đã tồn tại trong các thành viên của server chưa
                const serverData = await DB.server.findUnique({
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

                if (!serverData || !serverData.members.length) {
                    // Nếu profileId không tồn tại, thực hiện cập nhật
                    const updatedServer = await DB.server.update({
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
                    return updatedServer;
                } else {
                    // Nếu profileId đã tồn tại, trả về dữ liệu server hiện tại
                    return serverData;
                }
            });

            return server;
        } catch (error) {
            console.error(error);
            throw new Error('Không thể tham gia vào server.');
        }
    }


    public async updateServer(req: Request) {
        const serverId = req.params.id;
        const name = req.body.name;
        const imageUrl = req.body.imageUrl;
        const profileId = req.body.info.profileId;

        const server = await DB.server.update({
            where: {
                id: serverId,
                profileId: profileId
            },
            data: {
                name: name,
                imageUrl: imageUrl
            }
        })
        return server;
    }
}

export default new ServerService();