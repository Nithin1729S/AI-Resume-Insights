import { handleLogin } from "@/app/lib/actions";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/resume-analysis', // Redirect successful sign-ins here
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('Account:', account); // Log the account object to see the id_token
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/google/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            id_token: account?.id_token
          }),
        });

        const responseBody = await response.text();  // Get the response body as text
        console.log('Response status:', response.status);
        console.log('Response body:', responseBody);

        if (!response.ok) throw new Error('Authentication failed');
        
        const data = JSON.parse(responseBody);
        if (data.access && data.refresh) {
          await handleLogin(data.user_id, data.access, data.refresh);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Sign in error:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to resume-analysis after successful authentication
      return `${baseUrl}/resume-analysis`;
    },
  }
});

export { handler as GET, handler as POST };