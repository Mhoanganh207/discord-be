import { Request, Response } from "express";
import { userValidator } from "../validators/UserValidator";
import UserService from "../services/UserService";
import { generateAccessToken } from "../services/AuthService";


class UserController {

    public async createUser(req: Request, res: Response) {
        try {
            await userValidator(req.body);
            await UserService.createUser(req.body);
            res.status(201).json({ message: "User created successfully" });
        } catch (err: any) {
            res.status(400).json(err.details[0]);
        }
    }
     

    public async logIn(req: Request, res: Response) {
        console.log(req.body);
        const isAuth = await UserService.logIn(req.body);
        if (isAuth) {
            const token = generateAccessToken(req.body.username);
            res.status(200).json({ token: token });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
}

export default new UserController();
