<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="70%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Ações</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="70%" class="rounded-b-lg pa-5">
        <cgi-data-table
          nome-tabela="Tabela"
          nome-programa="acoes"
          altura="calc(100vh - 700px)"
          :linhas="linhas"
          :colunas="colunas"
        >
          <template v-slot:botoes>
            <cgi-acoes atualizar> </cgi-acoes>
          </template>
        </cgi-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const linhas = [
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
    nome: "Mauricio",
    descricao: "Desenvolvedor de Software",
  },
  {
    id: 6,
    nome: "Pablo",
    descricao: "Desenvolvedor de Software",
  },
  {
    id: 6,
    nome: "Murilo",
    descricao: "Desenvolvedor de Software",
  },
];

const colunas = [
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

const incluir = (item) => {
  console.log(item);
};
const deletarItem = (item) => {
  console.log(item);
};
const verDetalhes = (item) => {
  console.log(item);
};
const copiarItem = (item) => {
  console.log(item);
};
const exportaZoom = (item) => {
  console.log(item);
};
</script>
