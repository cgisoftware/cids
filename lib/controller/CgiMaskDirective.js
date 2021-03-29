import VMasker from 'vanilla-masker'

const enums = {
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  hora: '99:99',
  'de-ate': '999.999.999',
  'dia-mes-ano': '99/99/9999',
  'dia-mes': '99/99',
  'mes-ano': '99/9999',
  'cnpj-cnpf': '',
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
      update(el, binding) {
        el = getInput(el)
        var event = new Event('input', { bubbles: true })
        let maxChars = enums[binding.value].length
        if (el.value.length > maxChars) {
          el.value = el.value.substr(0, maxChars)
          el.dispatchEvent(event)
        }
      },

      inserted: (el, binding) => {
        el = getInput(el)
        // el.addEventListener('input', () => {
        //   // seleciona o campo pelo atributo "name"
        //   // evento "input" que detecta mudança de valor no campo
        //   // se for menor ou igual a 50, altera texto com o valor no span
        //   var max_chars = enums[binding.value].length

        //   if (el.value.length > max_chars) {
        //     el.value = el.value.substr(0, max_chars)
        //   }
        // })
        if (binding.value === 'cnpj-cnpf') {
          var docMask = ['999.999.999-999', '99.999.999/9999-99']
          VMasker(el).maskPattern(docMask[0])
          el.addEventListener(
            'input',
            inputHandler.bind(undefined, docMask, 14),
            false
          )
        } else {
          VMasker(el).maskPattern(enums[binding.value])
        }
      },
    })
  },
}

function inputHandler(masks, max, event) {
  var c = event.target
  var v = c.value.replace(/\D/g, '')
  var m = c.value.length > max ? 1 : 0
  VMasker(c).unMask()
  VMasker(c).maskPattern(masks[m])
  c.value = VMasker.toPattern(v, masks[m])
}
