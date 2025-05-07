// app/api/auth/[...nextauth]/route.ts
import axiosInstance from '@/libs/axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type CustomUser = {
  id: number;
  name: string;
  email: string;
}|null;

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize (credentials) {
        if (credentials?.email === 'test@example.com' && credentials?.password === 'password123') {
          // Return a user object that matches the expected structure
          const user = await axiosInstance.post(`/users/signin`, credentials);
          return user;
        }


        return null; // Return null if authentication fails
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
  },
});

export { handler as GET, handler as POST };
