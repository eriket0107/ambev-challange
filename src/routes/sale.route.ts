import { FastifyInstance } from 'fastify'

import { cancelSale } from '@/controllers/sale/cancel'
import { createSale } from '@/controllers/sale/create'
import { updateSale } from '@/controllers/sale/update'

export const saleRoutes = async (app: FastifyInstance) => {
  app.post(
    '/sale-create',
    {
      schema: {
        description: 'Cria uma venda',
        tags: ['Sale'],
        body: {
          type: 'object',
          required: ['customerName', 'branch', 'items'],
          properties: {
            customerName: { type: 'string' },
            branch: { type: 'string' },
            items: { type: 'array', items: { type: 'object' } },
          },
        },
      },
    },
    createSale,
  )
  app.put(
    '/sale-cancel',
    {
      schema: {
        description: 'Cancela uma venda',
        tags: ['Sale'],
        body: {
          type: 'object',
          required: ['saleId'],
          properties: { saleId: { type: 'string' } },
        },
      },
    },
    cancelSale,
  )
  app.put(
    '/sale-update',
    {
      schema: {
        description: 'Atualiza uma venda',
        tags: ['Sale'],
        body: {
          type: 'object',
          required: ['saleId'],
          properties: { saleId: { type: 'string' } },
        },
      },
    },
    updateSale,
  )
}
