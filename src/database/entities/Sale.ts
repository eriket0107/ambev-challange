import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export type SaleItem = {
  productSlug: string
  quantity: number
  unitPrice: number
  discount: number
  totalValue: number
}

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({})
  saleNumber!: number

  @Column({ type: 'datetime' })
  saleDate!: Date

  @Column({ type: 'varchar' })
  customerName!: string

  @Column({ type: 'varchar' })
  branch!: string

  @Column('decimal')
  totalValue!: number

  @Column('simple-json')
  items!: SaleItem[]

  @Column({ type: 'boolean', default: false })
  isCancelled!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
