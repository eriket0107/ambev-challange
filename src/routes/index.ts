import { app } from '@/app'

import { itemRoutes } from './item.route'
import { saleRoutes } from './sale.route'

export const routes = () => {
  app.register(itemRoutes)
  app.register(saleRoutes)
}
