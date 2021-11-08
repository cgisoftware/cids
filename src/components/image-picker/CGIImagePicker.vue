<template>
  <div>
    <cgi-image-picker
      height="200"
      width="200"
      circular
      v-model="file"
    ></cgi-image-picker>
    <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>
  </div>
</template>

<script>
import Prism from "prismjs";
export default {
  data: () => ({
    file: null,
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-image-picker
                height="200"
                width="200"
                circular
                v-model="file"
            ></cgi-image-picker>
        <\/template>

        <script>
            export default {
                data: () => ({
                    file: null
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>
