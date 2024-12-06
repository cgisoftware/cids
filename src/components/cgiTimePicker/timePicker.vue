<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="80%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Time picker</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="d-flex justify-center align-center py-10">
    <v-col cols="3" class="d-flex justify-center align-center">
      <cgi-time-picker nome="Time"></cgi-time-picker>
    </v-col>
  </v-row>
</template>

<script setup>
const colunasTabela = [
  {
    text: "Parâmetros",
    align: "start",
    sortable: false,
    value: "parametros",
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
    text: "Opções",
    value: "opcoes",
    align: "start",
    sortable: false,
  },
];

const linhasTabela = [
  {
    parametros: "message",
    obrigatorio: "false",
    tipo: "String",
    default: '" "',
    opcoes: "",
  },
  {
    parametros: "timeout",
    obrigatorio: "false",
    tipo: "Number",
    default: "10000",
    opcoes: "",
  },
  {
    parametros: "color",
    obrigatorio: "false",
    tipo: "String",
    default: '"red"',
    opcoes: "",
  },
  {
    parametros: "position",
    obrigatorio: "false",
    tipo: "Object",
    default: "top",
    opcoes: "right: true; center: true; top: false",
  },
];
</script>
