// import Cleave from 'cleave.js'

import { formatNumber } from './handler/FormatNumber'

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
  install(Vue, options) {
    Vue.directive('cgi-money', {
      inserted: (el, binding) => {
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
    })
  },
}
