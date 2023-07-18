<template>
  <v-toolbar color="primary" dark extended flat> </v-toolbar>

  <v-card class="mx-auto mb-5" width="90%" style="margin-top: -64px">
    <v-card-title primary-title class="font-weight-bold">
      Informações do Componente
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        :mostra-paginacao="false"
        :compacto="false"
        :pesquisa="pesquisa"
        nome-tabela="Parâmetros"
        altura="45vh"
        mostra-pesquisa
      ></cgi-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    pesquisa: null,
    colunas: [
      {
        text: "Parâmetros",
        value: "parametros",
        align: "start",
        sortable: false,
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
        text: "Descrição",
        value: "descricao",
        align: "start",
        sortable: false,
      },
    ],
    linhas: [
      {
        parametros: "itens",
        obrigatorio: "true",
        tipo: "Array",
        default: "undefined",
        descricao: "Define os itens que serão listados na arvore",
      },
      {
        parametros: "chave-tree",
        obrigatorio: "true",
        tipo: "String",
        default: "undefined",
        descricao: "Define a chave de cada registro da lista",
      },
      {
        parametros: "chave-pai-tree",
        obrigatorio: "true",
        tipo: "String",
        default: "undefined",
        descricao: "Define a chave pai para organizar os níveis da arvore",
      },
      {
        parametros: "texto-item",
        obrigatorio: "true",
        tipo: "String",
        default: "undefined",
        descricao:
          "Define o texto que será apresentado em cada linha da arvore",
      },
      {
        parametros: "dialog-zoom",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao:
          "Define se o tree-view está aberta em um zoom ou tela normal",
      },
      {
        parametros: "ativo",
        obrigatorio: "true",
        tipo: "String",
        default: "undefined",
        descricao: "",
      },
      {
        parametros: "selecionavel",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao:
          "Define se o tree-view será um componente com checkbox para seleção",
      },
    ],
  }),
};
</script>

<style>
</style>