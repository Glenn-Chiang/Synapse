import { Router } from "express";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import passport from "passport";
import { prisma } from "../app.js";
import bcrypt from 'bcrypt';

const authRouter = Router();

// Register user with username and password
authRouter.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).send("Invalid username");
  }
  if (!password || typeof password !== "string") {
    // todo: check for password strength?
    return res.status(400).send("Invalid password");
  }

  // Check if username is already taken
  const existingUser = await prisma.user.findUnique({
    where: {
      username
    }
  })
  if (existingUser) {
    return res.status(409).send("Username is already taken")
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  res.json(user);
  console.log("Registered user:", user)
});

// Login with local strategy i.e. username and password
authRouter.post(
  "/auth/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    console.log('what the fuck do you want')
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

// Login with google
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
