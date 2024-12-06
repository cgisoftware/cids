<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Imagens</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-15">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-image-picker circular width="280" height="280"></cgi-image-picker>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
            <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="codeExample"
              ></code>
            </pre>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Props</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 800px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import { ref } from "vue";

const code = `
<template>
  <v-row class="d-flex justify-center align-center py-15">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-image-picker 
        circular 
        width="280" 
        height="280"
      >
      </cgi-image-picker>
    </v-col>
  </v-row>
</template>
`;

const codeExample = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);

const colunasTabela = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
  },
  {
    text: "Tipo",
    align: "start",
    sortable: false,
    value: "tipo",
  },
  {
    text: "Default",
    align: "start",
    sortable: false,
    value: "default",
  },
];

const linhasTabela = [
  {
    parametros: "circular",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "height",
    tipo: "String",
    default: "200",
  },
  {
    parametros: "width",
    tipo: "String",
    default: "200",
  },
  {
    parametros: "url",
    tipo: "String",
    default: "null",
  },
];
</script>

<style scoped>
pre {
  background-color: #1e1e1e;
  border-radius: 5px;
  padding: 10px;
}
</style>
