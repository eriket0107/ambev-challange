import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-item-repository'
import { SaleItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-sale-item-repository'
import { SaleRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-sale-repository'
import { CreateSaleUseCase } from '@/use-cases/sale/create-sale/create-sale-use-case'
import { errorHandler } from '@/utils/error-handler'

const createSaleSchema = z.object({
  customerName: z.string(),
  branch: z.string(),
  items: z.array(
    z.object({
      itemSlug: z.string(),
      quantity: z.number(),
    }),
  ),
})

export const createSale = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { customerName, branch, items } = createSaleSchema.parse(request.body)

    const saleItemRepository = new SaleItemRepositoryTypeOrm()
    const saleRepository = new SaleRepositoryTypeOrm()
    const itemRepository = new ItemRepositoryTypeOrm()

    const createSaleUseCase = new CreateSaleUseCase(
      saleRepository,
      itemRepository,
      saleItemRepository,
    )

    const sale = await createSaleUseCase.execute({
      saleData: {
        customerName,
        branch,
        saleItems: [],
      },
      items,
    })

    return reply.status(200).send(sale).log.info(sale, 'Sale')
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: sale#create',
    })
  }
}
