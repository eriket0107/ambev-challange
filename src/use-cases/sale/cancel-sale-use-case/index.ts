import { UpdateResult } from 'typeorm'

import { IItemRepository } from '@/repositories/item-repository'
import { ISaleItemRepository } from '@/repositories/sale-item-repository'
import { ISaleRepository } from '@/repositories/sale-repository'

import { SaleNotFoundError } from '../errors/sale-not-found-error'

export class CancelSaleUseCase {
  constructor(
    private saleRepository: ISaleRepository,
    private itemRepository: IItemRepository,
    private saleItemRepository: ISaleItemRepository,
  ) {}

  async execute(saleId: string): Promise<UpdateResult> {
    const sale = await this.saleRepository.findById(saleId)
    if (!sale) throw new SaleNotFoundError()

    for (const saleItem of sale.saleItems) {
      const item = await this.itemRepository.findBySlug(saleItem.item.slug)

      if (item) {
        item.stock += saleItem.quantity
        await this.itemRepository.update({ id: item.id, item })
      }
    }

    for (const saleItem of sale.saleItems) {
      await this.saleItemRepository.delete(saleItem.id as string)
    }

    const saleCalled = await this.saleRepository.update({
      id: saleId,
      sale: {
        isCancelled: true,
      },
    })

    return saleCalled
  }
}
