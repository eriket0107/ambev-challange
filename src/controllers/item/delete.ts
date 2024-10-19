import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ItemRepositoryTypeOrm } from '@/repositories/typeorm/typeorm-item-repository'
import { DeleteItemUseCase } from '@/use-cases/item/delete-item-use-case'
import { errorHandler } from '@/utils/error-handler'

const itemRepository = new ItemRepositoryTypeOrm()
const deleteItemUseCase = new DeleteItemUseCase(itemRepository)

const paramsSchema = z.object({
  id: z.string(),
})

export async function deleteItem(request: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(request.params)

  try {
    await deleteItemUseCase.execute({ id })
    return reply.status(204).send()
  } catch (error) {
    errorHandler({
      error,
      reply,
      code: 400,
      file: 'controller: item#delete',
    })
  }
}
