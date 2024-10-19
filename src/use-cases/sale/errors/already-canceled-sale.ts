export class SaleHasAlreadyBeenCanceled extends Error {
  constructor() {
    super('This sale has already been canceled.')
  }
}
