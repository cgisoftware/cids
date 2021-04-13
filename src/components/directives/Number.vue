<template>
  <div>
    <strong>v-cgi-number</strong>
    <br>
    <br>
    <v-text-field
      label="Valor"
      v-model="valor"
      v-cgi-number
    ></v-text-field>
    Valor v-model: {{ valor }}

    <pre>
                <code
                class="language-html py-5"
                v-html="numberExample"
                style="font-size: 14px; "
              ></code>
              </pre>

    <v-divider class="my-5"></v-divider>
  </div>
</template>

<script>
export default {
  data: () => ({
    valor: 750.50,
    numberExample: Prism.highlight(
      `
        <templete>
            <v-text-field
                label="Valor"
                v-model="valor"
                v-cgi-number
            ></v-text-field>
        <\/template>

        <script>
            export default {
                data: () => ({
                    valor: 750.50
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>