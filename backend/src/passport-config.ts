import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./app";

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
};

const googleStrategy = new GoogleStrategy(
  strategyOptions,
  async (accessToken, refreshToken, profile, done) => {
    // Callback is run on successful google sign-in
    try {
      const userId = Number(profile.id);
      const username = profile.username || "anonymous";

      // Find or create user if not exists
      // New users will automatically have their accounts created when they first sign in
      const user = await prisma.user.upsert({
        where: {
          id: userId,
        },
        update: {},
        create: {
          id: userId,
          username,
        },
      });
      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }
);

passport.use(googleStrategy);

export { passport };
