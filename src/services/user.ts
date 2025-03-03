import JWT from 'jsonwebtoken';
import { createHmac, randomBytes } from 'crypto';
import { prismaClient } from "../lib/db"
const JWT_SECRET = "Superman$handiCamBig$boy";
export interface CreateUserPayload{
    firstName: string
    lastName?: string
    email: string
    password:string
}
export interface getUserPayload{
    email: string
    password:string
}
class UserService{
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.hashPassword(salt, password);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password:hashedPassword
            }
        })
    }
    private static async getUserEmail(email:string) {
        return await  prismaClient.user.findUnique({
            where:{email}
        })
    }
    private static hashPassword(salt:string,password:string) {
        return createHmac('sha256', salt).update(password).digest('hex');
    }
    public static async getUser(payload: getUserPayload) {
        let user = await UserService.getUserEmail(payload.email);
        if (!user) {
            throw new Error('User not found');
        }

        let hashedPassword = UserService.hashPassword(user.salt, payload.password);
        if (hashedPassword !== user.password)
            throw new Error("Invalid Password");


        // create a JWT token now if user email and password is matched
        let token = JWT.sign({ email: user.email, id: user.id }, JWT_SECRET);
        return token;
    }

    public static decodeJWT(token: string) {
        return JWT.verify(token,JWT_SECRET)
    }
    public static getUserById(id:string) {
        return prismaClient.user.findUnique({
            where: {
            id
        }})
    }
}
export default UserService