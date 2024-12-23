import { DeleteResult } from 'typeorm'

import { Sale } from '@/database/entities/Sale'

export interface ISaleRepository {
  create(sale: Sale): Promise<Sale>
  findAll(): Promise<Sale[]>
  findById(id: string): Promise<Sale | null>
  update({ id, sale }: { id: string; sale: Partial<Sale> }): Promise<Sale>
  delete(id: string): Promise<DeleteResult>
  count(): Promise<number>
}
