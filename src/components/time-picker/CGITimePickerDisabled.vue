<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'" class="subtitle-1">
        Campo Hora Desabilitado
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-time-picker
        v-model="hora"
        nome="Hora"
        desabilitado
      ></cgi-time-picker>
      Hora v-model: {{ hora }}

      <pre>
                <code
                class="language-html py-5"
                v-html="horaExample"
                style="font-size: 14px"
              ></code>
              </pre>
    </v-card-text>
  </v-card>
</template>

<script>
import Prism from "prismjs";
export default {
  data: () => ({
    hora: "08:02",
    horaExample: Prism.highlight(
      `
        <template>
            <cgi-time-picker
                v-model="hora"
                nome="Hora"
                desabilitado
            ></cgi-time-picker>
        <\/template>

        <script>
            export default {
                data: () => ({
                    hora: "08:02"
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>