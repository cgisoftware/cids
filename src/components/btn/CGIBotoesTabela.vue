<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-toolbar flat>
      <v-toolbar-title
        :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"
      >
        Botões Tabela
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text class="my-5">
      <v-row>
        <cgi-acoes
          incluir
          @incluir="incluir()"
          atualizar
          @atualizar="atualizar()"
          filtro
          @filtro="dialogFiltro = true"
        >
          <template v-slot:formulario="{ cancelar }">
            <v-card>
              <v-card-title>Filtro</v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="Campo 1"
                        dense
                        v-model="campo1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        label="Campo 2"
                        dense
                        v-model="campo2"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <cgi-btn cancelar @click="cancelar()"></cgi-btn>
                <v-spacer></v-spacer>
                <cgi-btn limpar @click="limpar()"></cgi-btn>
                <v-spacer></v-spacer>
                <cgi-btn
                  salvar
                  @click="
                    filtrar({ campo1, campo2 });
                    cancelar();
                  "
                ></cgi-btn>
              </v-card-actions>
            </v-card>
          </template>
        </cgi-acoes>
      </v-row>

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
import { alert } from "cids-cgi/lib/util";
import Prism from "prismjs";

export default {
  data: () => ({
    dialogFiltro: false,
    campo1: "",
    campo2: "",
    dataExample: Prism.highlight(
      `
        <template>
          <v-row>
            <cgi-acoes
              incluir
              @incluir="incluir()"
              atualizar
              @atualizar="atualizar()"
              filtro
              @filtro="dialogFiltro = true"
            >
              <template v-slot:formulario="{ cancelar }">
                <v-card>
                  <v-card-title>Filtro</v-card-title>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            label="Campo 1"
                            dense
                            v-model="campo1"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            label="Campo 2"
                            dense
                            v-model="campo2"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <cgi-btn cancelar @click="cancelar()"></cgi-btn>
                    <v-spacer></v-spacer>
                    <cgi-btn limpar @click="limpar()"></cgi-btn>
                    <v-spacer></v-spacer>
                    <cgi-btn
                      salvar
                      @click="
                        filtrar({ campo1, campo2 });
                        cancelar();
                      "
                    ></cgi-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </cgi-acoes>
          </v-row>
        <\/template>

        <script>
            export default {
              data: () => ({
                dialogFiltro: false,
                campo1: "",
                campo2: "",
              }),
              methods: {
                incluir() {
                  console.log("Botão INCLUIR!");
                },
                atualizar() {
                  console.log("Botão ATUALIZAR!");
                },
                limpar() {
                  this.campo1 = "";
                  this.campo2 = "";
                },
                filtrar(query) {
                  alert.show({ message: query });
                },
              },
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
  methods: {
    incluir() {
      console.log("Botão INCLUIR!");
    },
    atualizar() {
      console.log("Botão ATUALIZAR!");
    },
    limpar() {
      this.campo1 = "";
      this.campo2 = "";
    },
    filtrar(query) {
      alert.show({ message: query });
    },
  },
};
</script>

<style>
</style>