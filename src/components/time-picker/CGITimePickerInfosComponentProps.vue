<template>
  <div>
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
          nome-tabela="Props"
          altura="25vh"
          mostra-pesquisa
        ></cgi-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    pesquisa: null,
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
    ],
    linhas: [
      {
        propriedade: "compacto",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
      },
      {
        propriedade: "nome",
        obrigatorio: "true",
        tipo: "String",
        default: "undefined",
      },
      {
        propriedade: "desabilitado",
        obrigatorio: "false",
        tipo: "Boolean",
        default: "false",
      },
      {
        propriedade: "regras",
        obrigatorio: "false",
        tipo: "Array",
        default: "[ ]",
      },
    ],
  }),
};
</script>

<style>
</style>