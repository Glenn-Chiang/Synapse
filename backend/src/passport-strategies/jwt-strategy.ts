import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../app";
import { Request } from "express";

const cookieExtractor = (req: Request) => {
  const token = req.cookies.token
  return token
}

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET as string,
};

export const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  console.log('jwt payload:', payload)
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.id), // payload contains decoded jwt
      },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, "user not found");
    }
  } catch (error) {
    return done(error);
  }
});

