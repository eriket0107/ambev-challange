import { Sale } from '@/database/entities/Sale'
import { SaleItem } from '@/database/entities/SaleItem'
import { IItemRepository } from '@/repositories/item-repository'
import { ISaleItemRepository } from '@/repositories/sale-item-repository'
import { ISaleRepository } from '@/repositories/sale-repository'
import { calculateDiscount } from '@/utils/calculateDiscount'

import { SaleHasAlreadyBeenCanceled } from '../errors/already-canceled-sale'
import { SaleNotFoundError } from '../errors/sale-not-found-error'

type UpdateSaleRequest = {
  saleId: string
  saleItems: { itemSlug: string; quantity: number }[]
}

export class UpdateSaleUseCase {
  constructor(
    private saleRepository: ISaleRepository,
    private itemRepository: IItemRepository,
    private saleItemRepository: ISaleItemRepository,
  ) {}

  async execute({ saleId, saleItems }: UpdateSaleRequest): Promise<Sale> {
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
    const newSaleItems: SaleItem[] = []

    for (const { itemSlug, quantity } of saleItems) {
      const item = await this.itemRepository.findBySlug(itemSlug)
      if (!item) throw new Error(`Item with slug ${itemSlug} not found`)

      if (item.stock < quantity) {
        throw new Error(`Insufficient stock for item ${itemSlug}`)
      }

      item.stock -= quantity
      await this.itemRepository.update({ id: item.id, item })

      const discountRate = calculateDiscount(quantity)
      const discount = discountRate * item.price * quantity
      const totalValue = item.price * quantity - discount

      const saleItem: SaleItem = {
        item,
        quantity,
        unitPrice: item.price,
        discount,
        totalValue,
      }

      newTotalValue += saleItem.totalValue
      await this.saleItemRepository.updateBySaleId({
        saleId,
        saleItem,
      })
      newSaleItems.push(saleItem)
    }

    existingSale.totalValue = newTotalValue
    existingSale.saleItems = newSaleItems

    const updatedSale = await this.saleRepository.create({
      id: saleId,
      ...existingSale,
    })

    return updatedSale
  }
}
