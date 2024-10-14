import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'string' })
  name!: string

  @Column({ type: 'decimal' })
  price!: number
}
