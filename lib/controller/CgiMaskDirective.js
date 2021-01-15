import Cleave from 'cleave.js'

const enums = {
  cpf: {
    numericOnly: true,
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
    uppercase: true
  },
  cnpj: {
    numericOnly: true,
    delimiters: ['.', '.', '/', '-'],
    blocks: [2, 3, 3, 4, 2],
    uppercase: true
  },
  'dia-mes-ano': {
    date: true,
    delimiter: '/',
    datePattern: ['d', 'm', 'Y'],
  },
  'dia-mes': {
    date: true,
    delimiter: '/',
    datePattern: ['d', 'm'],
  },
  'mes-ano': {
    date: true,
    delimiter: '/',
    datePattern: ['m', 'Y'],
  },
  hora: {
    time: true,
    timePattern: ['h', 'm'],
  },
}

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
    Vue.directive('cgi-mask', {
      inserted: (el, binding) => {
        el = getInput(el)
        
        el.cleave = new Cleave(el, enums[binding.value.tipo] || {})
        
        if (binding.value.multiplo) {
            el.addEventListener('input', (valor) => {
                if (valor.target.value.length > 14) {
                    el.cleave.destroy()
                    el.cleave = new Cleave(el, enums["cnpj"] || {})
                } else {
                    el.cleave.destroy()
                    el.cleave = new Cleave(el, enums["cpf"] || {})
                }
            });
        }
      }
    })
  },
}
