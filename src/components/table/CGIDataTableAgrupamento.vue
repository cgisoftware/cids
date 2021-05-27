<template>
  <div>
    <cgi-data-table
      :linhas="linhas"
      :colunas="colunas"
      nome-tabela="Agrupamento"
      altura="200"
      agrupar="descricao"
      totalizar-grupo
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
        nome: "Kirlan",
        descricao: "Desenvolvedor de Software",

        valor: 10,
      },
      {
        nome: "Angelo",
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
              :linhas="linhas"
              :colunas="colunas"
              nome-tabela="Agrupamento"
              altura="200"
              agrupar="descricao"
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
