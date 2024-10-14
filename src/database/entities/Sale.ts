import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type SaleItem = {
  productName: string
  quantity: number
  unitPrice: number
  discount: number
  totalValue: number
}

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  saleNumber!: string

  @Column({ type: 'datetime' })
  saleDate!: Date

  @Column()
  customerName!: string

  @Column()
  branch!: string

  @Column('decimal')
  totalValue!: number

  @Column('simple-json')
  items!: SaleItem[]

  @Column({ default: false })
  isCancelled!: boolean
}
