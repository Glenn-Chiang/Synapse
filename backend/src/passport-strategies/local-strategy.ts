import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../app.js";
import bcrypt from "bcrypt";

export const localStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Username not found" });
      }
      if (!user.passwordHash) {
        return done(null, false, {
          message: "User has not registered with username and password",
        });
      }
      const passwordIsCorrect = await bcrypt.compare(
        password,
        user.passwordHash
      );
      if (!passwordIsCorrect) {
        return done(null, false, {message: "Incorrect password"})
      }

      // Authenticated
      return done(null, user)
      
    } catch (error) {
      return done(error);
    }
  }
);
