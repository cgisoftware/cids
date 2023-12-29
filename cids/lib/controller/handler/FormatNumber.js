/**
 * @param value Recebe o numero a ser formatado no padrão brasileiro
 * @returns {string} Retorna o valor formatado (111.111.111,11)
 */

export const formatNumber = (value) => {
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const moedaParaFloat = (valor) => {
  if (valor) {
    return parseFloat(valor.replace("R\$", "").split(".").join("").replace(",", "."))
  }

  return 0.0
}

export const formataMoeda = (valor, precisao = 2) => {
  return valor?.toLocaleString('pt-br', { minimumFractionDigits: precisao, maximumFractionDigits: precisao })
}
