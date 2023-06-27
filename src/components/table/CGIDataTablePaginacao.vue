<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'">
        Tabela Com Paginação Servidor
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        nome-tabela="Paginação Servidor"
        altura="200"
        paginacao-servidor
        @paginando="paginando"
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
  methods: {
    paginando(paginacao) {
      const {
        page,
        itemsPerPage,
        sortBy,
        sortDesc,
        groupBy,
        groupDesc,
        search,
      } = paginacao;
      // manipule os dados e faça a request no servidor
    },
  },
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
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
            :linhas="linhas"
            :colunas="colunas"
            nome-tabela="Paginação Servidor"
            altura="200"
            paginacao-servidor
            @paginando="paginando"
            mostra-pesquisa
          ></cgi-data-table>
        <\/template>

        <script>
            export default {
                methods: {
                  paginando(paginacao) {
                    const {
                      page,
                      itemsPerPage,
                      sortBy,
                      sortDesc,
                      groupBy,
                      groupDesc,
                      search,
                    } = paginacao;
                    // manipule os dados e faça a request no servidor
                  },
                },
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
