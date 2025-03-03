import { prismaClient } from '../../lib/db'
import UserService, { CreateUserPayload, } from '../../services/user';
const queries = {
    hello: () => `Hey There, I am graphql server`,
    say: (_: any, { name }: { name: string }) => `Hey ${name}, How are you?`,
    getUser: async (_: any, payload:{email:string,password:string}) => {
        return await UserService.getUser({
            email: payload.email,
            password:payload.password
        })
    },
    getCurrentUserLoggedIn: async (_: any, parameters: any, context: any) => {
        if (context && context.user) {
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
       }
        return new Error("I dont know who are you?")
    },


}

const mutations = {
    createUser: async(_:any,
        payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload)
        
        return res.id;
        },
}

export const resolvers = {queries,mutations}