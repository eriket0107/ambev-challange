import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-item-repository'
import { SaleItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-sale-item-repository'
import { SaleRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-sale-repository'
import { CancelSaleUseCase } from '@/use-cases/sale/cancel-sale-use-case'
import { errorHandler } from '@/utils/error-handler'

const createSaleSchema = z.object({
  saleId: z.string(),
})

export const cancelSale = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { saleId } = createSaleSchema.parse(request.body)

    const saleItemRepository = new SaleItemRepositoryTypeOrm()
    const saleRepository = new SaleRepositoryTypeOrm()
    const itemRepository = new ItemRepositoryTypeOrm()

    const createSaleUseCase = new CancelSaleUseCase(
      saleRepository,
      itemRepository,
      saleItemRepository,
    )

    const sale = await createSaleUseCase.execute(saleId)

    return reply.status(200).send(sale).log.info(sale, 'Sale')
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: sale#cancel',
    })
  }
}
