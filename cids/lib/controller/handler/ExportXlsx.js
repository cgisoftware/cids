import * as XLSX from "xlsx";

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



/**
 * @param idTabela Recebe o id da tabela para exportar exatamente o layout que tem na mesma
 * @param nome Recebe o nome do arquivo para download
 * @returns {void}
 */
export const toExcelID = (idTabela, nome) => {
  var a = document.createElement('a');
  var data_type = 'data:application/vnd.ms-excel; charset=UTF-8';
  var table_div = document.getElementById(idTabela);
  var table_html = table_div.outerHTML.replace(/ /g, '%20');
  a.href = data_type + ', ' + table_html;
  a.download = `${nome}.xls`;
  a.click();
}
