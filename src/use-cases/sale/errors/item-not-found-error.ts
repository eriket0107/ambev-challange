export class ItemNotFoundError extends Error {
  constructor() {
    super('Item not found.')
    this.name = 'ItemNotFoundError'
  }
}
