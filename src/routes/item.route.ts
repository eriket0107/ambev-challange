import { FastifyInstance } from 'fastify'

import { createItem } from '@/controllers/item/create'
import { deleteItem } from '@/controllers/item/delete'
import { updateItem } from '@/controllers/item/update'

export const itemRoutes = async (app: FastifyInstance) => {
  app.post('/item-create', createItem)
  app.put('/items/:id', updateItem)
  app.delete('/items/:id', deleteItem)
}
