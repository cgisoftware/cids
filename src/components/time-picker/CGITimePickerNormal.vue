<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-card-title primary-title class="font-weight-bold">
      Exemplos
    </v-card-title>
    <v-divider></v-divider>
    <v-toolbar flat>
      <v-toolbar-title
        :class="theme.global.current.dark ? 'white--text' : 'black--text'"
        class="subtitle-1"
      >
        Campo Hora Default
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-time-picker v-model="hora" nome="Hora"></cgi-time-picker>
      Hora v-model: {{ hora }}

      <pre class="language-html py-5">
      <code
        class="language-html py-5"
        style="font-size: 14px; ">
        <div v-html="horaExample"></div></code>
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
    hora: "08:02",
    horaExample: Prism.highlight(
      `
        <template>
            <cgi-time-picker
                v-model="hora"
                nome="Hora"
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