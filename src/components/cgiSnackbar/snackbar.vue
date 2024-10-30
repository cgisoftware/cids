<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Snackbar</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-15">
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-btn
        @click="mostraSnackbarERRO"
        variant="elevated"
        class="mr-5 rounded-xl"
        color="red"
        size="large"
        >Erro
      </v-btn>
      <v-btn
        @click="mostraSnackbarConfirmacao"
        variant="elevated"
        class="ml-5 mr-5 rounded-xl"
        color="green"
        size="large"
        >Confirmação
      </v-btn>
      <v-btn
        @click="mostraSnackbarAviso"
        variant="elevated"
        class="ml-5 rounded-xl"
        color="primary"
        size="large"
        >Aviso
      </v-btn>
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
          <h3 class="font-weight-light-bold">Configuração</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
              <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="codeExampleConf"
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
          altura="calc(100vh - 700px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useSnackbar } from "cids-cgi/lib/util";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import { ref } from "vue";

const snackbar = useSnackbar();
const error = "Ocorreu um erro inesperado no sistema!";

const code = `
<template>
  <v-row class="d-flex justify-center align-center py-15">
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-btn
        @click="mostraSnackbarERRO"
        variant="elevated"
        class="mr-5 rounded-xl"
        color="red"
        size="large"
        >Erro
      </v-btn>
      <v-btn
        @click="mostraSnackbarConfirmacao"
        variant="elevated"
        class="ml-5 mr-5 rounded-xl"
        color="green"
        size="large"
        >Confirmação
      </v-btn>
      <v-btn
        @click="mostraSnackbarAviso"
        variant="elevated"
        class="ml-5 rounded-xl"
        color="primary"
        size="large"
        >Aviso
      </v-btn>
    </v-col>
  </v-row>
</template>

< script setup>
import { useSnackbar } from "cids-cgi/lib/util";

const snackbar = useSnackbar();
const error = "Ocorreu um erro inesperado no sistema!";

// função para mostrar a snackbar com a mensagem de erro
const mostraSnackbarERRO = async () => {
  return await snackbar.show({ message: error });
};

// função para mostrar a snackbar pedindo confirmação
const mostraSnackbarConfirmacao = async () => {
  return await snackbar.confirm({
    message: "Confirmar algo?",
    color: "green",
    timeout: 2000,
  });
};

// função para mostrar a snackbar com o aviso
const mostraSnackbarAviso = async () => {
  return await snackbar.show({
    message: "Configurações salvas com sucesso!",
    color: "primary",
    timeout: 2000,
  });
};

< /script
`;

const codeConfiguracao = `
SOMENTE NO ARQUIVO app.vue DO PROJETO, ADICIONAR O <cgi-snackbar>

<template>
  <v-app>
    <v-main>
      <cgi-snackbar />
    </v-main>
  </v-app>
</template>
`;

const codeExample = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);
const codeExampleConf = ref(
  Prism.highlight(codeConfiguracao, Prism.languages.javascript, "javascript")
);

const mostraSnackbarERRO = async () => {
  return await snackbar.show({ message: error });
};

const mostraSnackbarConfirmacao = async () => {
  return await snackbar.confirm({
    message: "Confirmar algo?",
    color: "green",
    timeout: 2000,
  });
};

const mostraSnackbarAviso = async () => {
  return await snackbar.show({
    message: "Configurações salvas com sucesso!",
    color: "primary",
    timeout: 2000,
  });
};

const colunasTabela = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
  },
  {
    text: "Obrigatório?",
    value: "obrigatorio",
    align: "start",
    sortable: false,
  },
  {
    text: "Tipo",
    value: "tipo",
    align: "start",
    sortable: false,
  },
  {
    text: "Valor default",
    value: "default",
    align: "start",
    sortable: false,
  },
  {
    text: "Opções",
    value: "opcoes",
    align: "start",
    sortable: false,
  },
];

const linhasTabela = [
  {
    parametros: "message",
    obrigatorio: "false",
    tipo: "String",
    default: '" "',
    opcoes: "",
  },
  {
    parametros: "timeout",
    obrigatorio: "false",
    tipo: "Number",
    default: "10000",
    opcoes: "",
  },
  {
    parametros: "color",
    obrigatorio: "false",
    tipo: "String",
    default: '"red"',
    opcoes: "",
  },
  {
    parametros: "position",
    obrigatorio: "false",
    tipo: "Object",
    default: "top",
    opcoes: "right: true; center: true; top: false",
  },
];
</script>
