import { ApolloServer } from '@apollo/server';

import { User } from './user';
export async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
      typeDefs: `
         ${User.typeDefs}
         type Query{
          ${User.queries}
          getContext:String
         }
         type Mutation{
           ${User.mutations}
         
         }
         
        `,
        resolvers: {
            Query: {
            ...User.resolvers.queries,
            getContext: (_: any, parameters: any, context) => {
              console.log("context", context);
              return "Okay"
              }
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    })
    await gqlServer.start();
    return gqlServer;
}