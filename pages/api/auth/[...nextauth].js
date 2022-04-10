import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { Client as FaunaClient } from 'faunadb'
import { FaunaAdapter } from '@next-auth/fauna-adapter'

const client = new FaunaClient({
    secret: process.env.FAUNADB_SECRET_KEY,
    // scheme: "http",
    domain: "db.us.fauna.com",
    // port: 8443
})

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    //   httpOptions: {
    //       timeout: 50000,
    //   },
      authorization: {
          params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
          }
      }
    }),
    EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
  ],
  session: {
      strategy: 'database'
  },
  adapter: FaunaAdapter(client),
  debug: true,
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       const isAllowedToSignIn = true
//       if (isAllowedToSignIn) {
//         return true
//       } else {
//         // Return false to display a default error message
//         return false
//         // Or you can return a URL to redirect to:
//         // return '/unauthorized'
//       }
//     }
//   }
})