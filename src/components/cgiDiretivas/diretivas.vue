<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Diretivas monetárias</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <cgi-number label="Valor" v-model="valor"></cgi-number>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
            <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="codeMoney"
            ></code>
      </pre>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 600px)"
          :linhas="linhasValores"
          :colunas="colunasValores"
          mostra-pesquisa
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-15">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Diretivas de números</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Tamanho máximo</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <v-text-field
        label="Limitado em 5 dígitos"
        v-cgi-max-length="5"
        v-model="tamMax"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
            <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="codeNumMax"
            ></code>
      </pre>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Números negativos</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <v-text-field
        label="Bloqueia números negativos"
        v-cgi-negative-number
        v-model="numNeg"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
            <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="codeNumNegativo"
            ></code>
      </pre>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import { ref } from "vue";

const valor = 1500;
const tamMax = 12345;
const numNeg = 12;

const code = `
<template>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <cgi-number label="Valor"></cgi-number>
    </v-col>
  </v-row>
</template>
`;
const numeroMax = `
<template>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <v-text-field
        label="Limitado em 5 dígitos"
        v-cgi-max-length="5"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
`;
const numeroNegativo = `
<template>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <v-text-field
        label="Bloqueia números negativos"
        v-cgi-negative-number
      ></v-text-field>
    </v-col>
  </v-row>
</template>
`;
const formataCampo = `
<template>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <v-text-field label="Formata o campo" v-cgi-mask></v-text-field>
    </v-col>
  </v-row>
</template>
`;

const codeMoney = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);
const codeNumMax = ref(
  Prism.highlight(numeroMax, Prism.languages.javascript, "javascript")
);
const codeNumNegativo = ref(
  Prism.highlight(numeroNegativo, Prism.languages.javascript, "javascript")
);
const colunasValores = [
  {
    text: "Propriedade",
    align: "start",
    sortable: false,
    value: "propriedade",
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
  {
    text: "Descrição",
    align: "start",
    sortable: false,
    value: "descricao",
  },
];

const linhasValores = [
  {
    propriedade: "compacto",
    tipo: "Boolean",
    default: "false",
    descricao: "Compacta o tamanho do campo",
  },
  {
    propriedade: "nome",
    tipo: "String",
    default: '" "',
    descricao: "Determina um nome para o campo",
  },
  {
    propriedade: "regras",
    tipo: "Array",
    default: '" "',
    descricao: "Define regras para o campo",
  },
  {
    propriedade: "desabilitado",
    tipo: "Boolean",
    default: "false",
    descricao: "Desabilita campo",
  },
  {
    propriedade: "somenteLeitura",
    tipo: "Boolean",
    default: "false",
    descricao: "Habilita somente leitura no campo",
  },
  {
    propriedade: "precisao",
    tipo: "Number",
    default: "2",
    descricao: "Determina precisão no campo",
  },
  {
    propriedade: "min",
    tipo: "Number",
    default: "0",
    descricao: "Tamanho mínimo",
  },
  {
    propriedade: "min",
    tipo: "Number",
    default: "999999999999999",
    descricao: "Tamanho máximo",
  },
  {
    propriedade: "inputProps",
    tipo: "Object",
    default: '" "',
    descricao: " ",
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
