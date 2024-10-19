import { beforeEach, describe, expect, it } from 'vitest'

import { ItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-item-repository'
import { SaleItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-sale-item-repository'
import { SaleRepositoryInMemory } from '@/repositories/in-memory/in-memory-sale-repository'

import { SaleHasAlreadyBeenCanceled } from '../errors/already-canceled-sale'
import { SaleNotFoundError } from '../errors/sale-not-found-error'
import { CancelSaleUseCase } from '.'

let itemRepository: ItemRepositoryInMemory
let saleRepository: SaleRepositoryInMemory
let saleItemRepository: SaleItemRepositoryInMemory
let sut: CancelSaleUseCase

beforeEach(() => {
  itemRepository = new ItemRepositoryInMemory()
  saleRepository = new SaleRepositoryInMemory()
  saleItemRepository = new SaleItemRepositoryInMemory()

  sut = new CancelSaleUseCase(
    saleRepository,
    itemRepository,
    saleItemRepository,
  )
})

describe('CancelSaleUseCase', () => {
  it('should cancel a sale and revert the stock', async () => {
    const item = {
      id: '1',
      slug: 'item-1',
      name: 'Test Item',
      price: 100,
      stock: 5,
    }
    const sale = {
      id: 'sale-1',
      saleItems: [
        {
          id: '1',
          item,
          quantity: 3,
          unitPrice: 100,
          discount: 0,
          totalValue: 300,
        },
      ],
      totalValue: 300,
      isCancelled: false,
    }
    const saleToCreate = await saleRepository.create({
      ...sale,
      customerName: 'Teste',
      branch: 'Teste',
    })
    const result = await sut.execute(saleToCreate.id as string)

    expect(result.isCancelled).toBe(true)
  })

  it('should throw SaleNotFoundError if sale does not exist', async () => {
    expect(async () =>
      expect(await sut.execute('invalid-sale-id')).rejects.toBeInstanceOf(
        SaleNotFoundError,
      ),
    )
  })

  it('should throw SaleHasAlreadyBeenCanceled if sale is already cancelled', async () => {
    const sale = {
      id: 'sale-1',
      saleItems: [],
      totalValue: 300,
      isCancelled: true,
    }

    expect(
      async () =>
        await expect(sut.execute(sale.id)).rejects.toBeInstanceOf(
          SaleHasAlreadyBeenCanceled,
        ),
    )
  })
})
