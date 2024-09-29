import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Connect to database
      await connectToDB();

      // Find the user in the database
      const sessionUser = await User.findOne({ email: session.user.email });

      // Attach the user's ID to the session object
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },

    async signIn({ profile }) {
        try {
          console.log('Google Profile:', profile);  // Log profile to check structure
          await connectToDB();
      
          // Check if the user already exists
          const userExists = await User.findOne({ email: profile.email });
          console.log('User exists:', userExists);  // Log if user exists
      
          // If not, create a new user
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(/\s+/g, '').toLowerCase(),  // Removing spaces from username
              image: profile.picture || profile.image,  // Handle profile image if it exists
            });
            console.log('User created successfully');  // Log when user is created
          }
      
          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);  // Log any errors
          return false;
        }
      }
  },
});

export { handler as GET, handler as POST };
