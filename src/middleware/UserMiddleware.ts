import { NextFunction, Request, Response } from "express";
import { extractInforFromToken } from "../services/AuthService";

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const accessToken: string = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({ message: 'Access token is required' });
    }
    try {
        req.body.info = extractInforFromToken(accessToken.split(' ')[1]);
        if (req.body.info.role !== 'USER') {
            return res.status(403).json({ message: 'Only user can access' });
        }
    }
    catch (err: any) {
        return res.status(401).json({ message: err })
    }

    next();
}

export default userMiddleware;