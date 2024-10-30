<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Date picker</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center mt-10">
    <v-col cols="4" class="d-flex justify-center align-center">
      <cgi-date-picker v-model="data" nome="Data" compacto></cgi-date-picker>
    </v-col>
  </v-row>

  <v-row class="mb-10">
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
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 600px)"
          :linhas="linhasProps"
          :colunas="colunasProps"
          mostra-pesquisa
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Tipos</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 800px)"
          :linhas="linhasFormato"
          :colunas="colunasFormato"
          mostra-pesquisa
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";

const data = ref("15/10/2004");
const mes = ref("10/2004");

const code = `
  <template> 
    <v-row class="d-flex justify-center align-center mt-10">
      <v-col cols="4" class="d-flex justify-center align-center">
        <cgi-date-picker v-model="data" nome="Data" compacto> </cgi-date-picker>
      </v-col>
    </v-row>  
  </template>

  < /script setup>
    import { ref } from "vue";

    const data = ref("15/10/2004");
  < /script>
`;

const codeExample = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);

const linhasProps = [
  {
    parametros: "compacto",
    obrigatorio: "false",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "nome",
    obrigatorio: "true",
    tipo: "String",
    default: " ",
  },
  {
    parametros: "regras",
    obrigatorio: "false",
    tipo: "Array",
    default: " ",
  },
  {
    parametros: "modelValue",
    obrigatorio: "false",
    tipo: "String",
    default: '" "',
  },
  {
    parametros: "tipo",
    obrigatorio: "false",
    tipo: "String",
    default: "dia",
  },
  {
    parametros: "desabilitado",
    obrigatorio: "false",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "somenteLeitura",
    obrigatorio: "false",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "formato",
    obrigatorio: "false",
    tipo: "String",
    default: "DD/MM/YYYY",
  },
];

const colunasProps = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
  },
  {
    text: "Obrigatório?",
    align: "start",
    sortable: true,
    value: "obrigatorio",
  },
  {
    text: "Tipo",
    align: "start",
    sortable: true,
    value: "tipo",
  },
  {
    text: "Default",
    align: "start",
    sortable: true,
    value: "default",
  },
];

const linhasFormato = [
  {
    tipo: "dia",
    formato: "15/10/2004",
  },
  {
    tipo: "mes",
    formato: "10/2004",
  },
];

const colunasFormato = [
  {
    text: "Tipo",
    align: "start",
    sortable: false,
    value: "tipo",
  },
  {
    text: "Formato",
    align: "start",
    sortable: false,
    value: "formato",
  },
];
</script>
