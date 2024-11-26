import { FastifyInstance } from 'fastify'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { createItem } from '@/controllers/item/create'
import { deleteItem } from '@/controllers/item/delete'
import { updateItem } from '@/controllers/item/update'

export const itemRoutes: FastifyPluginAsyncZod = async (
  app: FastifyInstance,
) => {
  app.post(
    '/item-create',
    {
      schema: {
        description: 'Cria um item',
        tags: ['Item'],
        body: {
          type: 'object',
          required: ['name', 'price', 'stock', 'slug'],
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'number' },
            slug: { type: 'string' },
          },
        },
      },
    },
    createItem,
  )
  app.put(
    '/items/:id',
    {
      schema: {
        description: 'Atualiza um item',
        tags: ['Item'],
        body: {
          type: 'object',
          required: ['stock', 'price'],
          properties: {
            stock: { type: 'number' },
            price: { type: 'number' },
          },
        },
      },
    },
    updateItem,
  )
  app.delete(
    '/items/:id',
    {
      schema: {
        description: 'Deleta um item',
        tags: ['Item'],
        body: {
          type: 'object',
          required: ['stock', 'price'],
          properties: {
            stock: { type: 'number' },
            price: { type: 'number' },
          },
        },
      },
    },
    deleteItem,
  )
}
