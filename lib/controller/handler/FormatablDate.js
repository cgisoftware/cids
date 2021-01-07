const opcoes = {
  dia: (date) => {
    const [dia, mes, ano] = date.split("/");

    return `DATE(${mes}, ${dia}, ${ano})`;
  },
  mes: (date) => {
    const [mes, ano] = date.split("/");

    return `DATE(${mes}, 1, ${ano})`;
  },
  ano: (date) => {
    const [, , ano] = date.split("/");

    return `1, 1, ${ano})`;
  },
};

/**
 * @param date Recebe a data a ser convertida (DD//MM/YYYY ou MM/YYYY ou YYYY)
 * @param type Recebe o tipo de conversão (dia, mes ou ano)
 * @returns {string} Retorna a data formatada para abl (DATE(mes, dia, ano))
 */
export const toAblDate = (date, type) => {
  return opcoes[type](date);
};
