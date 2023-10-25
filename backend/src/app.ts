import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import { channelsRouter } from "./rest-routes/channels";
import { chatsRouter } from "./rest-routes/chats";
import { messagesRouter } from "./rest-routes/messages";
import { directMessagesRouter } from "./rest-routes/direct-messages";
import { usersRouter } from "./rest-routes/users";
import { authRouter } from "./rest-routes/auth";
import { registerMessageHandlers } from "./socket-routes/messages";
import {
  connectToChannels,
  registerChannelHandlers,
} from "./socket-routes/channels";
import { registerDirectMessageHandlers } from "./socket-routes/direct-messages";
import passport from "passport";
import { googleStrategy } from "./passport-strategies/google-strategy";
import { jwtStrategy } from "./passport-strategies/jwt-strategy";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const prisma = new PrismaClient();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
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
    origin: "http://localhost:3000", //frontend server
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
      const userId = decoded.id
      socket.data.userId = userId
      next()
    } catch (error) {
      next(new Error('Error authenticating socket client'))
    }
  } else {
    next(new Error('Socket client unauthenticated'))
  }
})

io.on("connection", async (socket) => {
  const userId: number = socket.data.userId;
  console.log('Client connected:', userId)
  socket.join(userId.toString()); // Each user will join a room associated with their userId. DMs will be emitted to this room.
  await connectToChannels(socket);
  registerMessageHandlers(socket);
  registerDirectMessageHandlers(socket);
  registerChannelHandlers(socket);
});

export default server;
