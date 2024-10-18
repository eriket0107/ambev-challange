import dayjs from 'dayjs'

import { Sale } from '@/database/entities/Sale'
import { IItemRepository } from '@/repositories/item-repository'
import { ISaleItemRepository } from '@/repositories/sale-item-repository'
import { ISaleRepository } from '@/repositories/sale-repository'
import { calculateDiscount } from '@/utils/calculateDiscount'

import { InsufficientStockError } from '../../item/errors/insuficient-stock-error'
import { ExceedQuantityLimitError } from '../errors/exceed-quantity-limit-error'
import { ItemNotFoundError } from '../errors/item-not-found-error'

type ItemsType = { itemSlug: string; quantity: number }

type CreateSaleUseCaseDTORequest = {
  saleData: Sale
  items: ItemsType[]
}

export class CreateSaleUseCase {
  constructor(
    private saleRepository: ISaleRepository,
    private itemRepository: IItemRepository,
    private saleItemRepository: ISaleItemRepository,
  ) {}

  async execute({
    saleData,
    items,
  }: CreateSaleUseCaseDTORequest): Promise<Sale> {
    let totalSaleValue: number = 0
    const salesCount = await this.saleRepository.count()

    for (const { itemSlug, quantity } of items) {
      const item = await this.itemRepository.findBySlug(itemSlug)
      if (!item) throw new ItemNotFoundError()
      if (item.stock < quantity) throw new InsufficientStockError(item.slug)
      if (quantity > 20) throw new ExceedQuantityLimitError()

      const discountRate = calculateDiscount(quantity)
      const discount = discountRate * item.price * quantity
      const totalValue = item.price * quantity - discount

      const saleItem = await this.saleItemRepository.create({
        item,
        quantity,
        unitPrice: item.price,
        discount,
        totalValue,
      })

      saleData.saleItems.push(saleItem)
      totalSaleValue += totalValue
      saleData.saleNumber = `#${String(salesCount + 1).padStart(6, '0')}`
      saleData.discount = discount
      item.stock -= quantity
      await this.itemRepository.update({ id: item.id, item })
    }

    saleData.executedAt = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    saleData.totalValue = totalSaleValue
    const sale = await this.saleRepository.create(saleData)

    return sale
  }
}
