<template>
  <v-card>
    <v-card-text :class="{ 'pa-0': controller.dialogZoom }">
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        nome-tabela="Botões de ação/cores e detalhamento preparado para zoom"
        nome-programa="teste"
        altura="200"
        mostra-acoes
        mostra-detalhes
        @alterar-item="alterarItem"
        @deletar-item="deletarItem"
        @exporta-zoom="exportaZoom"
        @ver-detalhes="verDetalhes"
        :zoom-dialog="controller.dialogZoom"
        :pesquisa="controller.pesquisa"
        mostra-pesquisa
        ordenar-por="nome"
        ordenar-desc
        chave-tabela="id"
        informacoes-da-pesquisa="Pesquisar por x y z"
      ></cgi-data-table>
      <pre v-if="!controller.dialogZoom">
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>

      <v-divider v-if="!controller.dialogZoom" class="my-5"></v-divider>
    </v-card-text>
  </v-card>
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
      this.$emit("exporta-zoom", item);
    },
    verDetalhes(item) {
      // manipule o item
    },
  },
  data: () => ({
    controller: {
      dialogZoom: false,
      pesquisa: null,
    },
    linhas: [
      {
        id: 1,
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
        cor: 'yellow'
      },
      {
        id: 2,
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
        cor: 'red'
      },
      {
        id: 3,
        nome: "Kirlan",
        descricao: "Desenvolvedor de Software",
        cor: 'green'
      },
      {
        id: 4,
        nome: "Angelo",
        descricao: "Desenvolvedor de Software",
      },
      {
        id: 5,
        nome: "Mauricio",
        descricao: "Desenvolvedor de Software",
      },
      {
        id: 6,
        nome: "Marcelo",
        descricao: "Desenvolvedor de Software",
      },
    ],
    colunas: [
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
    ],
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
            ordenar-por="nome"
            ordenar-desc
            chave-tabela="id"
            :linhas="linhas"
            :colunas="colunas"
            nome-tabela="Botões de ação/cores e detalhamento preparado para zoom"
            altura="200"
            mostra-acoes
            mostra-detalhes
            @alterar-item="alterarItem"
            @deletar-item="deletarItem"
            @exporta-zoom="exportaZoom"
            @ver-detalhes="verDetalhes"
            :zoom-dialog="controller.dialogZoom"
            :pesquisa="controller.pesquisa"
            mostra-pesquisa
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
                    controller: {
                      dialogZoom: false,
                      pesquisa: null
                    },
                    linhas: [
                        {
                            id: 1,
                            nome: "Vinicius",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            id: 2,
                            nome: "Sergio",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            id: 3,
                            nome: "Kirlan",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            id: 4,
                            nome: "Angelo",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            id: 5,
                            nome: "Mauricio",
                            descricao: "Desenvolvedor de Software",
                        },
                        {
                            id: 6,
                            nome: "Marcelo",
                            descricao: "Desenvolvedor de Software",
                        },
                    ],
                    colunas: [
                        {
                            text: "ID",
                            align: "start",
                            sortable: false,
                            value: "id",
                        },
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
