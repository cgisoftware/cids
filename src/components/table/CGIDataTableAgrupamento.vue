<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">

    <v-card-text>
      <cgi-data-table
        nome-tabela="Tabela com agrupamento"
        nome-programa="teste1"
        altura="200"
        agrupar-por="descricao"
        totalizar
        :linhas="linhas"
        :colunas="colunas"
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
export default {
  data: () => ({
    linhas: [
      {
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
      {
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
      {
        nome: "Jackson",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
      {
        nome: "João",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
      {
        nome: "Mauricio",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
      {
        nome: "Marcelo",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
    ],
    colunas: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "nome",
        totalizar: true,
      },
      {
        text: "Descrição",
        align: "start",
        sortable: false,
        value: "descricao",
      },
      {
        text: "Valor",
        align: "start",
        sortable: false,
        value: "valor",
        somar: true,
      },
    ],
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
            nome-tabela="Tabela com agrupamento"
            nome-programa="teste1"
            altura="200"
            agrupar-por="descricao"
            totalizar
            :linhas="linhas"
            :colunas="colunas"
          ></cgi-data-table>
        <\/template>

        <script>
          export default {
            data: () => ({
              linhas: [
                {
                  nome: "Vinicius",
                  descricao: "Desenvolvedor de Software",
                  valor: 10,
                },
                {
                  nome: "Sergio",
                  descricao: "Desenvolvedor de Software",
                  valor: 10,
                },
                {
                  nome: "Jackson",
                  descricao: "Desenvolvedor de Software",
                  valor: 10,
                },
                {
                  nome: "João",
                  descricao: "Desenvolvedor de Software",
                  valor: 10,
                },
                {
                  nome: "Mauricio",
                  descricao: "Desenvolvedor de Software",
                  valor: 10,
                },
                {
                  nome: "Marcelo",
                  descricao: "Desenvolvedor de Software",
                  valor: 10,
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
                {
                  text: "Valor",
                  align: "start",
                  sortable: false,
                  value: "valor",
                  somar: true,
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