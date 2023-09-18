<template>
    <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
      <v-divider></v-divider>

      <v-card-text>
        <cgi-data-table
          :linhas="linhas"
          :colunas="colunas"
          :mostra-paginacao="false"
          :compacto="false"
          :pesquisa="pesquisa"
          altura="10vh"
          nome-tabela="Events"
          mostra-pesquisa
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
        evento: "@exporta-zoom",
        retorno: "Object",
        descricao:
          "Retorna o item para usar em uma tela de zoom",
      },
    ],
  }),
};
</script>

<style>
</style>