import { Router } from "express";
import { passport } from "../passport-config";
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken'

const authRouter = Router();

// When user clicks 'sign in with google' in client app, a request is sent to this endpoint which redirects to the google sign-in page
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// User will be redirected to this endpoint after successful sign-in through google
// verifyCallback defined in the passport strategy will be run here
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: '/auth/google',
    session: false
  }),
  (req, res) => {
    const user = req.user as User
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string)
    res.cookie('token', token, {httpOnly: true, secure: true})
    res.redirect(process.env.CLIENT_URL as string)
  }
);

authRouter.get("/login/success");
export { authRouter };
