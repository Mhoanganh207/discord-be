import * as bcypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @ts-ignore
const JWT_SECRET:string = process.env.TOKEN_SECRET ;

export const hashPassword = async (password: string) => {
    return bcypt.hash(password, 10);
}


export const comparePassword = async (password: string, hash: string) => {
    return bcypt.compare(password, hash);
}

export const generateAccessToken =  (profileId: number) => {
    const payload = { profileId }; 
    return jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30});
}

export const extractInforFromToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}