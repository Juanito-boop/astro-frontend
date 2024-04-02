export function formatTotalBill(totalBill: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(totalBill);
}
