<template>
  <div>
     <strong>Campo hora default</strong>
    <br>
    <br>
    <cgi-time-picker
      v-model="hora"
      nome="Hora"
    ></cgi-time-picker>
    Hora v-model: {{hora}}

    <pre>
                <code
                class="language-html py-5"
                v-html="horaExample"
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
    hora: "08:02",
    horaExample: Prism.highlight(
      `
        <templete>
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