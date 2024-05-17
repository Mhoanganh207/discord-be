import { Request, Response } from "express";
import { userValidator } from "../validators/UserValidator";
import UserService from "../services/UserService";
import { generateAccessToken } from "../services/AuthService";



class UserController {

    public async createUser(req: Request, res: Response) {
        try {
            await userValidator(req.body);
            const isExisted = await UserService.getUser(req.body.email);
            if(isExisted) {
                res.status(400).json({message : "Email is already existed"});
            }
            await UserService.createUser(req.body);
            res.status(201).json({ message: "User created successfully" });
        } catch (err: any) {
            res.status(400).json(err.details[0]);
        }
    }
     

    public async logIn(req: Request, res: Response) {
        console.log(req.body);
        const user : any = await UserService.logIn(req.body);
        if (user) {
            const token = generateAccessToken(user.id);
            res.status(200).json({ token: token });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }


    public changePassword(req: Request, res: Response) {
        try {
            UserService.updatePassword(req,res);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new UserController();
