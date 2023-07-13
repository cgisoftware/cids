<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat> </v-toolbar>

    <v-card class="mx-auto mb-5" width="90%" style="margin-top: -64px">
      <v-toolbar flat>
        <v-toolbar-title
          :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"
        >
          Handler
        </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <pre>
                <code
                class="language-javascript py-5"
                v-html="codeExample"
                style="font-size: 14px; "
              ></code>
              </pre>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    codeExample: Prism.highlight(
      `
        <import { toAblDate, formatNumber, toExcel, groupBy } from 'cids-cgi/lib/util'

        // converte data para o formato que o progress espera
        const dataAbl = toAblDate('2021-10-08', 'dia') // retorna = DATE(8, 10, 2021)

        // converte data para o formato que o progress espera
        const dataAbl = toAblDate('2021-10-08', 'mes') // retorna = DATE(1, 10, 2021)

        // converte data para o formato que o progress espera
        const dataAbl = toAblDate('2021-10-08', 'ano') // retorna = DATE(1, 1, 2021)

        // formata numeros para padrão brasileiro
        const stringNumber = formatNumber(1234.12) //retorna = "1.234,12"

        // exporta e faz download de um arquivo XLSX a partir de um dataset
        toExcel(dataset, 'placas') // retorna = download de arquivo chamado placas.xlsx

        // agrupa dataset por 0 ou n chaves
        const datasetGrouped = groupBy(dataset, (item) => ['nome', 'cod_emp']) // retorna = dataset agrupado por nome e cod_emp respectivamente

        // Adiciona reticências para limitar a quantidade de caracteres exibidos em tela onde tem campos onde pode ter texto grande na tabela
        cids.reticencias(item.campo, 45) // passa como parâmetro o campo e a quantidade de caracteres
      `,
      Prism.languages.javascript
    ),
  }),
};
</script>
