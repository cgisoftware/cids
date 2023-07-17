<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">

    <v-card-text>
      <cgi-data-table
        nome-tabela="Tabela sem paginação"
        altura="200"
        mostra-linha-selecionada
        :mostra-paginacao="false"
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
            nome-tabela="Tabela sem paginação"
            altura="200"
            mostra-linha-selecionada
            :mostra-paginacao="false"
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