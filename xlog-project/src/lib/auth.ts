import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorizing credentials:", credentials);
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing username or password");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        });

        console.log("User found:", { ...user, password: user?.password ? user.password.substring(0, 10) + '...' : null });

        if (!user) {
          console.log("User not found");
          return null;
        }

        let isPasswordValid = false;

        // Check if the password is already hashed
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
          isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        } else {
          // If the password is not hashed, compare directly (temporary solution)
          isPasswordValid = credentials.password === user.password;
          
          // Hash the password for future use
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
          });
        }

        console.log("Is password valid:", isPasswordValid);

        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        console.log("Authentication successful");
        return {
          id: user.id.toString(),
          username: user.username,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
};