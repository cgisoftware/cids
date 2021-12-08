import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/lib/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: 'blue',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { pt },
      current: 'pt',
    },
});
