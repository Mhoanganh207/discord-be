import { Request, Response } from "express";
import AdminService from "../services/AdminService";
import UserService from "../services/UserService";

class AdminController{

    public async getAllUser(req: Request, res: Response){
        const search = req.query.search;
        try{
        const users= await AdminService.getAllUser();
        res.status(200).json(users);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: err});
        }
    }

    public async deleteUser(req: Request, res: Response){
        const id = req.params.id;
        await  AdminService.deleteUser(id);
        res.status(200).json({message: "User deleted successfully"});
    }

    public async updateUser(req: Request, res: Response){
        const id = req.params.id;
        await AdminService.updateUser(id, req);
        res.status(200).json({message: "User updated successfully"});
    }

    public async createUser(req: Request, res: Response) {
        try {
            // await userValidator(req.body);
            const isExisted = await UserService.getUser(req.body.email);
            if(isExisted) {
                res.status(400).json({message : "Email is already existed"});
                return;
            }
            await AdminService.createUser(req.body);
            console.log(req.body)
            res.status(201).json({ message: "User created successfully" });
            return;
        } catch (err: any) {
            console.log(err);
            res.status(400).json(err);
            return;
        }
    }

    public async searhUser(req: Request, res: Response){
        const query = req.query.query as string; 
        const users = await AdminService.searchUser(query);
       
        res.status(200).json(users);
    }
}

export default new AdminController();