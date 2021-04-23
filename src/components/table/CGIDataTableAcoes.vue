<template>
  <div>
    <cgi-data-table
      :linhas="linhas"
      :colunas="colunas"
      nome-tabela="Botões de ação e detalhamento"
      altura="200"
      mostra-acoes
      mostraDetalhes
      @alterar-item="alterarItem"
      @deletar-item="deletarItem"
      @exporta-zoom="exportaZoom"
      @ver-detalhes="verDetalhes"
    ></cgi-data-table>
    <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>

    <v-divider class="my-5"></v-divider>
  </div>
</template>
<script>
import Prism from "prismjs";
export default {
  methods: {
    alterarItem(item) {
      // manipule o item
    },
    deletarItem(item) {
      // manipule o item
    },
    exportaZoom(item) {
      // manipule o item
    },
    verDetalhes(item) {
      // manipule o item
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
        nome: "Kirlan",
        descricao: "Desenvolvedor de Software",
      },
      {
        nome: "Angelo",
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
            nome-tabela="Botões de ação e detalhamento"
            altura="200"
            mostra-acoes
            mostraDetalhes
            @alterar-item="alterarItem"
            @deletar-item="deletarItem"
            @exporta-zoom="exportaZoom"
            @ver-detalhes="verDetalhes"
          ></cgi-data-table>
        <\/template>

        <script>
            export default {
                methods: {
                  alterarItem(item) {
                    // manipule o item
                  },
                  deletarItem(item) {
                    // manipule o item
                  },
                  exportaZoom(item) {
                    // manipule o item
                  },
                  verDetalhes(item) {
                    // manipule o item
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
                            nome: "Kirlan",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            nome: "Angelo",
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
