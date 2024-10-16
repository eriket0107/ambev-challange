import fs from 'node:fs'
import path from 'node:path'

const logDirectory = path.join('src', 'logs')
const logFile = path.join(logDirectory, 'index.log')

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

export const logger = {
  file: logFile,
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
