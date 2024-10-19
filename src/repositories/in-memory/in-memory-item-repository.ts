import { DeleteResult } from 'typeorm'

import { Item } from '@/database/entities/Item'

import { IItemRepository } from '../item-repository'

export class ItemRepositoryInMemory implements IItemRepository {
  private dataBase: Item[] = []

  async findById(id: string): Promise<Item | null> {
    return this.dataBase.find((item) => item.id === id) || null
  }

  async findBySlug(slug: string): Promise<Item | null> {
    return this.dataBase.find((item) => item.slug === slug) || null
  }

  async findAll(): Promise<Item[]> {
    return this.dataBase
  }

  async create(item: Item): Promise<Item> {
    this.dataBase.push(item)
    return item
  }

  async update({
    id,
    item,
  }: {
    id: string
    item: Partial<Item>
  }): Promise<Item> {
    const itemToUpdate = this.dataBase.find((sale) => sale.id === id) || {}
    Object.assign(itemToUpdate, item)

    const updatedItem = this.dataBase.find((sale) => sale.id === id)
    return updatedItem as Item
  }

  async delete(id: string): Promise<DeleteResult> {
    const deletedSale = this.dataBase.filter((sale) => sale.id !== id)
    return (this.dataBase = [...deletedSale]) as unknown as DeleteResult
  }
}
