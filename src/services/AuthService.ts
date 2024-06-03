import * as bcypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// @ts-ignore
const JWT_SECRET:string = '09f26e402586e2faa8da4c98a35f1b20d6b033c60' ;

export const hashPassword = async (password: string) => {
    return bcypt.hash(password, 10);
}


export const comparePassword = async (password: string, hash: string) => {
    return bcypt.compare(password, hash);
}

export const generateAccessToken =  (profileId: number, role : String) => {
    const payload = { profileId, role }; 
    return jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30});
}

export const extractInforFromToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}