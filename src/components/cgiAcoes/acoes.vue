<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Ações</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          nome-tabela="Tabela"
          nome-programa="acoes"
          altura="calc(100vh - 700px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
        >
          <template v-slot:botoes>
            <cgi-acoes
              atualizar
              incluir
              excel
              filtro
              pdf
              copiar
              deletar
              relatorio
              configuracoes
            >
            </cgi-acoes>
          </template>
        </cgi-data-table>
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
          <h3 class="font-weight-light-bold">Events</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 520px)"
          :linhas="linhasEvents"
          :colunas="colunasEvents"
        >
        </cgi-data-table>
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
              v-html="codeEventsExample"
            ></code>
      </pre>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="gray">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Binds</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 550px)"
          :linhas="linhasBinds"
          :colunas="colunasBinds"
        >
        </cgi-data-table>
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
              v-html="codeBindsExample"
            ></code>
      </pre>
      </v-card>
    </v-col>
  </v-row>

  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center"> </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";

const code = `
<template>
  <cgi-data-table
    nome-tabela="Tabela"
    nome-programa="acoes"
    altura="calc(100vh - 700px)"
    :linhas="linhasTabela"
    :colunas="colunasTabela"
  >
    <template v-slot:botoes>
      <cgi-acoes
        atualizar
        incluir
        excel
        filtro
        pdf
        copiar
        deletar
        relatorio
        configuracoes
      >
      </cgi-acoes>
    </template>
  </cgi-data-table>
</template>
`;

const codeEvents = `
        <template v-slot:botoes>
            <cgi-acoes
              @atualizar="paginando()"
              @excel="exportToExcel()"
              atualizar
              excel
            >
            </cgi-acoes>
        </template>
`;

const codeBinds = `
        <template v-slot:botoes>
            <cgi-acoes
              :desabilitar-filtro="carregando.value"
              :desabilitar-atualizar="carregando.value"
              :desabilitar-excel="carregando.value"
              atualizar
              filtro
              excel
            >
            </cgi-acoes>
        </template>
`;

const codeExample = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);
const codeEventsExample = ref(
  Prism.highlight(codeEvents, Prism.languages.javascript, "javascript")
);
const codeBindsExample = ref(
  Prism.highlight(codeBinds, Prism.languages.javascript, "javascript")
);

onMounted(() => {
  Prism.highlightElement(
    document.querySelector("code", "codeEvents", "codeBinds")
  );
});

const linhasTabela = [
  {
    id: 1,
    nome: "Gabriel",
    descricao: "Desenvolvedor de Software",
    cor: "yellow",
  },
  {
    id: 2,
    nome: "João",
    descricao: "Desenvolvedor de Software",
    cor: "red",
  },
  {
    id: 3,
    nome: "Jackson",
    descricao: "Desenvolvedor de Software",
    cor: "green",
  },
  {
    id: 4,
    nome: "Vinícius",
    descricao: "Desenvolvedor de Software",
  },
  {
    id: 5,
    nome: "Maurício",
    descricao: "Desenvolvedor de Software",
  },
  {
    id: 6,
    nome: "Pablo",
    descricao: "Desenvolvedor de Software",
  },
  {
    id: 7,
    nome: "Murilo",
    descricao: "Desenvolvedor de Software",
  },
];

const colunasTabela = [
  {
    text: "ID",
    align: "start",
    sortable: false,
    value: "id",
  },
  {
    text: "Nome",
    align: "start",
    sortable: true,
    value: "nome",
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
    propriedade: "incluir",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para incluir registro",
  },
  {
    propriedade: "desabilitarIncluir",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de incluir nas ações",
  },
  {
    propriedade: "carregarIncluir",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "alterar",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para alterar registro",
  },
  {
    propriedade: "desabilitarAlterar",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de alterar nas ações",
  },
  {
    propriedade: "carregarAlterar",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "deletar",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para excluir registro",
  },
  {
    propriedade: "desabilitarDeletar",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de deletar nas ações",
  },
  {
    propriedade: "carregarDeletar",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "copiar",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para copiar registro",
  },
  {
    propriedade: "desabilitarCopiar",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de copiar nas ações",
  },
  {
    propriedade: "carregarCopiar",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "filtro",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão de filtro nas ações",
  },
  {
    propriedade: "desabilitarFiltro",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de filtro nas ações",
  },
  {
    propriedade: "carregarFiltro",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "relatorio",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão de relatório nas ações",
  },
  {
    propriedade: "desabilitarRelatorio",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de relatório nas ações",
  },
  {
    propriedade: "carregarRelatorio",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "excel",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para exportar arquivo excel nas ações",
  },
  {
    propriedade: "desabilitarExcel",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão para exportar arquivo excel nas ações",
  },
  {
    propriedade: "carregarExcel",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "pdf",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para exportar arquivo PDF nas ações",
  },
  {
    propriedade: "desabilitarPdf",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão para exportar arquivo PDF nas ações",
  },
  {
    propriedade: "carregarPdf",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "configuracoes",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão de configurações nas ações",
  },
  {
    propriedade: "desabilitarConfiguracoes",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de configurações nas ações",
  },
  {
    propriedade: "carregarConfiguracoes",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
  {
    propriedade: "atualizar",
    default: "false",
    tipo: "Boolean",
    descricao: "Adiciona botão para atualizar registros",
  },
  {
    propriedade: "desabilitarAtualizar",
    default: "false",
    tipo: "Boolean",
    descricao: "Desabilita botão de atualizar nas ações",
  },
  {
    propriedade: "carregarAtualizar",
    default: "false",
    tipo: "Boolean",
    descricao: "",
  },
];

const colunasProps = [
  {
    text: "Propriedade",
    align: "start",
    sortable: false,
    value: "propriedade",
  },
  {
    text: "Valor default",
    align: "start",
    sortable: false,
    value: "default",
  },
  {
    text: "Tipo",
    align: "start",
    sortable: false,
    value: "tipo",
  },
  {
    text: "Descrição",
    align: "start",
    sortable: false,
    value: "descricao",
  },
];

const colunasEvents = [
  {
    text: "Eventos",
    align: "start",
    sortable: false,
    value: "events",
  },
  {
    text: "Descrição",
    align: "start",
    sortable: false,
    value: "descricao",
  },
];

const linhasEvents = [
  {
    events: "@atualizar",
    descricao: "Evento para atualizar",
  },
  {
    events: "@incluir",
    descricao: "Evento para incluir",
  },
  {
    events: "@alterar",
    descricao: "Evento para alterar",
  },
  {
    events: "@copiar",
    descricao: "Evento para copiar",
  },
  {
    events: "@deletar",
    descricao: "Evento para deletar",
  },
  {
    events: "@relatorio",
    descricao: "Evento para gerar relatório",
  },
  {
    events: "@excel",
    descricao: "Evento para exportar para excel",
  },
  {
    events: "@pdf",
    descricao: "Evento para exportar para pdf",
  },
  {
    events: "@configuracoes",
    descricao: "Evento para abrir configuracoes",
  },
  {
    events: "@filtro",
    descricao: "Evento para abrir filtro",
  },
  {
    events: "@atualizar",
    descricao: "Evento para atualizar",
  },
  {
    events: "@filtro",
    descricao: "Evento para abrir filtro",
  },
];

const colunasBinds = [
  {
    text: "Binds",
    align: "start",
    sortable: false,
    value: "binds",
  },
  {
    text: "Descrição",
    align: "start",
    sortable: false,
    value: "descricao",
  },
];

const linhasBinds = [
  {
    binds: ":desabilitar-atualizar",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-incluir",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-alterar",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-copiar",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-deletar",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-relatorio",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-excel",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-pdf",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-configuracoes",
    descricao: "Bind para desabilitar ação",
  },
  {
    binds: ":desabilitar-filtro",
    descricao: "Bind para desabilitar ação",
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
