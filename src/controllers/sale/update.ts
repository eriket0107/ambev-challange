import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-item-repository'
import { SaleItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-sale-item-repository'
import { SaleRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-sale-repository'
import { UpdateSaleUseCase } from '@/use-cases/sale/updated-sale-use-case'
import { errorHandler } from '@/utils/error-handler'

const updateSaleSchema = z.object({
  saleId: z.string(),
  saleItems: z.array(
    z.object({
      itemSlug: z.string(),
      quantity: z.number().min(1),
    }),
  ),
})

export const updateSale = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { saleId, saleItems } = updateSaleSchema.parse(request.body)

    const saleItemRepository = new SaleItemRepositoryTypeOrm()
    const saleRepository = new SaleRepositoryTypeOrm()
    const itemRepository = new ItemRepositoryTypeOrm()

    const updateSaleUseCase = new UpdateSaleUseCase(
      saleRepository,
      itemRepository,
      saleItemRepository,
    )

    const updatedSale = await updateSaleUseCase.execute({ saleId, saleItems })

    return reply
      .status(200)
      .send(updatedSale)
      .log.info(updatedSale, 'Sale updated')
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: sale#update',
    })
  }
}
