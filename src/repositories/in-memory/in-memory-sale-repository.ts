import { DeleteResult } from 'typeorm'

import { Sale } from '@/database/entities/Sale'

import { ISaleRepository } from '../sale-repository'

export class SaleRepositoryInMemory implements ISaleRepository {
  private dataBase: Sale[] = []

  async create(sale: Sale): Promise<Sale> {
    this.dataBase.push(sale)
    return sale
  }

  async findAll(): Promise<Sale[]> {
    return this.dataBase
  }

  async findById(id: string): Promise<Sale | null> {
    return this.dataBase.find((sale) => sale.id === id) || null
  }

  async update({
    id,
    sale,
  }: {
    id: string
    sale: Partial<Sale>
  }): Promise<Sale> {
    const saleToUpdate = this.dataBase.find((sale) => sale.id === id) || {}
    Object.assign(saleToUpdate, sale)
    return saleToUpdate as Sale
  }

  async delete(id: string): Promise<DeleteResult> {
    const deletedSale = this.dataBase.filter((sale) => sale.id !== id)
    return (this.dataBase = [...deletedSale]) as unknown as DeleteResult
  }

  async count(): Promise<number> {
    return this.dataBase.length
  }
}
