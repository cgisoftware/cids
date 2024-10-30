<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Divisor</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-15">
    <cgi-divider width="50%">
      “Primamos SEMPRE pela confiabilidade e relacionamento de longa duração,
      pela segurança das informações, qualidade nos serviços prestados,
      criatividade e tecnologia, garantindo com isso, pleno sucesso nos projetos
      de implementação, com ganhos reais aos nossos clientes.” CGI Software –
      MELHORES RESULTADOS.
    </cgi-divider>
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
          altura="calc(100vh - 900px)"
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

const codeExample = `
  <v-row class="d-flex justify-center align-center py-15">
    <cgi-divider width="50%">
        “Primamos SEMPRE pela confiabilidade e relacionamento de longa duração,
        pela segurança das informações, qualidade nos serviços prestados,
        criatividade e tecnologia, garantindo com isso, pleno sucesso nos projetos
        de implementação, com ganhos reais aos nossos clientes.” CGI Software –
        MELHORES RESULTADOS.
    </cgi-divider>
  </v-row>
`;

const code = ref(
  Prism.highlight(codeExample, Prism.languages.javascript, "javascript")
);

const colunasTabela = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
  },
  {
    text: "Descrição",
    align: "start",
    sortable: true,
    value: "descricao",
  },
];

const linhasTabela = [
  {
    parametros: "titulo",
    descricao: "Adiciona um título no divisor",
  },
];
</script>
