import { NextFunction, Request, Response } from "express";
import { extractInforFromToken } from "../services/AuthService";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
          // @ts-ignore
          const accessToken : string = req.headers.authorization;
          if(!accessToken){
              return res.status(401).json({message : 'Access token is required'});
          }
          req.body.info = extractInforFromToken(accessToken.split(' ')[1]);
          
          
          next();
}

export default authMiddleware;