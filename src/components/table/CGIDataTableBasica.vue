<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-card-title primary-title class="font-weight-bold">
      Exemplos
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        nome-tabela="Tabela básica"
        altura="200"
        mostra-linha-selecionada
      ></cgi-data-table>
      <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>
    </v-card-text>
  </v-card>
</template>
<script>
import Prism from "prismjs";
export default {
  data: () => ({
    linhas: [
      {
        seq: 1,
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
      },
      {
        seq: 2,
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
      },
      {
        seq: 3,
        nome: "Jackson",
        descricao: "Desenvolvedor de Software",
      },
      {
        seq: 4,
        nome: "João",
        descricao: "Desenvolvedor de Software",
      },
      {
        seq: 5,
        nome: "Mauricio",
        descricao: "Desenvolvedor de Software",
      },
      {
        seq: 6,
        nome: "Marcelo",
        descricao: "Desenvolvedor de Software",
      },
    ],
    colunas: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "nome",
      },
      {
        text: "Descrição",
        align: "start",
        sortable: false,
        value: "descricao",
      },
    ],
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
              :linhas="linhas"
              :colunas="colunas"
              nome-tabela="Tabela básica"
              altura="200"
          ></cgi-data-table>
        <\/template>

        <script>
            export default {
                data: () => ({
                    linhas: [
                        {
                            nome: "Vinicius",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            nome: "Sergio",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            nome: "Jackson",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            nome: "João",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            nome: "Mauricio",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            nome: "Marcelo",
                            descricao: "Desenvolvedor de Software",
                        },
                    ],
                    colunas: [
                        {
                            text: "Nome",
                            align: "start",
                            sortable: false,
                            value: "nome",
                        },
                        {
                            text: "Descrição",
                            align: "start",
                            sortable: false,
                            value: "descricao",
                        },
                    ],
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>
