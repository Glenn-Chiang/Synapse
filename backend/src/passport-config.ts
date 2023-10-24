import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
};

const googleStrategy = new GoogleStrategy(
  strategyOptions,
  (accessToken, refreshToken, profile, verifyCallback) => { // Callback is run on successful google sign-in
    console.log('profile')
  }
);

passport.use(googleStrategy);

export { passport };
