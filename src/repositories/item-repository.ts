import { DeleteResult, UpdateResult } from 'typeorm'

import { Item } from '@/database/entities/Item'

export interface IItemRepository {
  findById(id: string): Promise<Item | null>
  findAll(): Promise<Item[]>
  findBySlug(slug: string): Promise<Item | null>
  create(item: Item): Promise<Item>
  delete(id: string): Promise<DeleteResult>
  update({
    id,
    item,
  }: {
    id: string
    item: Partial<Item>
  }): Promise<UpdateResult>
}
