import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-item-repository'
import { UpdateItemUseCase } from '@/use-cases/item/update-item-use-case'
import { errorHandler } from '@/utils/error-handler'

const itemRepository = new ItemRepositoryTypeOrm()
const updateItemUseCase = new UpdateItemUseCase(itemRepository)

const updateItemSchema = z.object({
  stock: z.number().int().positive().optional(),
  price: z.number().positive().optional(),
  slug: z.string(),
})

const paramsSchema = z.object({
  id: z.string(),
})

export async function updateItem(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)
  const { stock, price } = updateItemSchema.parse(request.body)

  try {
    const updatedItem = await updateItemUseCase.execute({
      id,
      item: { stock, price },
    })

    return reply.status(200).send(updatedItem)
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: item#update',
    })
  }
}
