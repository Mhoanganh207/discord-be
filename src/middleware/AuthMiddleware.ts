import { NextFunction, Request, Response } from "express";
import { extractInforFromToken } from "../services/AuthService";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
          // @ts-ignore
          const accessToken : string = req.headers.authorization;
          if(!accessToken){
              return res.status(401).json({message : 'Access token is required'});
          }
          try{
          req.body.info = extractInforFromToken(accessToken.split(' ')[1]);
          }
          catch (err : any) {
              return res.status(401).json({message : err})
          }
          
          next();
}

export default authMiddleware;