import { Router } from "express";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import passport from "passport";

const authRouter = Router();

authRouter.get(
  "/auth/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("user", JSON.stringify(user), {
      httpOnly: false,
      sameSite: "none",
      secure: true,
    });

    res.json({ user, token });
  }
);

// When user clicks 'sign in with google' in client app, a request is sent to this endpoint which redirects to the google sign-in page
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// User will be redirected to this endpoint after successful sign-in through google
// verifyCallback defined in the passport strategy will be run here
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: process.env.CLIENT_URL as string,
    failureRedirect: "/auth/google",
    session: false,
  }),
  (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    // Store jwt and user object in cookies
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("user", JSON.stringify(user), {
      httpOnly: false,
      sameSite: "none",
      secure: true,
    });
    res.redirect(process.env.CLIENT_URL as string);
    console.log(`${user.username} has logged in`);
  }
);

export { authRouter };
