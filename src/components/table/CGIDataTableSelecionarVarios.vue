<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">

    <v-card-text>
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        nome-tabela="Tabela com opção de selecionar vários"
        altura="200"
        selecionar-varios
        chave-tabela="nome"
        v-model="selecionados"
        :mostra-paginacao="false"
        mostra-linha-selecionada
        cor-checkbox="red"
      ></cgi-data-table>

      <v-btn color="primary" class="mx-1 mt-5" @click="selecionados = []"
        >Remover Seleção</v-btn
      >
      <br />

      <pre class="mt-5">
       <code
      class="language-json">
        {{ selecionados }}
      </code>
      </pre>

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
          <div>
            <cgi-data-table
                :linhas="linhas"
                :colunas="colunas"
                nome-tabela="Tabela com opção de selecionar vários"
                altura="200"
                selecionar-varios
                chave-tabela="nome"
                v-model="selecionados"
                :mostra-paginacao="false"
                mostra-linha-selecionada
                cor-checkbox="red"
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
