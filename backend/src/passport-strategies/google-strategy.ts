import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../app.js";

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: `/auth/google/callback`,
};

export const googleStrategy = new GoogleStrategy(
  options,
  async (accessToken, refreshToken, profile, done) => {
    // Callback is run on successful google sign-in
    try {
      if (!profile.emails) {
        throw new Error("no emails associated with profile");
      }
      const email = profile.emails[0].value;
      const username = profile.displayName || "anonymous";
      const avatarUrl = profile.photos ? profile.photos[0].value : undefined

      // Find or create user if not exists
      // New users will automatically have their accounts created when they first sign in
      const user = await prisma.user.upsert({
        where: {
          email,
        },
        update: {},
        create: {
          email,
          username,
          avatarUrl
        },
      });
      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
);
