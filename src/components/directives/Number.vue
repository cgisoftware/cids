<template>
  <section id="v-cgi-number">
    <div>
      <strong> <a href="#v-cgi-number">v-cgi-number</a> </strong>
      <br />
      <br />
      <v-text-field label="Valor" v-model="valor" v-cgi-number></v-text-field>
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
  </section>
</template>

<script>
export default {
  data: () => ({
    valor: 750.5,
    numberExample: Prism.highlight(
      `
        <template>
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
