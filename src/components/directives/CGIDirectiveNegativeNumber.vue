<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title
        :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"
      >
        Diretiva: v-cgi-negative-number
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-text-field
        label="Número"
        v-model="valor"
        v-cgi-negative-number="true"
      ></v-text-field>
      Valor v-model: {{ valor }}

      <pre>
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
export default {
  data: () => ({
    valor: "10",
    moneyExample: Prism.highlight(
      `
        <template>
            <v-text-field
                label="Número"
                v-model="valor"
                v-cgi-negative-number="true"
            ></v-text-field>
        <\/template>

        <script>
            export default {
                data: () => ({
                    valor: "10",
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>
