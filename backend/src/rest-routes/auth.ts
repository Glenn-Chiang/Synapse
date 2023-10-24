import { Router } from "express";
import { passport } from "../passport-config";

const authRouter = Router();

// When user clicks 'sign in with google' in client app, a request is sent to this endpoint which redirects to the google sign-in page
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// User will be redirected to this endpoint after successful sign-in through google
authRouter.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL
}));

authRouter.get('/login/success')
export { authRouter };
