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
        :zoom="ROTA_DO_COMPONENTE"
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
export default {
  methods: {
    fazAlgo(item) {
      //faz algo com o item selecionado no zoom
    },
  },
  data: () => ({
    nome: null,
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-zoom-picker
              chave="id"
              :zoom="ROTA_DO_COMPONENTE"
              v-model="nome"
              nome="Desenvolvedor"
              posicao="inicial"
              @change="fazAlgo"
            ></cgi-zoom-picker>
        <\/template>

        <script>
            export default {
                methods: {
                  fazAlgo(item) {
                    //faz algo com o item selecionado no zoom
                  }
                },
                data: () => ({
                  nome: null,
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>