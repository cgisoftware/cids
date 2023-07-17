<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-divider></v-divider>

    <v-card-text>
      <cgi-data-table
        altura="30vh"
        nome-tabela="Slots"
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
    pesquisa: null,
    colunas: [
      {
        text: "Slot",
        value: "slot",
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
    ],
  }),
};
</script>

<style>
</style>