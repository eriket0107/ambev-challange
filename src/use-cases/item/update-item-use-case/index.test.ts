import { beforeEach, describe, expect, it } from 'vitest'

import { ItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-item-repository'
import { UpdateItemUseCase } from '@/use-cases/item/update-item-use-case'

import { InsufficientStockError } from '../errors/insuficient-stock-error'
import { ItemNotFoundError } from '../errors/item-not-found-error'

describe('UpdateItemUseCase', () => {
  let sut: UpdateItemUseCase
  let itemRepository: ItemRepositoryInMemory

  beforeEach(() => {
    itemRepository = new ItemRepositoryInMemory()
    sut = new UpdateItemUseCase(itemRepository)
  })

  it('should update an item successfully', async () => {
    await itemRepository.create({
      id: '1',
      name: 'Test Item',
      slug: 'test-item',
      stock: 10,
      price: 100,
    })

    const updatedItem = await sut.execute({
      id: '1',
      item: { stock: 20 },
    })

    expect(updatedItem.stock).toBe(20)
  })

  it('should throw ItemNotFoundError if item does not exist', async () => {
    await expect(
      sut.execute({ id: '999', item: { stock: 20 } }),
    ).rejects.toThrow(ItemNotFoundError)
  })

  it('should throw InsufficientStockError if stock is negative', async () => {
    await itemRepository.create({
      id: '1',
      name: 'Test Item',
      slug: 'test-item',
      stock: 10,
      price: 100,
    })

    await expect(sut.execute({ id: '1', item: { stock: -5 } })).rejects.toThrow(
      InsufficientStockError,
    )
  })
})
