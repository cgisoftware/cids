<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title
        :class="theme.global.current.dark ? 'white--text' : 'black--text'"
        class="subtitle-1"
      >
        Campo Data Desabilitado
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-date-picker
        v-model="data"
        nome="Data"
        desabilitado
      ></cgi-date-picker>
      Data v-model: {{ data }}

      <pre class="language-html py-5">
                <code
                class="language-html py-5"
                style="font-size: 14px; "
              ><div v-html="dataExample"></div></code>
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
    data: "10/10/2021",
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-date-picker
                v-model="data"
                nome="Data"
                desabilitado
            ></cgi-date-picker>
        <\/template>

        <script>
            export default {
                data: () => ({
                    data: "10/10/2021"
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>