import { DeleteResult, Repository, UpdateResult } from 'typeorm'

import { dataSource } from '@/database/data-source'
import { SaleItem } from '@/database/entities/SaleItem'

import { ISaleItemRepository } from '../sale-item-repository'

export class SaleItemRepositoryTypeOrm implements ISaleItemRepository {
  private repo: Repository<SaleItem>

  constructor() {
    this.repo = dataSource.getRepository(SaleItem)
  }

  async create(saleItem: SaleItem): Promise<SaleItem> {
    return await this.repo.save(saleItem)
  }

  async findById(id: string): Promise<SaleItem | null> {
    return await this.repo.findOne({ where: { id } })
  }

  async findBySaleId(saleId: string): Promise<SaleItem[]> {
    return await this.repo.find({ where: { sale: { id: saleId } } })
  }

  async update({
    id,
    saleItem,
  }: {
    id: string
    saleItem: Partial<SaleItem>
  }): Promise<UpdateResult> {
    return await this.repo.update(id, saleItem)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }

  async findAll(): Promise<SaleItem[]> {
    return await this.repo.find()
  }
}
