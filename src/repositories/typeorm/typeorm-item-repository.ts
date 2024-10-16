import { DeleteResult, Repository, UpdateResult } from 'typeorm'

import { dataSource } from '@/database/data-source'
import { Item } from '@/database/entities/Item'

import { IItemRepository } from '../item-repository'

export class ItemRepositoryTypeOrm implements IItemRepository {
  private repo: Repository<Item>

  constructor() {
    this.repo = dataSource.getRepository(Item)
  }

  async findById(id: string): Promise<Item | null> {
    return await this.repo.findOneBy({ id })
  }

  async findBySlug(slug: string): Promise<Item | null> {
    return await this.repo.findOneBy({ slug })
  }

  async findAll(): Promise<Item[]> {
    return await this.repo.find()
  }

  async create(item: Item): Promise<Item> {
    return await this.repo.save(item)
  }

  async update({
    id,
    item,
  }: {
    id: string
    item: Partial<Item>
  }): Promise<UpdateResult> {
    return await this.repo.update(id, item)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repo.delete({ id })
  }
}
