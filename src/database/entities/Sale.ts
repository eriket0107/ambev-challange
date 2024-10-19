import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { SaleItem } from './SaleItem'

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column('varchar')
  saleNumber?: string

  @Column({ type: 'date' })
  executedAt?: string

  @Column({ type: 'int' })
  totalValue?: number

  @Column({ type: 'varchar' })
  customerName!: string

  @Column({ type: 'varchar' })
  branch!: string

  @Column({ type: 'int', nullable: true })
  discount?: number

  @Column({ type: 'boolean', default: false })
  isCancelled?: boolean

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale)
  saleItems!: SaleItem[]
}
