import { DB } from "../../prisma/DB";
import { comparePassword, hashPassword } from "./AuthService";
import { sendEmail } from "./MailService";

class UserService {

    private baseUrl = process.env.BASE_URL || "http://localhost:3000";

    // tạo user
    public async createUser(user: any) {
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

        })

        sendEmail(`${this.baseUrl}:3000/verify?userId=` + newUser.id, newUser.email);
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
        if (userFound.status !== 'active') {
            return null;
        }
        if (!await comparePassword(user.password, userFound.password)) {
            return null;
        }
        return userFound;
    }

    // lấy user
    public async getUser(email: string) {
        const user = await DB.user.findFirst({
            where: {
                email: email
            }
        });
        return user;
    }

    // cập nhật user
    public async updatePassword(req: any, res: any) {
        const profileId = req.body.info.profileId;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        if (!oldPassword || !newPassword) {
            res.status(400).json({ message: "Old password and new password are required" });
            return;
        }

        const user = await DB.user.findFirst({
            where: {
                profile : {
                    id : profileId
                }
            }
        }
        );
        if (user?.password) {
            if (!await comparePassword(oldPassword, user.password)) {
                res.status(400).json({ message: "Old password is incorrect" });
                return;
            }
        }
        await DB.user.update({
            where: {
                id: user?.id
            },
            data: {
                password: await hashPassword(newPassword)
            }
        });
        res.status(200).json({ message: "Password updated successfully" });
        return;
    }

    public async verifyUser(userId: string) {
        const user = await DB.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        await DB.user.update({
            where: {
                id: userId
            },
            data: {
                status: 'active'
            }
        });
    }
    



}

export default new UserService();