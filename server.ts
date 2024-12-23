import 'reflect-metadata'

import { app } from '@/app'
import { dataSource } from '@/database/data-source'
import { env } from '@/env'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const port = env.PORT

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
    app
      .listen({ port })
      .then(() => {
        const spec = app.swagger()
        console.log(`🚀 Server running on port: ${port}!`)

        writeFile(resolve(__dirname, 'swagger.json'), JSON.stringify(spec, null, 2), 'utf-8')
      })
      .catch((error) => console.error(error))
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
