import 'reflect-metadata'

import { app } from '@/app'
import { env } from '@/env'
import { dataSource } from '@/database/data-source'


const port = env.PORT

dataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

app
  .listen({ port })
  .then(() => {
    console.log(`🚀 Server running on port: ${port}!`)
  })
  .catch((error) => console.error(error))