<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Botões soltos</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-btn @click="incluir" class="px-3" incluir> </cgi-btn>
      <cgi-btn @click="alterar" class="px-3" alterar> </cgi-btn>
      <cgi-btn @click="deletar" class="px-3" deletar> </cgi-btn>
      <cgi-btn @click="copiar" class="px-3" copiar> </cgi-btn>
      <cgi-btn @click="filtrar" class="px-3" filtrar> </cgi-btn>
      <cgi-btn @click="configuracoes" class="px-3" configuracoes> </cgi-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
              <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="botoesSoltosExample"
              ></code>
            </pre>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Botões dialog</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-btn @click="salvar" class="px-3" salvar> </cgi-btn>
      <cgi-btn @click="cancelar" class="px-3" cancelar> </cgi-btn>
      <cgi-btn @click="limpar" class="px-3" limpar> </cgi-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
              <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="botoesDialogExample"
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
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-btn class="px-3" alterar desabilitado> </cgi-btn>
      <cgi-btn class="px-3" alterar carregando> </cgi-btn>
    </v-col>
  </v-row>
  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 800px)"
          :linhas="linhasProps"
          :colunas="colunasProps"
          mostra-pesquisa
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="mb-10">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%">
        <pre style="padding: 40px">
              <code
              class="language-javascript"
              style="font-size: 14px;"
              v-html="propsExample"
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

const botoesSoltos = `
<template>
  <v-row class="d-flex justify-center align-center mt-10">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-btn @click="incluir" class="px-3" incluir> </cgi-btn>
      <cgi-btn @click="alterar" class="px-3" alterar> </cgi-btn>
      <cgi-btn @click="deletar" class="px-3" deletar> </cgi-btn>
      <cgi-btn @click="copiar" class="px-3" copiar> </cgi-btn>
      <cgi-btn @click="filtrar" class="px-3" filtrar> </cgi-btn>
    </v-col>
  </v-row>
  <v-row class="d-flex justify-center align-center">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-btn @click="configuracoes" class="px-3" configuracoes> </cgi-btn>
      <cgi-btn @click="copiar" class="px-3" copiar> </cgi-btn>
    </v-col>
  </v-row>
</template>

< script setup> 
  const incluir = () => {
    console.log("incluir");
  };
  const alterar = () => {
    console.log("alterar");
  };
  const deletar = () => {
    console.log("deletar");
  };
  const copiar = () => {
    console.log("copiar");
  };
  const filtrar = () => {
    console.log("filtrar");
  };
  const salvar = () => {
    console.log("salvar");
  };
  const cancelar = () => {
    console.log("cancelar");
  };
  const limpar = () => {
    console.log("limpar");
  };
  const configuracoes = () => {
  console.log("configuracoes");
};

< script>
`;

const botoesDialog = `
<template>
  <v-col cols="6" class="d-flex justify-center align-center">
    <cgi-btn @click="salvar" class="px-3" salvar> </cgi-btn>
    <cgi-btn @click="cancelar" class="px-3" cancelar> </cgi-btn>
    <cgi-btn @click="limpar" class="px-3" limpar> </cgi-btn>
  </v-col>
</template>

< script setup> 
  const salvar = () => {
    console.log("salvar");
  };
  const cancelar = () => {
    console.log("cancelar");
  };
  const limpar = () => {
    console.log("limpar");
  };
< /script>
`;

const props = `
<template>
  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="6" class="d-flex justify-center align-center">
      <cgi-btn class="px-3" alterar desabilitado> </cgi-btn>
      <cgi-btn class="px-3" alterar carregando> </cgi-btn>
    </v-col>
  </v-row>
</template>
`;

const botoesSoltosExample = ref(
  Prism.highlight(botoesSoltos, Prism.languages.javascript, "javascript")
);
const botoesDialogExample = ref(
  Prism.highlight(botoesDialog, Prism.languages.javascript, "javascript")
);
const propsExample = ref(
  Prism.highlight(props, Prism.languages.javascript, "javascript")
);

const incluir = () => {
  console.log("incluir");
};
const alterar = () => {
  console.log("alterar");
};
const deletar = () => {
  console.log("deletar");
};
const copiar = () => {
  console.log("copiar");
};
const filtrar = () => {
  console.log("filtrar");
};
const salvar = () => {
  console.log("salvar");
};
const cancelar = () => {
  console.log("cancelar");
};
const limpar = () => {
  console.log("limpar");
};
const configuracoes = () => {
  console.log("configuracoes");
};

const colunasProps = [
  {
    text: "Propriedade",
    align: "start",
    sortable: false,
    value: "propriedade",
  },
  {
    text: "Descrição",
    align: "start",
    sortable: false,
    value: "descricao",
  },
];

const linhasProps = [
  {
    propriedade: "carregando",
    default: "false",
    tipo: "Boolean",
    descricao: "Habilita animação de carregamento",
  },
  {
    propriedade: "desabilitado",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão",
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
