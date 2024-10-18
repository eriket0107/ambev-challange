import { FastifyInstance } from 'fastify'

import { cancelSale } from '@/controllers/sale/cancel'
import { createSale } from '@/controllers/sale/create'

export const saleRoutes = async (app: FastifyInstance) => {
  app.post('/sale-create', createSale)
  app.put('/sale-cancel', cancelSale)
}
