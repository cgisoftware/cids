<template>
  <v-toolbar color="primary" dark extended flat> </v-toolbar>

  <v-card class="mx-auto mb-5" width="90%" style="margin-top: -64px">
    <v-card-title primary-title class="font-weight-bold">
      Informações do Componente
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-data-table
        nome-tabela="Props"
        altura="185vh"
        mostra-pesquisa
        :mostra-paginacao="false"
        :compacto="false"
        :linhas="linhas"
        :colunas="colunas"
        :pesquisa="pesquisa"
      ></cgi-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    paginacao: null,
    colunas: [
      {
        text: "Propriedade",
        value: "propriedade",
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
        propriedade: "nome-tabela",
        obrigatorio: "false",
        tipo: "String",
        default: "null",
        descricao: "Define um nome no cabeçalho da tabela",
      },
      {
        propriedade: "linhas",
        obrigatorio: "true",
        tipo: "Array",
        default: "undefined",
        descricao: "Define as linhas no corpo da tabela",
      },
      {
        propriedade: "colunas",
        obrigatorio: "true",
        tipo: "Array",
        default: "undefined",
        descricao: "Define as colunas da tabela",
      },
      {
        propriedade: "compacto",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "true",
        descricao:
          "Linhas da tabela ficam com a propriedade 'dense', deixando mais compacto",
      },
      {
        propriedade: "cor-checkbox",
        obrigatorio: "false",
        tipo: "String",
        default: "null",
        descricao:
          "Define a cor do checkbox no componente de seleção da tabela",
      },
      {
        propriedade: "habilita-agrupamento",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "true",
        descricao: "Habilita o agrupamento da tabela",
      },
      {
        propriedade: "mostra-linha-selecionada",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Mostra com uma cor diferente a linha selecionada",
      },
      {
        propriedade: "mostra-propriedades",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao:
          "Mostra as propriedade de ordenação/ocultação/agrupamento das colunas",
      },
      {
        propriedade: "paginacao-servidor",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao:
          "Desabilita a paginação no front-end e habilita a paginação no servidor",
      },
      {
        propriedade: "mostra-paginacao",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "true",
        descricao: "Remove ou mostra a paginação no rodapé",
      },
      {
        propriedade: "mostra-pesquisa",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Remove ou mostra o cmapo de pesquisa na no cabeçalho",
      },
      {
        propriedade: "colunas-fixas",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "true",
        descricao: "Fixa as colunas para não ter scroll",
      },
      {
        propriedade: "mostra-agrupador",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Mostra o agrupador",
      },
      {
        propriedade: "ordenar-varios",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "true",
        descricao: "Define de pode ordenar por varias colunas",
      },
      {
        propriedade: "pesquisa",
        obrigatorio: "false",
        tipo: "String",
        default: "null",
        descricao: "Valor do campo pesquisa",
      },
      {
        propriedade: "chave-tabela",
        obrigatorio: "false",
        tipo: "String",
        default: "seq",
        descricao: "Define uma chave para a tabela",
      },
      {
        propriedade: "selecionar-varios",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Define se pode selecionar varios itens",
      },
      {
        propriedade: "mostra-acoes",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Mostra ou esconde ações de alterar/excluir",
      },
      {
        propriedade: "altura",
        obrigatorio: "false",
        tipo: "String",
        default: "100vh",
        descricao: "Define uma nova altura para a tabela",
      },
      {
        propriedade: "carregar",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Cria um efeito de loading na tabela",
      },
      {
        propriedade: "total-itens",
        obrigatorio: "false",
        tipo: "Number",
        default: "30",
        descricao: "Seta o total de itens para paginação no servidor",
      },
      {
        propriedade: "paginacao",
        obrigatorio: "false",
        tipo: "Object",
        default: "vuetify_page_options",
        descricao: "Seta o objeto default de paginação no servidor",
      },
      {
        propriedade: "agrupar-por",
        obrigatorio: "false",
        tipo: "String",
        default: "null",
        descricao: "Seta por qual coluna deve agrupar",
      },
      {
        propriedade: "propriedades",
        obrigatorio: "false",
        tipo: "Array",
        default: "[ ]",
        descricao: "Seta as colunas visiveis na tabela",
      },
      {
        propriedade: "mostra-detalhes",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao:
          "Mostra um icone de olho em cada linha para um evento customizado de detalhamento",
      },
      {
        propriedade: "mostra-toolbar",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Esconde ou mostra o cabeçalho da tabela",
      },
      {
        propriedade: "zoom-dialog",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Define se a tabela está aberta em um zoom ou tela normal",
      },
      {
        propriedade: "nome-programa",
        obrigatorio: "false",
        tipo: "String",
        default: '" "',
        descricao:
          "Mostra um tooltip com o nome equivalente do programa progress",
      },
      {
        propriedade: "totalizar",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao:
          "Mostra os totalizadores nas colunas definidas na configuração das headers",
      },
      {
        propriedade: "copiar",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "true",
        descricao: "Mostra o botão de copiar registro na tabela",
      },
      {
        propriedade: "alterar",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Mostra o botão de alterar registro na tabela",
      },
      {
        propriedade: "deletar",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
        descricao: "Mostra o botão de deletar registro na tabela",
      },
      {
        propriedade: "informacoes-da-pesquisa",
        obrigatorio: "false",
        tipo: "String",
        default: "null",
        descricao:
          "Mostra na pesquisa um tooltip com as informações de quais campos é possível pesquisar",
      },
    ],
  }),
};
</script>

<style>
</style>