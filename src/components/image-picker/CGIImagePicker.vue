<template>
  <div>
    <v-toolbar color="primary" dark extended flat> </v-toolbar>

    <v-card class="mx-auto" width="90%" style="margin-top: -64px">
      <v-toolbar flat>
        <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"> Image Picker </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <cgi-image-picker
          height="200"
          width="200"
          circular
          v-model="file"
          :url="url"
        ></cgi-image-picker>
        <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Prism from "prismjs";
export default {
  data: () => ({
    file: null,
    url: "http://192.168.200.20:29710/web/DownloadUploadFiles?arq=14682&usuario=root&senha=root",
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
