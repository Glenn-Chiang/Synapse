import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from "http";
import { Server } from "socket.io";
import { channelsRouter } from "./rest-routes/channels";
import { chatsRouter } from "./rest-routes/chats";
import { messagesRouter } from "./rest-routes/messages";
import { directMessagesRouter } from "./rest-routes/direct-messages";
import { usersRouter } from "./rest-routes/users";
import { registerMessageHandlers } from "./socket-routes/messages";
import { connectToChannels, registerChannelHandlers } from "./socket-routes/channels";
import { registerDirectMessageHandlers } from "./socket-routes/direct-messages";

export const prisma = new PrismaClient()

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(channelsRouter, chatsRouter, messagesRouter, directMessagesRouter, usersRouter)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" //frontend server
  }
})

io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id)
  socket.data.userId = 1
  const userId: number = socket.data.userId
  socket.join(userId.toString()) // Each user will join a room associated with their userId. DMs will be emitted to this room.
  await connectToChannels(socket)
  registerMessageHandlers(socket)
  registerDirectMessageHandlers(socket)
  registerChannelHandlers(socket)
})

export default server