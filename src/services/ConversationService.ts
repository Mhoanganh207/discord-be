import { DB } from "../../prisma/DB";

class ConversationService{

    public async findConversation(memberOneId: string, memberTwoId: string){
        try {
            return await DB.conversation.findFirst({
              where: {
                AND: [
                  { memberOneId: memberOneId },
                  { memberTwoId: memberTwoId },
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

    public async createConversation(memberOneId: string, memberTwoId: string){
        try {
            return await DB.conversation.create({
              data: {
                memberOneId,
                memberTwoId,
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
          } catch {
            return null;
          }
    }

    public async getOrCreateConversation(memberOneId: string, memberTwoId: string){
        let conversation = await this.findConversation(memberOneId, memberTwoId);
        if(conversation){
            return conversation;
        }
        return await this.createConversation(memberOneId, memberTwoId);
    }


}

export default new ConversationService();