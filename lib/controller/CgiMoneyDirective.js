import Cleave from 'cleave.js'

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
    Vue.directive('cgi-money', {
      inserted: (el) => {
        el = getInput(el)
        el.cleave = new Cleave(
          el,
          {
            numeral: true,
            numeralDecimalMark: ",",
            delimiter: '.',
            numeralPositiveOnly: true
          } || {}
        )
      },
      update: (el) => {
        el = getInput(el)
        const event = new Event('input', { bubbles: true })
        setTimeout(function() {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
        }, 100)
      },
    })
  },
}
