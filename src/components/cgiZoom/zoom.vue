<script setup lang="ts"></script>

<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Zoom</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="justify-center align-center py-15">
    <v-col cols="3" class="justify-center align-center">
      <cgi-zoom-picker
        nome="Teste"
        chave="id"
        :zoom="ROTA_DO_COMPONENTE"
        formata-valor
      ></cgi-zoom-picker>
    </v-col>
  </v-row>

  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
              <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="code"
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
          altura="calc(100vh - 400px)"
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
          <h3 class="font-weight-light-bold">Exemplo de zoom em tabela</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="justify-center align-center py-15">
    <v-col cols="3" class="justify-center align-center">
      <cgi-zoom-picker
        nome="Zoom"
        chave="id"
        :zoom="ROTA_DO_COMPONENTE"
        formata-valor
      ></cgi-zoom-picker>
    </v-col>
  </v-row>
  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
              <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="codeZoom"
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

const codeExample = `
<template>
  <v-row class="justify-center align-center py-15">
    <v-col cols="2" class="justify-center align-center">
      <cgi-zoom-picker
        nome="Teste"
        chave="id"
        :zoom="ROTA_DO_COMPONENTE"
        formata-valor
      ></cgi-zoom-picker>
    </v-col>
  </v-row>
</template>
`;

const codeZoomTabela = `
// -------- COMPONENTE QUE CHAMA O ZOOM --------
<template>
  <v-row class="justify-center align-center py-15">
    <v-col cols="3" class="justify-center align-center">
      <cgi-zoom-picker
        nome="Zoom"
        chave="id"
        :zoom="ROTA_DO_COMPONENTE"
        formata-valor
      ></cgi-zoom-picker>
    </v-col>
  </v-row>
</template>
// -------- COMPONENTE QUE CHAMA O ZOOM --------

// -------- TABELA EXEMPLO --------
<template>
      <cgi-data-table
        nome-tabela="Cor do Veículo"
        nome-programa="Veículos"
        :colunas="colunas.value"
        :linhas="linhas.value"
        :altura="calc(100vh - 186px)"
        :zoom-dialog="controller.dialogZoom.value"
        @exporta-zoom="emit('exporta-zoom', $event)"
        @cancelar-zoom="emit('cancelar-zoom')"
      >
    </cgi-data-table>
</template>

< script setup>
const { controller } = defineProps({
  controller: { type: Object, required: true },
})

const emit = defineEmits(['exporta-zoom', 'cancelar-zoom'])

defineExpose({
  controller,
})

< /script>
// -------- TABELA EXEMPLO --------
`;

const code = ref(
  Prism.highlight(codeExample, Prism.languages.javascript, "javascript")
);
const codeZoom = ref(
  Prism.highlight(codeZoomTabela, Prism.languages.javascript, "javascript")
);

const colunasProps = [
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
    text: "Obrigatório?",
    align: "start",
    sortable: false,
    value: "obrigatorio",
  },
  {
    text: "Default",
    align: "start",
    sortable: false,
    value: "default",
  },
];

const linhasProps = [
  {
    propriedade: "chave",
    tipo: "String",
    obrigatorio: "true",
    default: "",
  },
  {
    propriedade: "zoom",
    tipo: "String, Promise",
    obrigatorio: "false",
    default: "",
  },
  {
    propriedade: "compacto",
    tipo: "Boolean",
    obrigatorio: "false",
    default: "false",
  },
  {
    propriedade: "nome",
    tipo: "String",
    obrigatorio: "true",
    default: "",
  },
  {
    propriedade: "regras",
    tipo: "Array",
    obrigatorio: "false",
    default: " ",
  },
  {
    propriedade: "desabilitado",
    tipo: "Boolean",
    obrigatorio: "false",
    default: "false",
  },
  {
    propriedade: "somenteLeitura",
    tipo: "Boolean",
    obrigatorio: "false",
    default: "false",
  },
  {
    propriedade: "posicao",
    tipo: "String",
    obrigatorio: "false",
    default: "",
  },
  {
    propriedade: "largura",
    tipo: "String",
    obrigatorio: "false",
    default: "70%",
  },
  {
    propriedade: "params",
    tipo: "",
    obrigatorio: "false",
    default: "",
  },
  {
    propriedade: "desabilita-campos",
    tipo: "Boolean",
    obrigatorio: "false",
    default: "false",
  },
  {
    propriedade: "formata-valor",
    tipo: "Boolean",
    obrigatorio: "false",
    default: "false",
  },
  {
    propriedade: "campo-valor-formatado",
    tipo: "String",
    obrigatorio: "false",
    default: "nome",
  },
  {
    propriedade: "ao-digitar",
    tipo: "Function",
    obrigatorio: "false",
    default: "",
  },
  {
    propriedade: "tipo",
    tipo: "String",
    obrigatorio: "false",
    default: "number",
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
