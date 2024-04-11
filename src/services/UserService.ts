import { DB } from "../../prisma/DB";
import { comparePassword, hashPassword } from "./AuthService";

class UserService {

    // tạo user
    public async createUser(user: any) {
        const newUser = await DB.user.create({
            data: {
                username: user.username,
                password: await hashPassword(user.password),
                email: user.email,
                displayName: user.displayName,
            }
        })
        return newUser;
    }

    // kiểm tra user có tồn tại không
    public async logIn(user: any) {
        let userFound : any = await DB.user.findFirst({
            where :{
                email : user.email
            },
            include :{
                profile : true
            }
        });
        if (!userFound) {
            return null;
        }
        if (!await comparePassword(user.password, userFound.password)) {
            return null;
        }
        return userFound.profile;
    }

    // lấy user
    public async getUser(email: string) {
        const user = await DB.user.findFirst({
            where: {
                email: email
            }
        })
        return user;
    }

}

export default new UserService();