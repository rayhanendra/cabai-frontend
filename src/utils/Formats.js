export const formatRupiah = (money) => {
  if (!money) return;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(money);
};

export const formatNumber = (number) => {
  if (!number) return;
  const round = number.toFixed(1);

  const toComma = round.toString().replace('.', ',');
  const toDecimal = toComma.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  return toDecimal;
};

export const toKuintal = (number) => {
  return number / 100;
};
