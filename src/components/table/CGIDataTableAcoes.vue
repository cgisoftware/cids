<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">

    <v-card-text>
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        nome-tabela="Tabela com botões de ação/cores e detalhamento preparado para zoom"
        nome-programa="teste"
        altura="200"
        mostra-acoes
        mostra-detalhes
        @alterar-item="alterarItem($event)"
        @deletar-item="deletarItem($event)"
        @exporta-zoom="exportaZoom($event)"
        @ver-detalhes="verDetalhes($event)"
        @copiar-item="copiarItem($event)"
        :zoom-dialog="controller.dialogZoom"
        :pesquisa="controller.pesquisa"
        chave-tabela="id"
      ></cgi-data-table>
      <pre v-if="!controller.dialogZoom">
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
    alterarItem(item) {
      console.log(item)
    },
    deletarItem(item) {
      console.log(item)
    },
    exportaZoom(item) {
      this.$emit("exporta-zoom", item);
    },
    verDetalhes(item) {
      console.log(item)
    },
    copiarItem(item) {
      console.log(item)
    }
  },
  data: () => ({
    controller: {
      dialogZoom: false,
    },
    linhas: [
      {
        id: 1,
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
        cor: "yellow",
      },
      {
        id: 2,
        nome: "Sergio",
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
        nome: "João",
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
            :linhas="linhas"
            :colunas="colunas"
            nome-tabela="Tabela com botões de ação/cores e detalhamento preparado para zoom"
            nome-programa="teste"
            altura="200"
            mostra-acoes
            mostra-detalhes
            @alterar-item="alterarItem($event)"
            @deletar-item="deletarItem($event)"
            @exporta-zoom="exportaZoom($event)"
            @ver-detalhes="verDetalhes($event)"
            @copiar-item="copiarItem($event)"
            :zoom-dialog="controller.dialogZoom"
            chave-tabela="id"
          ></cgi-data-table>
        <\/template>

        <script>
            export default {
                methods: {
                  alterarItem(item) {
                    // manipule o item
                    console.log(item)
                  },
                  deletarItem(item) {
                    // manipule o item
                    console.log(item)
                  },
                  exportaZoom(item) {
                    // manipule o item
                    this.$emit("exporta-zoom", item);
                  },
                  verDetalhes(item) {
                    // manipule o item
                    console.log(item)
                  },
                  copiarItem(item) {
                    // manipule o item
                    console.log(item)
                  }
                },
                data: () => ({
                    controller: {
                      dialogZoom: false,
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
                          nome: "Jackson",
                          descricao: "Desenvolvedor de Software",
                        },
                        {
                          id: 4,
                          nome: "João",
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
