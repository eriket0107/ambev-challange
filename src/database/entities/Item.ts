import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type SaleItem = {
  productSlug: string
  quantity: number
  unitPrice: number
  discount: number
  totalValue: number
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'varchar' })
  slug!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'number' })
  quantity!: number

  @Column({ type: 'int' })
  unitPrice!: number
}
