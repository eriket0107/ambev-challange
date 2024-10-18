import { describe, expect, it } from 'vitest'

import { calculateDiscount } from '@/utils/calculateDiscount'

describe('calculateDiscount', () => {
  it('should return 0% discount for quantity less than 4', () => {
    expect(calculateDiscount(3)).toBe(0)
  })

  it('should return 10% discount for quantity between 4 and 9', () => {
    expect(calculateDiscount(5)).toBe(0.1)
  })

  it('should return 20% discount for quantity between 10 and 20', () => {
    expect(calculateDiscount(15)).toBe(0.2)
  })
})
