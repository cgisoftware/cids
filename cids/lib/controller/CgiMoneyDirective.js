import { Money3Directive } from 'v-money3'

export default {
  install(app) {
    app.directive('cgi-money', Money3Directive)
  }
}

