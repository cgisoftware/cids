<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Tabelas</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          nome-tabela="Tabela básica"
          nome-programa="básica"
          altura="calc(100vh - 700px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
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
          altura="calc(100vh - 300px)"
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
          altura="calc(100vh - 600px)"
          :linhas="linhasEvents"
          :colunas="colunasEvents"
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
          <h3 class="font-weight-light-bold">Slots</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 750px)"
          :linhas="linhasSlots"
          :colunas="colunasSlots"
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
          <h3 class="font-weight-light-bold">Tipos de tabela</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          altura="calc(100vh - 800px)"
          :linhas="linhasTipos"
          :colunas="colunasTipos"
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
          <h3 class="font-weight-light-bold">Exemplo</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          nome-tabela="Tabela com ações"
          nome-programa="ações"
          id="exemplo"
          item-value="nome"
          altura="calc(100vh - 600px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
          @alterar="alterar()"
          @copiar="copiar()"
          @deletar="deletar()"
          @ver-detalhes="detalhes($event)"
          mostra-acoes
          mostra-detalhes
          mostra-pesquisa
          show-select
          deletar
          alterar
          copiar
        >
          <template v-slot:botoes>
            <cgi-acoes
              @atualizar="paginando()"
              @excel="exportToExcel()"
              atualizar
              filtro
              excel
            >
              <template v-slot:formulario="{ cancelar }">
                <filtro :controller="controller" :cancelar="cancelar" />
              </template>
            </cgi-acoes>
          </template>
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
              v-html="codeTableExample"
              ></code>
            </pre>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";

const code = `
<template> 
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          nome-tabela="Tabela básica"
          nome-programa="básica"
          altura="calc(100vh - 700px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
        >
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>  
</template>

< script setup>

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

< /script>
`;

const codeTabelaExemplo = `
<template>
    <v-row class="mb-15">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="rounded-b-lg pa-5">
        <cgi-data-table
          nome-tabela="Tabela com ações"
          nome-programa="ações"
          id="exemplo"
          item-value="nome"
          altura="calc(100vh - 600px)"
          :linhas="linhasTabela"
          :colunas="colunasTabela"
          @alterar="alterar()"
          @copiar="copiar()"
          @deletar="deletar()"
          @ver-detalhes="detalhes($event)"
          mostra-acoes
          mostra-detalhes
          mostra-pesquisa
          show-select
        >
          <template v-slot:botoes>
            <cgi-acoes
              @atualizar="paginando()"
              @excel="exportToExcel()"
              atualizar
              filtro
              excel
            >
              <template v-slot:formulario="{ cancelar }">
                <filtro :controller="controller" :cancelar="cancelar" />
              </template>
            </cgi-acoes>
          </template>
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>
</template
`;

const codeExample = ref(
  Prism.highlight(code, Prism.languages.javascript, "javascript")
);
const codeTableExample = ref(
  Prism.highlight(codeTabelaExemplo, Prism.languages.javascript, "javascript")
);

const colunasProps = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
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
const linhasProps = [
  {
    parametros: "copiar",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "alterar",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "deletar",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "zoom-dialog",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "mostra-acoes",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "mostra-detalhes",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "mostra-toolbar",
    tipo: "Boolean",
    default: "true",
  },
  {
    parametros: "mostra-pesquisa",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "nome-tabela",
    tipo: "String",
    default: "null",
  },
  {
    parametros: "nome-programa",
    tipo: "String",
    default: "null",
  },
  {
    parametros: "informacoes-da-pesquisa",
    tipo: "String",
    default: "null",
  },
  {
    parametros: "altura",
    tipo: "String",
    default: "100vh",
  },
  {
    parametros: "colunas-fixas",
    tipo: "Boolean",
    default: "true",
  },
  {
    parametros: "mostra-paginacao",
    tipo: "Boolean",
    default: "true",
  },
  {
    parametros: "itens-por-pagina",
    tipo: "Number",
    default: "30",
  },
  {
    parametros: "total-itens",
    tipo: "Number",
    default: "100",
  },
  {
    parametros: "carregar",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "multiple-sort",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "show-actions",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "colunas",
    tipo: "Array",
    default: "[]",
  },
  {
    parametros: "linhas",
    tipo: "Array",
    default: "[]",
  },
  {
    parametros: "show-select",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "show-qr",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "show-details",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "show-delete",
    tipo: "Boolean",
    default: "true",
  },
  {
    parametros: "show-update",
    tipo: "Boolean",
    default: "true",
  },
  {
    parametros: "show-clipboard",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "show-printer",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "propriedades",
    tipo: "Array",
    default: "[]",
  },
  {
    parametros: "paginacao",
    tipo: "Object",
    default: "{}",
  },
  {
    parametros: "habilita-agrupamento",
    tipo: "Object",
    default: "false",
  },
  {
    parametros: "mostra-propriedades",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "mostra-linha-selecionada",
    tipo: "Boolean",
    default: "false",
  },
  {
    parametros: "chave-tabela",
    tipo: "String",
    default: "seq",
  },
];

const colunasEvents = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
  },
  {
    text: "Retorno",
    align: "start",
    sortable: false,
    value: "retorno",
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
    parametros: "@salvar-propriedades",
    retorno: "Array",
    descricao:
      "Retorna as colunas/agrupamento e paginação atual para salvar em tela padrão",
  },
  {
    parametros: "@ver-detalhes",
    retorno: "Object",
    descricao: "Retorna a linha selecionada para uma ação customizada",
  },
  {
    parametros: "@copiar-item",
    retorno: "Object",
    descricao: "Retorna a linha selecionada para copiar",
  },
  {
    parametros: "@alterar-item",
    retorno: "Object",
    descricao: "Retorna a linha selecionada para alterar",
  },
  {
    parametros: "@deletar-item",
    retorno: "Object",
    descricao: "Excluir registro",
  },
  {
    parametros: "@exporta-zoom",
    retorno: "",
    descricao: "Exportar registro",
  },
  {
    parametros: "@cancelar-zoom",
    retorno: "",
    descricao: "Cancelar zoom",
  },
  {
    parametros: "@linha-selecionada",
    retorno: "Object",
    descricao: "Retorna um objeto com a linha atual selecionanda",
  },
];

const colunasSlots = [
  {
    text: "Slot",
    align: "start",
    sortable: false,
    value: "slot",
  },
  {
    text: "Descrição",
    align: "start",
    sortable: false,
    value: "descricao",
  },
];

const linhasSlots = [
  {
    slot: "v-slot:<name>",
    descricao: "Slot para customizar uma coluna especifica",
  },
  {
    slot: "v-slot:botoes",
    descricao:
      "Slot para incluir botões no header da tabela, como botões de filtro, incluir e atualizar, por exemplo",
  },
  {
    slot: "v-slot:pesquisa",
    descricao:
      "Slot para customizar o text-field default de pesquisa da tabela",
  },
  {
    slot: "v-slot:outras-acoes",
    descricao: "Slot para incluir outros botões referentes ao registro",
  },
];

const colunasTipos = [
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

const linhasTipos = [
  {
    tipo: "cgi-data-table",
    descricao: "Todo o conjunto de dados está disponível localmente.",
  },
  {
    tipo: "cgi-data-table-server",
    descricao: "Usadas para mostrar dados provenientes de uma API.",
  },
  {
    tipo: "cgi-data-table-virtual",
    descricao:
      "Usa virtualização para renderizar apenas uma pequena parte das linhas.",
  },
];

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
</script>

<style scoped>
pre {
  background-color: #1e1e1e;
  border-radius: 5px;
  padding: 10px;
}
</style>
