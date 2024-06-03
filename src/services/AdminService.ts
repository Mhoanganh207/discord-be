import { Request } from "express";
import { DB } from "../../prisma/DB";
import { Role, User } from "@prisma/client";
import { UserDTO } from "../models/types";
import { hashPassword } from "./AuthService";
import { deleteIndex, searchIndex, updateDocument, updateIndex } from "../helper/SearchHelper";

class AdminService{
    public async getAllUser(){
         let userList : UserDTO[] = [];
         const users = await DB.user.findMany({
            where : {
                role : Role.USER
            },
            include : {
                profile : true
            }
         });
         for (let i = 0; i < users.length; i++) {
               
                userList.push({
                    Id : users[i].id,
                    Username: users[i].username,
                    Email: users[i].email,
                    Role: users[i].role,
                    Displayname : users[i].displayName,
                    // @ts-ignore
                    CreatedAt: users[i].profile.createdAt,
                    // @ts-ignore
                    UpdatedAt: users[i].profile.updatedAt,
                    // @ts-ignore
                    Status: users[i].status

                });
         }
         return userList;
    }

    public async createUser(user : any){
        const newUser = await DB.user.create({
            data: {
                username: user.username,
                password: await hashPassword(user.password),
                email: user.email,
                displayName: user.displayName,
                status: 'active',
                profile: {
                    create: {
                       imageUrl : '',
                       name : '',

                    }
                }
            }

        });

        let userAdd :UserDTO  = {
            Id : newUser.id,
            Username: newUser.username,
            Email: newUser.email,
            Role: newUser.role,
            Displayname : newUser.displayName,
            // @ts-ignore
            CreatedAt: Date.now(),
            // @ts-ignore
            UpdatedAt: Date.now(),
            // @ts-ignore
            Status: 'active'
        }

        await updateIndex(userAdd);
        return newUser;
    }

    public async updateUser(id : string, req: Request){
        const user : User = req.body;
        const updatedUser = await DB.user.update({
            where : {id},
            data : {
                username : user.username,
                password : await hashPassword( user.password),
                displayName : user.displayName,
                profile : {
                    update : {
                        updatedAt : new Date()
                    }
                }
               
            
            },
            include : {
                profile : true
            }
        });

        let userAdd :UserDTO  = {
            Id : updatedUser.id,
            Username: updatedUser.username,
            Email: updatedUser.email,
            Role: updatedUser.role,
            Displayname : updatedUser.displayName,
            // @ts-ignore
            CreatedAt: updatedUser.profile.createdAt,
            // @ts-ignore
            UpdatedAt: Date.now(),
            // @ts-ignore
            Status: updatedUser.status
        }

        await updateDocument(id,userAdd);

        return updatedUser;
    }

    public async deleteUser(id : string){

        await DB.user.delete({  where : {id}});
        await deleteIndex(id);
        return 'User deleted successfully';
    }

    public async searchUser(query : string){
        return  await searchIndex(query);
    }
}


export default new AdminService();