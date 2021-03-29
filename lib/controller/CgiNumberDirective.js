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
      },
      update(el) {
        el = getInput(el)
        var event = new Event('input', { bubbles: true })

        el = getInput(el)
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

        el.dispatchEvent(event)
      },
      // update: (el) => {
      //   el = getInput(el)
      //   const event = new Event('input', { bubbles: true })
      //   setTimeout(function() {
      //     el.value = el.cleave.properties.result
      //     el.dispatchEvent(event)
      //   }, 100)
      // },
    })
  },
}
