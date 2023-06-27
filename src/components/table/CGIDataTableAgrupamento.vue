<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'">
        Tabela Com Agrupamento
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <cgi-data-table
        :linhas="linhas"
        :colunas="colunas"
        nome-tabela="Agrupamento"
        nome-programa="teste1"
        ativar-atalhos
        altura="200"
        agrupar-por="descricao"
        totalizar-grupo
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
        nome: "Jackson",
        descricao: "Desenvolvedor de Software",
        valor: 10,
      },
      {
        nome: "João",
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
              nome-programa="teste1"
              ativar-atalhos
              altura="200"
              agrupar-por="descricao"
              totalizar-grupo
          ></cgi-data-table>
        <\/template>

        <script>
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
                            nome: "Jackson",
                            descricao: "Desenvolvedor de Software",
                            valor: 10,
                        },
                        {
                            nome: "João",
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
                })
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>
