import { DeleteResult, UpdateResult } from 'typeorm'

import { SaleItem } from '@/database/entities/SaleItem'

import { ISaleItemRepository } from '../sale-item-repository'

export class SaleItemRepositoryInMemory implements ISaleItemRepository {
  private dataBase: SaleItem[] = []

  async create(saleItem: SaleItem): Promise<SaleItem> {
    this.dataBase.push(saleItem)

    return saleItem
  }

  async findById(id: string): Promise<SaleItem | null> {
    return this.dataBase.find((saleItem) => saleItem.id === id) || null
  }

  async update({
    id,
    saleItem,
  }: {
    id: string
    saleItem: Partial<SaleItem>
  }): Promise<UpdateResult> {
    const saleItemToUpdate = this.dataBase.find((sale) => sale.id === id) || {}
    Object.assign(saleItemToUpdate, saleItem)

    return saleItemToUpdate as UpdateResult
  }

  async delete(id: string): Promise<DeleteResult> {
    const deletedSaleItems = this.dataBase.filter((sale) => sale.id !== id)
    return (this.dataBase = [...deletedSaleItems]) as unknown as DeleteResult
  }

  async findAll(): Promise<SaleItem[]> {
    throw new Error('Method not implemented.')
  }
}
