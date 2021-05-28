<template>
  <div>
    <cgi-data-table
      :linhas="linhas"
      :colunas="colunas"
      nome-tabela="Com propriedades para customizar a tabela"
      altura="200"
      mostra-propriedades
      :propriedades=colunasvisiveis
      agrupar="nome"
      totalizar-grupo
      @salvar-propriedades="salvarPropriedades"
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
    salvarPropriedades(propriedadesDaTabela) {
      // salve na tabela padrão ou em algum local especifico
    }
  },
  data: () => ({
    linhas: [
      {
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
        contador: 1
      },
      {
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
        contador: 1
      },
      {
        nome: "Kirlan",
        descricao: "Desenvolvedor de Software",
        contador: 1
      },
      {
        nome: "Angelo",
        descricao: "Desenvolvedor de Software",
        contador: 1
      },
      {
        nome: "Mauricio",
        descricao: "Desenvolvedor de Software",
        contador: 1
      },
      {
        nome: "Marcelo",
        descricao: "Desenvolvedor de Software",
        contador: 1
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
        text: "Contador 123",
        align: "start",
        sortable: false,
        value: "contador",
        totalizar: true
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
              :linhas="linhas"
              :colunas="colunas"
              nome-tabela="Com propriedades para customizar a tabela"
              altura="200"
              mostra-propriedades
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
