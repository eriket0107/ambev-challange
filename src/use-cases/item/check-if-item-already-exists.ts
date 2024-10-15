export class CheckIfItemAlreadyExistsError extends Error {
  constructor() {
    super('This item already exists.')
  }
}
