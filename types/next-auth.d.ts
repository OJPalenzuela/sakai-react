import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AuthType } from './auth.type';

declare module 'next-auth' {
  interface Session {
    user: AuthType & DefaultSession['user'];
  }

  interface User extends AuthType {}
}

declare module 'next-auth/jwt' {
  interface JWT extends AuthType {}
}
