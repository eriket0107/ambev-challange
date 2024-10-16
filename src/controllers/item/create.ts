import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-item-repository'
import { CreateItemUseCase } from '@/use-cases/item/create-item-use-case'
import { errorHandler } from '@/utils/error-handler'

const createdItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  slug: z.string(),
})

export const createItem = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { name, price, stock, slug } = createdItemSchema.parse(request.body)

    const itemRepository = new ItemRepositoryTypeOrm()
    const createmItemUseCase = new CreateItemUseCase(itemRepository)

    const item = await createmItemUseCase.execute({
      name,
      price,
      stock,
      slug,
    })
    return reply.send(item).status(200).log.info(item, 'Item')
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: item#create',
    })
  }
}
