import { Sale } from '@/database/entities/Sale'
import { IItemRepository } from '@/repositories/item-repository'
import { ISaleItemRepository } from '@/repositories/sale-item-repository'
import { ISaleRepository } from '@/repositories/sale-repository'

import { SaleHasAlreadyBeenCanceled } from '../errors/already-canceled-sale'
import { SaleNotFoundError } from '../errors/sale-not-found-error'

type UpdateSaleRequest = {
  saleId: string
  sale: Partial<Sale>
}

export class UpdateSaleUseCase {
  constructor(
    private saleRepository: ISaleRepository,
    private itemRepository: IItemRepository,
    private saleItemRepository: ISaleItemRepository,
  ) {}

  async execute({ saleId, sale }: UpdateSaleRequest): Promise<Sale> {
    const existingSale = await this.saleRepository.findById(saleId)
    if (!existingSale) throw new SaleNotFoundError()
    if (existingSale.isCancelled) throw new SaleHasAlreadyBeenCanceled()

    const previousSaleItems = await this.saleItemRepository.findBySaleId(saleId)
    for (const saleItem of previousSaleItems) {
      const item = await this.itemRepository.findBySlug(saleItem.item.slug)
      if (item) {
        item.stock += saleItem.quantity
        await this.itemRepository.update({ id: item.id, item })
      }
    }

    for (const saleItem of previousSaleItems) {
      await this.saleItemRepository.delete(saleItem.id as string)
    }

    let newTotalValue = 0
    for (const saleItem of sale.saleItems || []) {
      const item = await this.itemRepository.findBySlug(saleItem.item.slug)
      if (item) {
        item.stock -= saleItem.quantity
        await this.itemRepository.update({ id: item.id, item })
      }
      newTotalValue += saleItem.totalValue
    }

    const updatedSale = await this.saleRepository.update({
      id: saleId,
      sale: { ...existingSale, ...sale, totalValue: newTotalValue },
    })
    return updatedSale
  }
}
