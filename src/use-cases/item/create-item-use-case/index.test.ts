import { beforeEach, describe, expect, it } from 'vitest'

import { ItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-item-repository'

import { CheckIfItemAlreadyExistsError } from '../errors/check-if-item-already-exists'
import { InsufficientStockError } from '../errors/insuficient-stock-error'
import { CreateItemUseCase } from '.'

let itemRepository: ItemRepositoryInMemory
let sut: CreateItemUseCase

beforeEach(() => {
  itemRepository = new ItemRepositoryInMemory()
  sut = new CreateItemUseCase(itemRepository)
})

describe('CreateItemUseCase', () => {
  it('should create a new item successfully', async () => {
    const item = {
      slug: 'item-1',
      name: 'Test Item',
      price: 100,
      stock: 10,
    }

    const createdItem = await sut.execute(item)

    expect(createdItem).toEqual(expect.objectContaining(item))
  })

  it('should throw InsufficientStockError if stock is 0 or undefined', async () => {
    const itemWithNoStock = {
      slug: 'item-2',
      name: 'Out of Stock Item',
      price: 50,
      stock: 0,
    }

    await expect(sut.execute(itemWithNoStock)).rejects.toBeInstanceOf(
      InsufficientStockError,
    )

    const itemWithoutStockField = {
      slug: 'item-3',
      name: 'Undefined Stock Item',
      price: 75,
    }

    await expect(sut.execute(itemWithoutStockField)).rejects.toBeInstanceOf(
      InsufficientStockError,
    )
  })

  it('should throw CheckIfItemAlreadyExistsError if item with the same slug exists', async () => {
    const item = {
      slug: 'item-1',
      name: 'Test Item',
      price: 100,
      stock: 10,
    }

    await sut.execute(item)

    await expect(sut.execute(item)).rejects.toBeInstanceOf(
      CheckIfItemAlreadyExistsError,
    )
  })
})
