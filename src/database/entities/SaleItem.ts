import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Item } from './Item'
import { Sale } from './Sale'

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @ManyToOne(() => Sale, (sale) => sale.saleItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sale?: Sale

  @ManyToOne(() => Item, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  item!: Item

  @Column({ type: 'int' })
  quantity!: number

  @Column({ type: 'int' })
  discount!: number

  @Column({ type: 'int' })
  totalValue!: number

  @Column({ type: 'int' })
  unitPrice!: number
}
