export const queries = `#graphql 

 hello:String
     say(name:String):String
     getUser(email:String!,password:String!):String
     getCurrentUserLoggedIn:User
 
`