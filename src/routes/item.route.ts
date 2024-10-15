import { FastifyInstance } from 'fastify'

import { createItem } from '@/controllers/item/create'

export const itemRoutes = async (app: FastifyInstance) => {
  app.post('/item-create', createItem)
}
