import {Router} from 'express'
import { prisma } from '../app'

const channelsRouter = Router()

// Create new channel
channelsRouter.post('/channels', async (req, res) => {
  const {name, about} = req.body

  if (!name || typeof name !== 'string' || name.length > 25) {
    return res.status(400).json('invalid name')
  }

  if (!about || typeof about !== 'string' || about.length > 500) {
    return res.status(400).json('invalid about')
  }

  const userId = '1' // todo

  const channel = await prisma.channel.create({
    data: {
      name, about, creatorId: userId
    }
  })

  return channel
})