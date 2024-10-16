import { Item } from '@/database/entities/Item'
import { IItemRepository } from '@/repositories/item-repository'

import { CheckIfItemAlreadyExistsError } from './errors/check-if-item-already-exists'
import { InsufficientStockError } from './errors/insuficient-stock-error'

type CreateItemRequest = Partial<Item>

type CreateItemReponse = Item

export class CreateItemUseCase {
  constructor(private itemRepository: IItemRepository) {}

  async execute(item: CreateItemRequest): Promise<CreateItemReponse> {
    const checkIfSlugExists = await this.itemRepository.findBySlug(
      item.slug as string,
    )

    if (!item.stock || item.stock === 0)
      throw new InsufficientStockError(item.slug as string)
    if (checkIfSlugExists) throw new CheckIfItemAlreadyExistsError()

    const createdItem = await this.itemRepository.create(item as Item)

    return createdItem
  }
}
