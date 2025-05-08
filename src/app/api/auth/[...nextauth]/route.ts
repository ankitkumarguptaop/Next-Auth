import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/libs/axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.warn("Missing email or password");
          return null;
        }

        try {
          const response = await axiosInstance.post("/users/signin", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response?.data?.user;

          if (user && user.id && user.email) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/signin", // this is  custom page in the app
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   // On first login, 'user' is available
    //   if (user) {
    //     token.id = user.id;
    //     token.email = user.email;
    //     token.name = user.name;
    //     // If backend returned an access token
    //     // if (user.token) {
    //     //   token.accessToken = user.token;
    //     // }
    //   }
    //   console.log(token , "token");
    //   return token;
    // },
    // async session({ session, token }) {
    //   console.log('✌️token Sesssion --->', token);
    //   // Make custom token fields available in client-side session
    //   session.user.id = token.id;
    //   session.user.email = token.email;
    //   session.user.name = token.name;
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
