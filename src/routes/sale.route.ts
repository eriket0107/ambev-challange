import { FastifyInstance } from 'fastify'

import { cancelSale } from '@/controllers/sale/cancel'
import { createSale } from '@/controllers/sale/create'
import { updateSale } from '@/controllers/sale/update'

export const saleRoutes = async (app: FastifyInstance) => {
  app.post('/sale-create', createSale)
  app.put('/sale-cancel', cancelSale)
  app.put('/sale-update', updateSale)
}
