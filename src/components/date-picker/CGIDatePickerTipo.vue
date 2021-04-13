<template>
  <div>
    <strong>Campo data por tipo (mes)</strong>
    <br>
    <br>
    <cgi-date-picker
      v-model="data"
      nome="Data"
      tipo="mes"
    ></cgi-date-picker>
    Data v-model: {{data}}

    <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>

    <v-divider class="my-5"></v-divider>
  </div>
</template>

<script>
import Prism from "prismjs";
// import "prismjs/components/prism-json";
export default {
  data: () => ({
    data: "10/2021",
    dataExample: Prism.highlight(
      `
        <templete>
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