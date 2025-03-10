export const filtro = (filtro) => {
  let retorno = '';

  for (var [key1, nivel1] of Object.entries(filtro)) {
    if (nivel1.logic == undefined) {
      continue;
    }

    const field = key1 /* nome do campo ex: cod_cli */
    let logic = nivel1.logic.toUpperCase() /* AND | OR */
    const ablType = nivel1.ablType.toLowerCase() /* integer | decimal |character | date | logical */
    let arrGroup = []

    for (var [key2, nivel2] of Object.entries(nivel1)) {

      if (key2 == "logic" || key2 == "ablType") {
        continue;
      }

      if (nivel2.seValorRemove != undefined && nivel2.seValorRemove === nivel2.value) {
        continue;
      } else if (Array.isArray(nivel2.seValorRemove)) {
        let lTemValor = false;
        for (let iI2 = 0; iI2 < nivel2.seValorRemove.length; iI2++) {
          const vlr = nivel2.seValorRemove[iI2];
          if (vlr === nivel2.value) {
            lTemValor = true;
            break;
          }
        }
        if (lTemValor) {
          continue;
        }
      }

      let operator = null
      let value = null

      if (Array.isArray(nivel2.value) == false) {
        operator = nivel2.operator.toUpperCase()
        value = _valorTipado(nivel2.value, ablType, operator)
        arrGroup.push(`${field} ${operator} ${value}`)
      } else {
        for (let iI2 = 0; iI2 < nivel2.value.length; iI2++) {
          logic = 'OR'
          value = _valorTipado(nivel2.value[iI2], ablType, '')

          arrGroup.push(`${field} = ${value}`)
        }
      }
    }

    if (arrGroup.length > 0) {
      if (retorno != "") {
        retorno += ' AND '
      }

      retorno += `(${arrGroup.join(' ' + logic + ' ')})`
    }
  }
  return retorno;
}

export const search = (colunas, search) => {
  let retorno = ''
  let arrSearch = []

  if (search) {
    for (const o of colunas) {
      const ablSearch = o?.ablSearch ?? false
      if (!ablSearch) {
        continue
      }

      switch (o?.ablType ?? '') {
        case "character":
          arrSearch.push(`${o.value} MATCHES "*${search}*"`)
          break;
        case "integer":
          const iInt = parseInt(search)
          if (Number.isInteger(iInt) && iInt >= -999999999 && iInt <= 999999999)
            arrSearch.push(`${o.value} = ${iInt}`)
          break;
        case "decimal":
          if (isNaN(parseFloat(search)))
            arrSearch.push(`${o.value} = ${parseFloat(search)}`)
          break;
        case "logical":
          if (search.toLowerCase() === 'true' || search.toLowerCase() === 'false')
            arrSearch.push(`${o.value} = ${search}.toLowerCase()`)
          break;
        case "date":
          if (typeof (search) == "string" &&
            search.substring(2, 3) == "/" &&
            search.substring(5, 6) == "/" &&
            search.length == 10)
            arrSearch.push(`${o.value} = DATE(${search.substring(3, 5)},${search.substring(0, 2)},${search.substring(6, 10)})`)
          break;
      }
    }

    if (arrSearch.length > 0) {
      retorno += `(${arrSearch.join(' or ')})`
    }
  }
  return retorno
}

export const orderBy = (sortBy, sortDesc) => {
  const orderBy = []
  for (let i = 0; i < (sortBy?.length ?? 0); i++) {
    orderBy.push(`${sortBy[i]} ${sortDesc[i] ? 'DESC' : ''}`.trim())
  }
  return orderBy.join(",");
}

const _valorTipado = (vlr, ablType, operator) => {
  let retorno = ""
  switch (ablType) {
    case 'character':
      if (typeof (vlr) == "string") {
        if (operator === 'MATCHES') {
          retorno = `"*${vlr}*"`
        } else {
          retorno = `"${vlr}"`
        }
      } else {
        if (typeof (vlr) == "number") {
          retorno = `"${String(vlr)}"`
        } else {
          retorno = '?'
        }
      }
      break;

    case 'date':
      if (typeof (vlr) == "string" &&
        vlr.substring(2, 3) == "/" &&
        vlr.substring(5, 6) == "/" &&
        vlr.length == 10) {
        retorno = `DATE(${vlr.substring(3, 5)},${vlr.substring(0, 2)},${vlr.substring(6, 10)})`
      } else {
        retorno = '?'
      }
      break;

    case 'datetime':
      //vlr += " 12:01:02"
      // "25/10/2022"
      if (
        typeof vlr == 'string' &&
        vlr.substring(2, 3) == '/' &&
        vlr.substring(5, 6) == '/' &&
        vlr.length == 10
      )
        retorno = `DATETIME(${vlr.substring(0, 2)}/${vlr.substring(3, 5)}/${vlr.substring(6, 10)})`
      //"25/10/2022 12:00:00"
      else if (
        typeof vlr == 'string' &&
        vlr.substring(2, 3) == '/' &&
        vlr.substring(5, 6) == '/' &&
        vlr.substring(13, 14) == ':' &&
        vlr.substring(16, 17) == ':' &&
        vlr.length == 19
      )
        retorno = `DATETIME(${vlr.substring(3, 5)},${vlr.substring(0, 2)},${vlr.substring(6, 10)},${vlr.substring(11, 13)},${vlr.substring(14, 16)},${vlr.substring(17, 19)})`
      //"25/10/2022 12:00:00.000"
      else if (
        typeof vlr == 'string' &&
        vlr.substring(2, 3) == '/' &&
        vlr.substring(5, 6) == '/' &&
        vlr.substring(13, 14) == ':' &&
        vlr.substring(16, 17) == ':' &&
        vlr.substring(19, 20) == '.' &&
        vlr.length == 23
      )
        retorno = `DATETIME(${vlr.substring(3, 5)},${vlr.substring(0, 2)},${vlr.substring(6, 10)},${vlr.substring(11, 13)},${vlr.substring(14, 16)},${vlr.substring(17, 19)},${vlr.substring(20, 23)})`
      else retorno = '?'
      break

    case 'logical':
      retorno = (vlr === true)
      break;

    case 'integer':
      if (typeof (vlr) == "number" &&
        Number.isInteger(vlr) &&
        vlr >= -999999999 &&
        vlr <= 999999999) {
        retorno = `${vlr}`
      } else {
        retorno = '?'
      }
      break;

    case 'decimal':
      if (typeof (vlr) == "number") {
        retorno = `${vlr}`
      } else {
        retorno = '?'
      }

      break;

    default:
      retorno = '?'
  }

  return retorno
}


export const ablFilter = (formFiltro, tabela, paginacao, pesquisa) => {
  const { itemsPerPage, page, sortBy, sortDesc } = paginacao  

  const payload = {
    skip: (itemsPerPage * page) - itemsPerPage,
    top: itemsPerPage,
    ablFilter: "",
    orderBy: orderBy(sortBy, sortDesc)
  }

  const rowid = filtro?.rowid ?? ''

  payload.ablFilter = ''
  if (typeof rowid === 'string' & rowid != '') {
    query = `rowid = "${rowid}"`
    filtro.rowid = ''
  } else {
    const ablFilter = filtro(formFiltro)
    const ablSearch = search(tabela, pesquisa)

    payload.ablFilter = ablFilter
    if (ablSearch) {
      if (payload.ablFilter != '') {
        payload.ablFilter += ' AND '
      }
      
      payload.ablFilter += ablSearch
    }

    if (payload.ablFilter) {
      payload.ablFilter = `(${payload.ablFilter})`
    }
  }

  return payload
}