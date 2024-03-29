import VMasker from 'vanilla-masker'

const getInput = (el) => {
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    const els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      throw new Error(`v-cleave requires 1 input, found ${els.length}`)
    } else {
      el = els[0]
    }
  }
  return el
}

export default {
  install(Vue) {
    Vue.directive('cgi-number', {
      inserted: (el) => {
        el = getInput(el)

        let event = new Event('input', { bubbles: true })
        const number = formatBRNUmber(el.value)
        el.value =
          number !== "NaN" && number !== undefined && number !== ''
            ? number
            : '0,00'
        el.dispatchEvent(event)

        VMasker(el).maskMoney({
          // Decimal precision -> "90"
          precision: 2,
          // Decimal separator -> ",90"
          separator: ',',
          // Number delimiter -> "12.345.678"
          delimiter: '.',
          // Money unit -> "R$ 12.345.678,90"
          unit: '',
          // Money unit -> "12.345.678,90 R$"
          suffixUnit: '',
          // Force type only number instead decimal,
          // masking decimals with ",00"
          // Zero cents -> "R$ 1.234.567.890,00"
          zeroCents: false,
        })


        el.addEventListener('blur', () => {
          let event = new Event('input', { bubbles: true })

          const number = formatBRNUmber(el.value)

          el.value =
            number !== "NaN" && number !== undefined && number !== ''
              ? number
              : '0,00'

          el.dispatchEvent(event)
        })
      },
      update(el) {
        let event = new Event('input', { bubbles: true })
        el = getInput(el)
        const number = formatBRNUmber(el.value)
        el.value =
          number !== "NaN" && number !== undefined && number !== ''
            ? number
            : '0,00'
        el.dispatchEvent(event)
      },
    })
  },
}

function formatBRNUmber(v) {

  if (v.length === 1) {
    v = "0" + v
  }

  const valor = v
    .split('.')
    .join('')
    .split(',')
    .join('')
  const vc =
    valor.substr(0, valor.length - 2) + '.' + valor.substr(valor.length - 2)

  const number = parseFloat(vc)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    .replace('R$', '')
    .trim()

  return number
}
