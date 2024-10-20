import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar' })
  slug!: string

  @Column({ type: 'int' })
  price!: number

  @Column({ type: 'int' })
  stock!: number
}
