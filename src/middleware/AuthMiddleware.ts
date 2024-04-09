import { NextFunction, Request, Response } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
          const accessToken = req.headers['Authorization'];
          if(!accessToken){
              return res.status(401).json({message : 'Access token is required'});
          }
          
          
          next();
}

export default authMiddleware;