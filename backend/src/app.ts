import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import { channelsRouter } from "./rest-routes/channels.js";
import { chatsRouter } from "./rest-routes/chats.js";
import { messagesRouter } from "./rest-routes/messages.js";
import { directMessagesRouter } from "./rest-routes/direct-messages.js";
import { usersRouter } from "./rest-routes/users.js";
import { authRouter } from "./rest-routes/auth.js";
import { registerMessageHandlers } from "./socket-routes/messages.js";
import {
  connectToChannels,
  registerChannelHandlers,
} from "./socket-routes/channels.js";
import { registerDirectMessageHandlers } from "./socket-routes/direct-messages.js";

import passport from "passport";
import { localStrategy } from "./passport-strategies/local-strategy.js";
import { googleStrategy } from "./passport-strategies/google-strategy.js";
import { jwtStrategy } from "./passport-strategies/jwt-strategy.js";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";

export const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.CLIENT_URL as string,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use(localStrategy)
passport.use(googleStrategy);
passport.use(jwtStrategy);

app.use(authRouter);
// Protect all routes other than login routes
app.use(passport.authenticate("jwt", { session: false }));
app.use(
  channelsRouter,
  chatsRouter,
  messagesRouter,
  directMessagesRouter,
  usersRouter
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL as string], //frontend server
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const userId = decoded.id;
      socket.data.userId = userId;
      next();
    } catch (error) {
      next(new Error("Error authenticating socket client"));
    }
  } else {
    next(new Error("Socket client unauthenticated"));
  }
});

io.on("connection", async (socket) => {
  const userId: number = socket.data.userId;
  console.log("Client connected:", userId);
  socket.join(userId.toString()); // Each user will join a room associated with their userId. DMs will be emitted to this room.
  await connectToChannels(socket);
  registerMessageHandlers(socket);
  registerDirectMessageHandlers(socket);
  registerChannelHandlers(socket);
});

export default server;
