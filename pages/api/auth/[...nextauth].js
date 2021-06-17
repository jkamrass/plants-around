import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "plantPerson542" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        await dbConnect();
        const user = await User.findOne({username: credentials.username}).exec()
        
        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),

    
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.SECRET
  },
  callbacks: {
    async session(session, token) {
      // token is the user object returned from the database
      return session
    }
  }
})