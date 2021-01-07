const _arrayFromObject = (obj) => {
  var arr = [];
  for (var i in obj) {
    arr.push(obj[i]);
  }
  return arr;
};

/**
 * @param dataset Recebe uma array com os dados para serem agrupados
 * @param fn Recebe uma função com um array contendo os agrupamentos 
 * @returns {Array} Retorna um array com dados agrupados
 */
export const groupBy = (dataset, fn) => {
  var groups = {};
  for (var i = 0; i < dataset.length; i++) {
    var group = JSON.stringify(fn(dataset[i]));
    if (group in groups) {
      groups[group].push(dataset[i]);
    } else {
      groups[group] = [dataset[i]];
    }
  }
  return _arrayFromObject(groups);
};
