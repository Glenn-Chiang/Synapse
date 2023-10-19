import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from "http";
import { Server } from "socket.io";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

export const prisma = new PrismaClient()

const server = createServer(app)
const io = new Server(server)

export default server