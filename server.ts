import 'reflect-metadata'

import { app } from '@/app'
import { dataSource } from '@/database/data-source'
import { env } from '@/env'

const port = env.PORT

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
    app
      .listen({ port })
      .then(() => {
        console.log(`🚀 Server running on port: ${port}!`)
      })
      .catch((error) => console.error(error))
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
