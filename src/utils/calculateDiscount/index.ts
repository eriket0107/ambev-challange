export const calculateDiscount = (quantity: number): number => {
  if (quantity >= 10 && quantity <= 20) return 0.2
  if (quantity >= 4) return 0.1
  return 0
}
