import { profile } from "console";
import { DB } from "../../prisma/DB";
import { Member } from '@prisma/client';

class ConversationService{

    public async findConversation(profileId1: string, profileId2: string){
        try {
            return await DB.conversation.findFirst({
              where: {
                 OR : [
                    {
                        profileId1:profileId1,
                        profileId2:profileId2
                    },
                    {
                        profileId1: profileId2,
                        profileId2 : profileId1
                    }
                 ]
              },
              include: {
                memberOne: {
                  include: {
                    profile: true,
                  }
                },
                memberTwo: {
                  include: {
                    profile: true,
                  }
                }
              }
            });
          } catch {
            return null;
          }
    }

    public async createConversation(memberOneId: string, memberTwoId: string,profileId1: string, profileId2: string){

        try {
            return await DB.conversation.create({
              data: {
                memberOneId : memberOneId,
                memberTwoId : memberTwoId,
                profileId1,
                profileId2
              },
              include: {
                memberOne: {
                  include: {
                    profile: true,
                  }
                },
                memberTwo: {
                  include: {
                    profile: true,
                  }
                }
              }
            })
          } catch (err) {
            console.log(err);
            return null;
          }
    }

    public async getOrCreateConversation(memberOneId: string, memberTwoId: string,profileId : string){
        const memberTwo = await DB.member.findFirst({
            where : {
              id : memberTwoId
            }
        });
        if(!memberTwo){
            return null;
        }
        const profileId2 = memberTwo.profileId as string;
        let conversation = await this.findConversation(profileId, profileId2);
        if(conversation){
            return conversation;
        }
        return await this.createConversation(memberOneId, memberTwoId, profileId, profileId2);
    }


}

export default new ConversationService();