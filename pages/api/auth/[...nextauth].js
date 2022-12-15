import NextAuth from "next-auth";
import { db, firebaseConfig } from "../../../firebase";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
