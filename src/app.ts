import 'reflect-metadata'

import cors from '@fastify/cors'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { logger } from './logs/log.config'
import { routes } from './routes'

export const app = fastify({ logger })

app.register(cors, {
  credentials: true,
  origin: true,
})

routes()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
