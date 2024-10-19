import { DeleteResult, Repository, UpdateResult } from 'typeorm'

import { dataSource } from '@/database/data-source'
import { Sale } from '@/database/entities/Sale'

import { ISaleRepository } from '../sale-repository'

export class SaleRepositoryTypeOrm implements ISaleRepository {
  private repo: Repository<Sale>

  constructor() {
    this.repo = dataSource.getRepository(Sale)
  }

  async create(sale: Sale): Promise<Sale> {
    return await this.repo.save(sale)
  }

  async findAll(): Promise<Sale[]> {
    return await this.repo.find()
  }

  async findById(id: string): Promise<Sale | null> {
    return await this.repo.findOneBy({ id })
  }

  async update({
    id,
    sale,
  }: {
    id: string
    sale: Partial<Sale>
  }): Promise<UpdateResult> {
    return await this.repo.update(id, sale)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete(id)
  }

  async count(): Promise<number> {
    return await this.repo.count()
  }
}
