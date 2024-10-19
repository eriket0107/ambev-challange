import { DeleteResult, UpdateResult } from 'typeorm'

import { SaleItem } from '@/database/entities/SaleItem'

export interface ISaleItemRepository {
  create(saleItem: SaleItem): Promise<SaleItem>
  findBySaleId(saleId: string): Promise<SaleItem[]>
  findById(id: string): Promise<SaleItem | null>
  update({
    id,
    saleItem,
  }: {
    id: string
    saleItem: Partial<SaleItem>
  }): Promise<UpdateResult>
  delete(id: string): Promise<DeleteResult>
  findAll(): Promise<SaleItem[]>
}
