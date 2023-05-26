import { VMoney } from 'v-money3'

export default {
  install(Vue) {
    Vue.directive('cgi-money', VMoney)
  }
}

