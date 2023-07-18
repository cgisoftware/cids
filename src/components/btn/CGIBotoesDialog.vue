<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title
        :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"
      >
        Botões Dialog
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-row>
        <v-col cols="4">
          <cgi-btn salvar @click="salvar()"></cgi-btn>
        </v-col>
        <v-col cols="4">
          <cgi-btn cancelar @click="cancelar()"></cgi-btn>
        </v-col>
        <v-col cols="4">
          <cgi-btn limpar @click="limpar()"></cgi-btn>
        </v-col>
      </v-row>

      <pre class="language-html py-5">
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
  data: () => ({
    dataExample: Prism.highlight(
      `
        <template>
          <v-row>
            <v-col cols="4">
              <cgi-btn salvar @click="salvar()"></cgi-btn>
            </v-col>
            <v-col cols="4">
              <cgi-btn cancelar @click="cancelar()"></cgi-btn>
            </v-col>
            <v-col cols="4">
              <cgi-btn limpar @click="limpar()"></cgi-btn>
            </v-col>
          </v-row>
        <\/template>

        <script>
            export default {
              salvar() {
                console.log("Botão SALVAR!");
              },
              cancelar() {
                console.log("Botão CANCELAR!");
              },
              limpar() {
                console.log("Botão LIMPAR!");
              },
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
  methods: {
    salvar() {
      console.log("Botão SALVAR!");
    },
    cancelar() {
      console.log("Botão CANCELAR!");
    },
    limpar() {
      console.log("Botão LIMPAR!");
    },
  },
};
</script>

<style>
</style>