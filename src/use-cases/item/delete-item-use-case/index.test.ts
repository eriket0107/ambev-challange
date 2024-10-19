import { beforeEach, describe, expect, it } from 'vitest'

import { ItemRepositoryInMemory } from '@/repositories/in-memory/in-memory-item-repository'

import { ItemNotFoundError } from '../errors/item-not-found-error'
import { DeleteItemUseCase } from '.'

describe('DeleteItemUseCase', () => {
  let sut: DeleteItemUseCase
  let itemRepository: ItemRepositoryInMemory

  beforeEach(() => {
    itemRepository = new ItemRepositoryInMemory()
    sut = new DeleteItemUseCase(itemRepository)
  })

  it('should delete an item successfully', async () => {
    await itemRepository.create({
      id: '1',
      name: 'Test Item',
      slug: 'test-item',
      stock: 10,
      price: 100,
    })

    await sut.execute({ id: '1' })
    const item = await itemRepository.findById('1')

    expect(item).toBeNull()
  })

  it('should throw ItemNotFoundError if item does not exist', async () => {
    expect(async () =>
      expect(await sut.execute({ id: '' })),
    ).rejects.toBeInstanceOf(ItemNotFoundError)
  })
})
