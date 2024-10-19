import { Item } from '@/database/entities/Item'
import { IItemRepository } from '@/repositories/item-repository'

import { InsufficientStockError } from '../errors/insuficient-stock-error'
import { ItemNotFoundError } from '../errors/item-not-found-error'

type UpdateItemRequest = {
  id: string
  item: Partial<Item>
}

type UpdateItemResponse = Item

export class UpdateItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute({ id, item }: UpdateItemRequest): Promise<UpdateItemResponse> {
    const existingItem = await this.itemRepository.findById(id)

    if (!existingItem) throw new ItemNotFoundError(id)

    if (item.stock !== undefined && item.stock < 0) {
      throw new InsufficientStockError(item.slug ?? 'unknown')
    }

    const updatedItem = await this.itemRepository.update({ id, item })

    return updatedItem
  }
}
