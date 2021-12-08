// query += `(num_chassi BEGINS '${params.search
//   .toString()
//   .split('/')}' or nome_fabricante BEGINS '${params.search
//   .toString()
//   .split('/')}' or opcao_catalogo BEGINS '${params.search
//   .toString()
//   .split('/')}' or modelo BEGINS '${params.search
//   .toString()
//   .split('/')}' or valor = '${params.search
//   .toString()
//   .split('/')}' or cod_emp = '${params.search
//   .toString()
//   .split('/')}' or seq_estoque = '${params.search.toString().split('/')}')`

import { toAblDate } from './FormatAblDate'

const toAblQueryForm = (formConfig, form) => {
  let query = ''

  Object.entries(formConfig).forEach((linha, indexLinha) => {
    console.log(linha[1])
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
