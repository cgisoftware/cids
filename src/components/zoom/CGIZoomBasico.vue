<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat> </v-toolbar>

    <v-card class="mx-auto mb-5" width="90%" style="margin-top: -64px">
      <v-toolbar flat>
        <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"> Básico </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <cgi-zoom-picker
          chave="id"
          :zoom="ROTA_DO_COMPONENTE"
          v-model="nome"
          nome="Desenvolvedor"
          posicao="inicial"
          formata-valor
          :ao-digitar="buscaDescricao"
        ></cgi-zoom-picker>

        {{ nome }}

        <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  methods: {
    buscaDescricao() {
     //faz algo
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
              formata-valor
              :ao-digitar="buscaDescricao"
            ></cgi-zoom-picker>
        <\/template>

        <script>
            export default {
              data: () => ({
                  nome: null,
              }),
              methods: {
                buscaDescricao() {
                  //faz algo
                },
              },
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>

