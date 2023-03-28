import VMasker from 'vanilla-masker'
import { getInput } from './handler/GetInput'
import { VMoney } from 'v-money'

export default {
  install(Vue) {
    Vue.directive('cgi-money', VMoney)
  }
}

