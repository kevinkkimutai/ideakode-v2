import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
 if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }
          const data = await res.json();
          if (!res.ok || !data.user) return null;

          return {
            ...data.user,
            token: data.token,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),

    // AzureADProvider({
    //   clientId: process.env.AZURE_AD_CLIENT_ID,
    //   clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    //   tenantId: process.env.AZURE_AD_TENANT_ID,
    //   authorization: {
    //     params: {
    //       scope: "openid profile email"
    //     }
    //   }
    // })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,  
    updateAge: 0     
  },

  maxAge: 60 * 60,
  secret: process.env.JWT_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  
  // UPDATED: Change this to match your actual frontend signin URL
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };