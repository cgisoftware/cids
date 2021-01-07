import XLSX from "xlsx";

/**
 * @param dataset Recebe uma array com os dados para serem exportados
 * @param nome Recebe o nome do arquivo para download
 * @returns {void}
 */
export const toExcel = (dataset, nome) => {
  var dados = XLSX.utils.json_to_sheet(dataset);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, dados, "dados");
  XLSX.writeFile(wb, `${nome}.xlsx`);
};
