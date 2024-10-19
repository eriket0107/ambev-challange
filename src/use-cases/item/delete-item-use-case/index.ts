import { IItemRepository } from '@/repositories/item-repository'

import { ItemNotFoundError } from '../errors/item-not-found-error'

type DeleteItemRequest = {
  id: string
}

type DeleteItemResponse = void

export class DeleteItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({ id }: DeleteItemRequest): Promise<DeleteItemResponse> {
    const existingItem = await this.itemRepository.findById(id)

    if (!existingItem) throw new ItemNotFoundError(id)

    await this.itemRepository.delete(id)
  }
}
