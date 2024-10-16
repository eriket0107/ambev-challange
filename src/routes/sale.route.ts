import { FastifyInstance } from 'fastify'

import { createSale } from '@/controllers/sale/create'

export const saleRoutes = async (app: FastifyInstance) => {
  app.post('/sale-create', createSale)
}
