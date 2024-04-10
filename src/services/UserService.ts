import { DB } from "../../prisma/DB";
import { comparePassword, hashPassword } from "./AuthService";

class UserService {

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

    public async logIn(user: any) {
        const userFound = await DB.user.findFirst({
            where: {
                email: user.email
            }
        });
        if (!userFound) {
            return false;
        }
        if (!await comparePassword(user.password, userFound.password)) {
            return false;
        }
        return true;
    }

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