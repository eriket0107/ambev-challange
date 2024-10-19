import { beforeEach, describe, expect, it } from 'vitest'

import { Sale } from '@/database/entities/Sale'
import { ItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-item-repository'
import { SaleItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-sale-item-repository'
import { SaleRepositoryInMemory } from '@/repositories/in-memory/in-memory-sale-repository'

import { SaleHasAlreadyBeenCanceled } from '../errors/already-canceled-sale'
import { SaleNotFoundError } from '../errors/sale-not-found-error'
import { UpdateSaleUseCase } from '.'

let itemRepository: ItemRepositoryInMemory
let saleRepository: SaleRepositoryInMemory
let saleItemRepository: SaleItemRepositoryInMemory
let sut: UpdateSaleUseCase

beforeEach(() => {
  itemRepository = new ItemRepositoryInMemory()
  saleRepository = new SaleRepositoryInMemory()
  saleItemRepository = new SaleItemRepositoryInMemory()

  sut = new UpdateSaleUseCase(
    saleRepository,
    itemRepository,
    saleItemRepository,
  )
})

describe('UpdateSaleUseCase', () => {
  it('should update sale and adjust stock correctly', async () => {
    const item = {
      id: '1',
      slug: 'item-1',
      name: 'Test Item',
      price: 100,
      stock: 10,
    }
    const sale: Sale = {
      id: 'sale-1',
      branch: 'Teste',
      customerName: 'Teste',
      saleItems: [
        {
          id: '1',
          item,
          quantity: 2,
          unitPrice: 100,
          discount: 0,
          totalValue: 200,
        },
      ],
      totalValue: 200,
      isCancelled: false,
    }

    await itemRepository.create(item)
    await saleRepository.create(sale)

    const saleItemsToUpdate = [
      {
        itemSlug: 'item-1',
        quantity: 3,
      },
    ]

    const updatedSale = await sut.execute({
      saleId: sale.id as string,
      saleItems: saleItemsToUpdate,
    })

    const updatedItem = await itemRepository.findBySlug(item.slug)

    expect(updatedSale.totalValue).toBe(300)
    expect(updatedItem?.stock).toBe(7)
  })

  it('should throw SaleNotFoundError if sale does not exist', async () => {
    await expect(
      sut.execute({
        saleId: 'invalid-sale',
        saleItems: [],
      }),
    ).rejects.toBeInstanceOf(SaleNotFoundError)
  })

  it('should throw SaleHasAlreadyBeenCanceled if sale is already cancelled', async () => {
    const sale: Sale = {
      id: 'sale-1',
      saleItems: [],
      totalValue: 200,
      isCancelled: true,
      customerName: 'Teste',
      branch: 'Teste',
    }

    await saleRepository.create(sale)

    await expect(
      sut.execute({
        saleId: sale.id as string,
        saleItems: [],
      }),
    ).rejects.toBeInstanceOf(SaleHasAlreadyBeenCanceled)
  })

  it('should throw an error if item stock is insufficient', async () => {
    const item = {
      id: '1',
      slug: 'item-1',
      name: 'Test Item',
      price: 100,
      stock: 2,
    }

    const sale = {
      id: 'sale-1',
      branch: 'Teste',
      customerName: 'Teste',
      saleItems: [
        {
          id: '1',
          item,
          quantity: 1,
          unitPrice: 100,
          discount: 0,
          totalValue: 100,
        },
      ],
      totalValue: 100,
      isCancelled: false,
    }

    await itemRepository.create(item)
    await saleRepository.create(sale)

    const saleItemsToUpdate = [
      {
        itemSlug: 'item-1',
        quantity: 3,
      },
    ]

    await expect(
      sut.execute({
        saleId: sale.id,
        saleItems: saleItemsToUpdate,
      }),
    ).rejects.toThrowError('Insufficient stock for item item-1')
  })
})
