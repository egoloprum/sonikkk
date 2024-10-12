import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "./supabase";
 
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },

  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],

  callbacks: {
    async jwt ({token, user}) {
      if (!user) {
        // Handle the case where user is undefined
        return token;
      }

      const { data: userExists } = await supabase.from('user').select('*').eq('user_id', user.id).single()

      if (!userExists) {
        if (user) {
          token.id = user.id
        }

        const userData = {
          username: token.name,
          email: token.email,
          image: token.picture,
          user_id: token.id,
        };
    
        const { data: userCreated } = await supabase
          .from('user')
          .insert(userData)
          .select('*');

        if (userCreated) {
          console.log(`${userCreated} user created`)
        }
        else {
          console.log(`${userCreated} user create error`)
        }

        return {
          id: token.id,
          name: token.name,
          email: token.email,
          picture: token.picture,
        }
      }

      return {
        id: userExists.id,
        name: userExists.username,
        email: userExists.email,
        picture: userExists.image,
      }
    },

    async session({session, token}) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email 
        session.user.image = token.picture
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  // pages: {
  //   signIn: '/login',
  // },
};
