<template>
  <v-toolbar color="primary" dark extended flat> </v-toolbar>

  <v-card class="mx-auto mb-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title
        :class="theme.global.current.dark ? 'white--text' : 'black--text'"
      >
        Diretiva: v-cgi-money
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-text-field label="Valor" v-model="valor" v-cgi-money></v-text-field>
      Valor v-model: {{ valor }}

      <pre class="language-html py-5">
                <code
                class="language-html py-5"
                v-html="moneyExample"
                style="font-size: 14px; "
              ></code>
              </pre>
    </v-card-text>
  </v-card>
</template>

<script>
import { useTheme } from "vuetify";

export default {
  data: () => ({
    dark: false,
    theme: useTheme(),
    valor: "75,50",
    moneyExample: Prism.highlight(
      `
        <template>
            <v-text-field
                label="Valor"
                v-model="valor"
                v-cgi-money
            ></v-text-field>
        <\/template>

        <script>
            export default {
                data: () => ({
                    valor: "75,50"
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>