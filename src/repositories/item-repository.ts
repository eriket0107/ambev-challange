import { DeleteResult, UpdateResult } from 'typeorm'

import { Item } from '@/database/entities/Item'

export interface IItemRepository {
  findById(id: string): Promise<Item | null>
  findAll(): Promise<Item[]>
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
