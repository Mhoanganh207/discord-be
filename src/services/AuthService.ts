import * as bcypt from 'bcrypt';
export const hashPassword = async (password: string) => {
    return bcypt.hash(password, 10);
}


export const comparePassword = async (password: string, hash: string) => {
    return bcypt.compare(password, hash);
}