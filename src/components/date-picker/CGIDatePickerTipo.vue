<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"  class="subtitle-1">
        Campo Data Por Tipo (mês)
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-date-picker v-model="data" nome="Data" tipo="mes"></cgi-date-picker>
      Data v-model: {{ data }}

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
import Prism from "prismjs";
export default {
  data: () => ({
    data: "10/2021",
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-date-picker
                v-model="data"
                nome="Data"
                tipo="mes"
            ></cgi-date-picker>
        <\/template>

        <script>
            export default {
                data: () => ({
                    data: "10/2021"
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>
