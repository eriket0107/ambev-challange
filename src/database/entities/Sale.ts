import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { SaleItem } from './SaleItem'

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('int')
  saleNumber!: number

  @Column({ type: 'date' })
  executedAt!: Date

  @Column({ type: 'int' })
  totalValue!: number

  @Column({ type: 'varchar' })
  customerName!: string

  @Column({ type: 'varchar' })
  branch!: string

  @Column({ type: 'boolean', default: false })
  isCancelled!: boolean

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale, { cascade: true })
  saleItems!: SaleItem[]
}
