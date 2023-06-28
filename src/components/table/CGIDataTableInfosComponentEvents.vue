<template>
    <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
      <v-divider></v-divider>

      <v-card-text>
        <cgi-data-table
          nome-tabela="Events"
          altura="50vh"
          mostra-pesquisa
          :mostra-paginacao="false"
          :compacto="false"
          :linhas="linhas"
          :colunas="colunas"
          :pesquisa="pesquisa"
        ></cgi-data-table>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    pesquisa: null,
    colunas: [
      {
        text: "Evento",
        value: "evento",
        align: "start",
        sortable: false,
      },
      {
        text: "Retorno",
        value: "retorno",
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
        evento: "@salvar-propriedades",
        retorno: "Array",
        descricao:
          "Retorna as colunas/agrupamento e paginação atual para salvar em tela padrão",
      },
      {
        evento: "@linha-selecionada",
        retorno: "Object",
        descricao: "Retorna um objeto com a linha atual selecionanda",
      },
      {
        evento: "@paginando",
        retorno: "Object",
        descricao:
          "Retorna um objeto de paginação para usar com server side pagination",
      },
      {
        evento: "@incluir-item",
        retorno: "Object",
        descricao: "Retorna o evento de atalho para incluir um novo registro",
      },
      {
        evento: "@alterar-item",
        retorno: "Object",
        descricao: "Retorna a linha selecionada para alterar",
      },
      {
        evento: "@deletar-item",
        retorno: "Object",
        descricao: "Retorna a linha selecionada para deletar",
      },
      {
        evento: "@copiar-item",
        retorno: "Object",
        descricao: "Retorna a linha selecionada para copiar",
      },
      {
        evento: "@exportar-item",
        retorno: "Object",
        descricao: "Retorna o evento de atalho para exportar um registro",
      },
      {
        evento: "@ver-detalhes",
        retorno: "Object",
        descricao: "Retorna a linha selecionada para uma ação customizada",
      },
    ],
  }),
};
</script>

<style>
</style>