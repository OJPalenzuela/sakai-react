import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/zod';
import { backend } from './config/backend';

export interface UserBackend {
  success?: boolean;
  message: string;
  errors: any;
  data?: {
    token: string;
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const { data, success } = loginSchema.safeParse(credentials);

          if (!success) {
            throw new Error('Credenciales invalidas.');
          }

          const user: UserBackend = await backend
            .post('/api/gateway/login', data)
            .then((res) => res.data)
            .catch((error) => {
              throw new Error(error.response.data.message);
            });

          if (!user || !user?.success) {
            throw new Error('Credenciales invalidas.');
          }

          return {
            token: user?.data?.token
          };
        } catch {
          throw new Error('Credenciales invalidas.');
        }
      }
    })
  ],

  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.token = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.token = token.token;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login'
  }
});
