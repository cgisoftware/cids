<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title
        :class="theme.global.current.dark ? 'white--text' : 'black--text'"
      >
        Diretiva: v-cgi-max-length
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-text-field
        label="Texto"
        v-model="valor"
        v-cgi-max-length="10"
      ></v-text-field>
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
    valor: "Teste",
    moneyExample: Prism.highlight(
      `
        <template>
            <v-text-field
                label="Texto"
                v-model="valor"
                v-cgi-max-length="10"
            ></v-text-field>
        <\/template>

        <script>
            export default {
                data: () => ({
                    valor: "Teste",
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>