export function currentMoney(num: number): string {
  let money = num.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return money;
}
