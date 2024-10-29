<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Alertas</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-15">
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-btn
        @click="mostraAlerta"
        variant="elevated"
        class="mr-5 rounded-xl"
        color="red"
        size="large"
        >Alerta geral
      </v-btn>
      <v-btn
        @click="mostraConfirmacao"
        variant="elevated"
        class="ml-5 rounded-xl"
        color="green"
        size="large"
        >Confirmação</v-btn
      >
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
              v-html="codeConfiguracaoExample"
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
import { useAlert } from "cids-cgi/lib/util";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import { ref } from "vue";

const code = `
<template>
  <v-row class="d-flex justify-center align-center py-15">
    <v-col cols="6">
      <v-btn
        @click="mostraAlerta"
        variant="elevated"
        class="mr-5 rounded-xl"
        color="red"
        size="large"
      >Alerta</v-btn>
      <v-btn
        @click="mostraConfirmacao"
        variant="elevated"
        class="ml-5 rounded-xl"
        color="green"
        size="large"
      >Confirmação</v-btn>
    </v-col>
  </v-row>
</template>

< script>
import { useAlert } from "cids-cgi/lib/util";

const alert = useAlert();

const mostraAlerta = async () => {
  alert.show({ message: "Alerta geral!" });
};

const mostraConfirmacao = async () => {
  try {
    const confirma = await alert.confirm({
      message: "Deseja realmente confirmar algo?",
      color: "green",
    });

    if (confirma) {
      // faz algo
    }
  } catch (error) {
    console.log(error);
  }
};

< /script>
`;

const codeConfiguracao = `
SOMENTE NO ARQUIVO app.vue DO PROJETO, ADICIONAR O <cgi-alert>

<template>
  <v-app>
    <v-main>
      <cgi-alert />
    </v-main>
  </v-app>
</template>
`;

const codeExample = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);
const codeConfiguracaoExample = ref(
  Prism.highlight(codeConfiguracao, Prism.languages.javascript, "javascript")
);

const alert = useAlert();
const mostraAlerta = async () => {
  alert.show({ message: "Alerta geral!" });
};

const mostraConfirmacao = async () => {
  try {
    const confirma = await alert.confirm({
      message: "Deseja realmente confirmar algo?",
      color: "green",
    });

    if (confirma) {
      // faz algo
    }
  } catch (error) {
    console.log(error);
  }
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
    align: "start",
    sortable: true,
    value: "obrigatorio",
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
    parametros: "message",
    obrigatorio: "false",
    tipo: "string",
    default: '" "',
  },
  {
    parametros: "color",
    obrigatorio: "false",
    tipo: "string",
    default: "red",
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
