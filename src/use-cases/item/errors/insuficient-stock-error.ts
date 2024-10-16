export class InsufficientStockError extends Error {
  constructor(slug: string) {
    super(`Insufficient stock for item ${slug}.`)
    this.name = 'InsufficientStockError'
  }
}
