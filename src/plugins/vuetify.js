import Vue from "vue";
import Vuetify from "vuetify/lib";
import en from "vuetify/src/locale/en.ts";
import pt from "vuetify/src/locale/pt.ts";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#354565",
        nav: "#FFFFFF",
        intra_text: "#000000",
        intra_table_card: "#f4f4f4"
      },
      dark: {
        primary: "#4D79BB",
        nav: "#303030",
        intra_text: "#ffffff",
        intra_table_card: "#33353d"
      },
    },
  },
  lang: {
    locales: {
      pt,
      en,
    },
    current: "pt",
  },
  icons: {
    iconfont: "mdi",
  },
});