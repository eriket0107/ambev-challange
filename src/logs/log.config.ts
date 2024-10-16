import fs from 'node:fs'
import path from 'node:path'

import { FastifyLoggerOptions } from 'fastify'
import { PinoLoggerOptions } from 'fastify/types/logger'

type LoggerType = FastifyLoggerOptions & PinoLoggerOptions

const logDirectory = path.join('src', 'logs')
const logFile = path.join(logDirectory, 'index.log')

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

export const logger: LoggerType = {
  file: logFile,
  enabled: true,
  timestamp: true,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
      singleLine: true,
    },
  },
}
