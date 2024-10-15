import { DeleteResult, Repository, UpdateResult } from 'typeorm'

import { SaleItem } from '@/database/entities/SaleItem'

import { ISaleItemRepository } from '../sale-item-repository'

export class SaleItemRepository implements ISaleItemRepository {
  constructor(private readonly repository: Repository<SaleItem>) {}

  async create(saleItem: SaleItem): Promise<SaleItem> {
    return await this.repository.save(saleItem)
  }

  async findById(id: string): Promise<SaleItem | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async findBySaleId(saleId: string): Promise<SaleItem[]> {
    return await this.repository.find({ where: { sale: { id: saleId } } })
  }

  async update({
    id,
    saleItem,
  }: {
    id: string
    saleItem: Partial<SaleItem>
  }): Promise<UpdateResult> {
    return await this.repository.update(id, saleItem)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id)
  }

  async findAll(): Promise<SaleItem[]> {
    return await this.repository.find()
  }
}
