/**
 * @param value Recebe o numero a ser formatado no padrão brasileiro
 * @returns {string} Retorna o valor formatado (111.111.111,11)
 */

export const formatNumber = (value) => {
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
