import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();

export const prisma = new PrismaClient()

export default app