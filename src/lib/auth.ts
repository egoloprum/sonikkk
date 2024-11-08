import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "./supabase";
import { createExclusion } from "@/app/helpers/exclusionHelper";
import { createPrimaryDiet } from "@/app/helpers/dietHelper";
 
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
    async jwt({ token, user }) {    
      if (user) {
        token.id      = user.id;
        token.name    = user.name;
        token.email   = user.email;
        token.picture = user.image;
    
        const { data: userExists } = await supabase.from('user').select('*').eq('user_id', user.id).single();

        if (!userExists) {
          const userData = {
            username: user.name,
            email:    user.email,
            image:    user.image,
            user_id:  user.id,
          };
    
          const { data: userCreated } = await supabase.from('user').insert(userData).select('*');
          await createExclusion(user.id)
          await createPrimaryDiet(user.id)
          console.log(userCreated ? `${userCreated} user created` : 'User  create error');
        }
      }
    
      return {
        id:       token.id,
        name:     token.name,
        email:    token.email,
        picture:  token.picture,
      };
    },

    async session({session, token}) {
      if (token) {
        session.user.id     = token.id
        session.user.name   = token.name
        session.user.email  = token.email 
        session.user.image  = token.picture
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },

  // pages: {
  //   signIn: '/login',
  // },
};
