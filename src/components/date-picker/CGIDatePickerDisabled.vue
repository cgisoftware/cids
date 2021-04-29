<template>
  <section id="data-picker-desabilitado">
    <div>
      <strong>
        <a href="#data-picker-desabilitado">Campo data desabilitado</a>
      </strong>
      <br />
      <br />
      <cgi-date-picker
        v-model="data"
        nome="Data"
        desabilitado
      ></cgi-date-picker>
      Data v-model: {{ data }}

      <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>

      <v-divider class="my-5"></v-divider>
    </div>
  </section>
</template>

<script>
import Prism from "prismjs";
// import "prismjs/components/prism-json";
export default {
  data: () => ({
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
