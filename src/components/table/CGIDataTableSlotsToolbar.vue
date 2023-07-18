<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">

    <v-card-text>
      <cgi-data-table
        nome-tabela="Tabela com slots para pesquisa e botões"
        altura="200"
        :linhas="linhas"
        :colunas="colunas"
      >
        <template v-slot:pesquisa>
          <v-text-field
            messages="Não é aplicavél o search da paginação no servidor, tratamento customizado aqui com v-model"
            dense
            label="Um slot customizado,"
          ></v-text-field>
        </template>
        <template v-slot:botoes>
          <v-btn color="primary" class="mx-1">Algum Botão Customizado</v-btn>
        </template>
        <template v-slot:favoritos="{ item }">
          <v-icon
            @click.stop="setaFavorito(item)"
            :color="item.favoritos ? 'orange' : 'primary'"
            >mdi-star</v-icon
          >
        </template>
      </cgi-data-table>
      <pre class="language-html py-5">
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
export default {
  data: () => ({
    linhas: [
      {
        nome: "Vinicius",
        descricao: "Desenvolvedor de Software",
        favoritos: false,
      },
      {
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
        favoritos: false,
      },
      {
        nome: "Jackson",
        descricao: "Desenvolvedor de Software",
        favoritos: false,
      },
      {
        nome: "João",
        descricao: "Desenvolvedor de Software",
        favoritos: false,
      },
      {
        nome: "Mauricio",
        descricao: "Desenvolvedor de Software",
        favoritos: false,
      },
      {
        nome: "Marcelo",
        descricao: "Desenvolvedor de Software",
        favoritos: false,
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
        text: "Favoritos",
        align: "end",
        sortable: false,
        value: "favoritos",
        custom: true,
      },
    ],
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
            nome-tabela="Tabela com slots para pesquisa e botões"
            altura="200"
            :linhas="linhas"
            :colunas="colunas"
          >
            <template v-slot:pesquisa>
              <v-text-field
                messages="Não é aplicavél o search da paginação no servidor, tratamento customizado aqui com v-model"
                dense
                label="Um slot customizado,"
              ></v-text-field>
            </template>
            <template v-slot:botoes>
              <v-btn>Algum botão customizado</v-btn>
            </template>
            <template v-slot:favoritos="{ item }">
              <v-icon @click.stop="setaFavorito(item)" :color="item.favoritos ? 'orange' : 'primary'">mdi-star</v-icon>
            </template>
          </cgi-data-table>
        <\/template>

        <script>
          export default {
            data: () => ({
              linhas: [
                {
                  nome: "Vinicius",
                  descricao: "Desenvolvedor de Software",
                  favoritos: false
                },
                {
                  nome: "Sergio",
                  descricao: "Desenvolvedor de Software",
                  favoritos: false
                },
                {
                  nome: "Jackson",
                  descricao: "Desenvolvedor de Software",
                  favoritos: false
                },
                {
                  nome: "João",
                  descricao: "Desenvolvedor de Software",
                  favoritos: false
                },
                {
                  nome: "Mauricio",
                  descricao: "Desenvolvedor de Software",
                  favoritos: false
                },
                {
                  nome: "Marcelo",
                  descricao: "Desenvolvedor de Software",
                  favoritos: false
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
                  text: "Favoritos",
                  align: "end",
                  sortable: false,
                  value: "favoritos",
                  custom: true
                },
              ],
            }),
            methods: {
              setaFavorito(item) {
                item.favoritos = !item.favoritos
              }
            }
          };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
  methods: {
    setaFavorito(item) {
      item.favoritos = !item.favoritos;
    },
  },
};
</script>