<template>
  <div>
    <cgi-data-table
      :linhas="linhas"
      :colunas="colunas"
      nome-tabela="Slots para pesquisa e botões"
      altura="200"
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
        favoritos: false
      },
      {
        nome: "Sergio",
        descricao: "Desenvolvedor de Software",
        favoritos: false
      },
      {
        nome: "Kirlan",
        descricao: "Desenvolvedor de Software",
        favoritos: false
      },
      {
        nome: "Angelo",
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
    dataExample: Prism.highlight(
      `
        <template>
          <cgi-data-table
            :linhas="linhas"
            :colunas="colunas"
            nome-tabela="Slots para pesquisa e botões"
            altura="200"
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
                        nome: "Kirlan",
                        descricao: "Desenvolvedor de Software",
                        favoritos: false
                      },
                      {
                        nome: "Angelo",
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
      item.favoritos = !item.favoritos
    }
  }
};
</script>
