import { beforeEach, describe, expect, it } from 'vitest'

import { ItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-item-repository'
import { SaleItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-sale-item-repository'
import { SaleRepositoryInMemory } from '@/repositories/in-memory/in-memory-sale-repository'
import { InsufficientStockError } from '@/use-cases/item/errors/insuficient-stock-error'

import { ExceedQuantityLimitError } from '../errors/exceed-quantity-limit-error'
import { ItemNotFoundError } from '../errors/item-not-found-error'
import { CreateSaleUseCase } from './create-sale-use-case'

let saleRepository: SaleRepositoryInMemory
let itemRepository: ItemRepositoryInMemory
let saleItemRepository: SaleItemRepositoryInMemory
let sut: CreateSaleUseCase

beforeEach(() => {
  saleRepository = new SaleRepositoryInMemory()
  itemRepository = new ItemRepositoryInMemory()
  saleItemRepository = new SaleItemRepositoryInMemory()

  sut = new CreateSaleUseCase(
    saleRepository,
    itemRepository,
    saleItemRepository,
  )
})

describe('CreateSaleUseCase', () => {
  it('should create a sale successfully', async () => {
    const items = [{ itemSlug: 'item-1', quantity: 5 }]
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 10,
      name: 'Teste',
    }

    itemRepository.create(mockItem)

    const sale = await sut.execute({
      saleData: {
        customerName: 'teste',
        branch: 'teste',
        saleItems: [],
      },
      items,
    })

    const count = await saleRepository.count()

    expect(count).toBe(1)
    expect(sale.totalValue).toBe(450) // With a 10% discount
    expect(mockItem.stock).toBe(5)
  })

  it('should throw ItemNotFoundError if item is not found', async () => {
    const items = [{ itemSlug: 'invalid-item', quantity: 1 }]

    await expect(
      sut.execute({
        saleData: {
          customerName: 'teste',
          branch: 'teste',
          saleItems: [],
        },
        items,
      }),
    ).rejects.toBeInstanceOf(ItemNotFoundError)
  })

  it('should throw InsufficientStockError if item stock is insufficient', async () => {
    const saleData = {
      customerName: 'teste',
      branch: 'teste',
      saleItems: [],
    }
    const items = [{ itemSlug: 'item-1', quantity: 11 }]
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 10,
      name: 'Teste',
    }

    itemRepository.create(mockItem)

    await expect(
      sut.execute({
        saleData,
        items,
      }),
    ).rejects.toBeInstanceOf(InsufficientStockError)
  })

  it('should throw ExceedQuantityLimitError if quantity exceeds the limit', async () => {
    const saleData = {
      customerName: 'teste',
      branch: 'teste',
      saleItems: [],
    }

    const items = [{ itemSlug: 'item-1', quantity: 21 }]
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 30,
      name: 'Teste',
    }

    itemRepository.create(mockItem)

    await expect(sut.execute({ saleData, items })).rejects.toBeInstanceOf(
      ExceedQuantityLimitError,
    )
  })

  it('should apply 0% discount if quantity is less than 4', async () => {
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 30,
      name: 'Teste',
    }

    itemRepository.create(mockItem)

    const sale = await sut.execute({
      saleData: { customerName: 'Customer', branch: 'Main', saleItems: [] },
      items: [{ itemSlug: 'item-1', quantity: 3 }],
    })

    expect(sale.totalValue).toBe(300) // No discount applied
  })

  it('should apply 10% discount if quantity is between 4 and 9', async () => {
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 30,
      name: 'Teste',
    }
    itemRepository.create(mockItem)

    const sale = await sut.execute({
      saleData: { customerName: 'Customer', branch: 'Main', saleItems: [] },
      items: [{ itemSlug: 'item-1', quantity: 5 }],
    })

    expect(sale.totalValue).toBe(450) // 10% discount applied
  })

  it('should apply 20% discount if quantity is between 10 and 20', async () => {
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 30,
      name: 'Teste',
    }
    itemRepository.create(mockItem)

    const sale = await sut.execute({
      saleData: { customerName: 'Customer', branch: 'Main', saleItems: [] },
      items: [{ itemSlug: 'item-1', quantity: 15 }],
    })

    expect(sale.totalValue).toBe(1200) // 20% discount applied
  })

  it('should not allow quantity to exceed 20', async () => {
    const mockItem = {
      id: '1',
      slug: 'item-1',
      price: 100,
      stock: 30,
      name: 'Teste',
    }
    itemRepository.create(mockItem)

    expect(
      sut.execute({
        saleData: { customerName: 'Customer', branch: 'Main', saleItems: [] },
        items: [{ itemSlug: 'item-1', quantity: 21 }],
      }),
    ).rejects.toBeInstanceOf(ExceedQuantityLimitError)
  })
})
