import { Request, Response } from "express";

class UserController{
    public async createUser(req: Request, res : Response){
          console.log(req.body);
          res.send('Hello');
    }
}