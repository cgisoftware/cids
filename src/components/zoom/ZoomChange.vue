<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'">
        Zoom Com Evento <b>@change</b>
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-zoom-picker
        chave="id"
        :zoom="component"
        v-model="nome"
        nome="Desenvolvedor"
        posicao="inicial"
        @change="fazAlgo"
      ></cgi-zoom-picker>

      <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>
    </v-card-text>
  </v-card>
</template>

<script>
import { snackbar } from "cids-cgi/lib/util";
import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
export default {
  methods: {
    fazAlgo(item) {
      //faz algo com o item selecionado no zoom
      snackbar.confirm({ message: `olha o item ai ${JSON.stringify(item)}` });
    },
  },
  data: () => ({
    component: CGIDataTableAcoes,
    nome: null,
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-zoom-picker
                chave="id"
                :zoom="component"
                v-model="idDesenvolvedor"
                nome="Desenvolvedor"
                posicao="inicial"
                @change="fazAlgo"
            ></cgi-zoom-picker>
        <\/template>

        <script>
            import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
            export default {
                methods: {
                  fazAlgo(item) {
                    //faz algo com o item selecionado no zoom
                  }
                },
                data: () => ({
                    component: CGIDataTableAcoes,
                    idDesenvolvedor: null,
                }
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>