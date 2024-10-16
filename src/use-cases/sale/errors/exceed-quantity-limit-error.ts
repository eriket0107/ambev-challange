export class ExceedQuantityLimitError extends Error {
  constructor() {
    super('Cannot sell more than 20 units of the same item.')
    this.name = 'ExceedQuantityLimitError'
  }
}
