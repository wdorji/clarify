import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
      // clientId:
      //   "261857999407-qkgt02ljrft2kdfn6h5po96g48igihsu.apps.googleusercontent.com",
      // clientSecret: "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",
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
