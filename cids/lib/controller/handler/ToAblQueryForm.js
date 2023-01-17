import { toAblDate } from './FormatAblDate'

const toAblQueryForm = (formConfig, form) => {
  let query = ''

  Object.entries(formConfig).forEach((linha, indexLinha) => {
    linha[1].forEach((item, index) => {
      if (item.chave) {
        if (item.query) {
          if (typeof form[item.chave] == "boolean" || form[item.chave]) {
            query += `${item.query.campo || item.chave} ${
              item.query.operacao
            } ${_formatacao(item.campo, item.tipo, form[item.chave])}`

            if (item.query.comparacao) {
              query += ` ${item.query.comparacao} `
            }
          }
        }
      }
    })
  })

  const endOfQuery = query.substr(query.length - 4).trim()

  if (endOfQuery === 'and' || endOfQuery === 'or') {
    query = query.slice(0, -4)
  }

  return query
}

const _formatacao = (campo, tipo, valor) => {
  if (campo === 'data') {
    return toAblDate(valor, 'dia')
  }

  if (campo === 'checkbox') {
    return valor
  }

  if (tipo !== 'number') {
    return `'${valor}'`
  }

  return valor
}

export default toAblQueryForm
