import { app } from '@/app'

import { itemRoutes } from './item.route'

export const routes = () => {
  app.register(itemRoutes)
}
