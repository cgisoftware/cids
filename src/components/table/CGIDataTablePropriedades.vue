<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-card-text>
      <cgi-data-table
        nome-tabela="Tabela com propriedades para customizar a tabela"
        altura="200"
        agrupar-por="nome"
        mostra-propriedades
        totalizar-grupo
        :linhas="linhas"
        :colunas="colunas"
        :propriedades="colunasvisiveis"
        @salvar-propriedades="salvarPropriedades"
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
  methods: {
    salvarPropriedades(propriedadesDaTabela) {
      // salve na tabela padrão ou em algum local especifico
    },
  },
  data: () => ({
    linhas: [
      {
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
        contador: 1,
      },
      {
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
        contador: 1,
      },
      {
        nome: "Jackson",
        descricao: "Desenvolvedor de Software",
        contador: 1,
      },
      {
        nome: "João",
        descricao: "Desenvolvedor de Software",
        contador: 1,
      },
      {
        nome: "Mauricio",
        descricao: "Desenvolvedor de Software",
        contador: 1,
      },
      {
        nome: "Marcelo",
        descricao: "Desenvolvedor de Software",
        contador: 1,
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
        text: "Contador",
        align: "start",
        sortable: false,
        value: "contador",
        totalizar: true,
      },
    ],
    colunasvisiveis: [
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
        hidden: true,
        value: "descricao",
      },
      {
        text: "Contador",
        align: "start",
        sortable: false,
        value: "contador",
      },
    ],
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
            nome-tabela="Tabela com propriedades para customizar a tabela"
            altura="200"
            agrupar-por="nome"
            mostra-propriedades
            totalizar-grupo
            :linhas="linhas"
            :colunas="colunas"
            :propriedades="colunasvisiveis"
            @salvar-propriedades="salvarPropriedades"
          ></cgi-data-table>
        <\/template>

        <script>
          export default {
            methods: {
              salvarPropriedades(propriedadesDaTabela) {
                // salve na tabela padrão ou em algum local especifico
              }
            },
            data: () => ({
              linhas: [
                {
                  nome: "Vinicius",
                  descricao: "Desenvolvedor de Software",
                  contador: 1,
                },
                {
                  nome: "Sergio",
                  descricao: "Desenvolvedor de Software",
                  contador: 1,
                },
                {
                  nome: "Jackson",
                  descricao: "Desenvolvedor de Software",
                  contador: 1,
                },
                {
                  nome: "João",
                  descricao: "Desenvolvedor de Software",
                  contador: 1,
                },
                {
                  nome: "Mauricio",
                  descricao: "Desenvolvedor de Software",
                  contador: 1,
                },
                {
                  nome: "Marcelo",
                  descricao: "Desenvolvedor de Software",
                  contador: 1,
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
                  text: "Contador",
                  align: "start",
                  sortable: false,
                  value: "contador",
                },
              ],
              colunasvisiveis: [
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
                  hidden: true,
                  value: "descricao",
                },
                {
                  text: "Contador",
                  align: "start",
                  sortable: false,
                  value: "contador",
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