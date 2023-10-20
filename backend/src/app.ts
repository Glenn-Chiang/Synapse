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

export const prisma = new PrismaClient()

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(channelsRouter, chatsRouter, messagesRouter, directMessagesRouter, usersRouter)

const server = createServer(app)
const io = new Server(server)

io.on('connection', async (socket) => {
  console.log('Client connected')
  registerMessageHandlers(socket)
})

export default server