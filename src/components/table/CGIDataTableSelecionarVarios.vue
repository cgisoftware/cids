<template>
  <div>
    <cgi-data-table
      :linhas="linhas"
      :colunas="colunas"
      nome-tabela="Selecionar vários"
      altura="200"
      selecionar-varios
      chave-tabela="nome"
      v-model="selecionados"
      :mostra-paginacao="false"
      mostra-linha-selecionada
      cor-checkbox="red"
    ></cgi-data-table>

    <v-btn @click="selecionados = []"> remover seleçao </v-btn>
    <br>
    {{ selecionados }}

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
    salvarPropriedades(propriedadesDaTabela) {
      // salve na tabela padrão ou em algum local especifico
    },
  },
  data: () => ({
    selecionados: [],
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
          <div>
            <cgi-data-table
                :linhas="linhas"
                :colunas="colunas"
                nome-tabela="Selecionar vários"
                altura="200"
                selecionar-varios
                chave-tabela="nome"
                v-model="selecionados"
                :mostra-paginacao="false"
                mostra-linha-selecionada
            ></cgi-data-table>
            {{ selecionados }}
          </div>
        <\/template>

        <script>
            export default {
                data: () => ({
                    selecionados: [],
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
