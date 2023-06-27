<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat> </v-toolbar>

    <v-card class="mx-auto" width="90%" style="margin-top: -64px">
      <v-toolbar flat>
        <v-toolbar-title
          :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"
        >
          Botões Soltos
        </v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="2">
            <cgi-btn incluir @click="incluir()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn alterar @click="alterar()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn deletar @click="deletar()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn copiar @click="copiar()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn pdf @click="pdf()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn relatorio @click="relatorio()"></cgi-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <cgi-btn atualizar @click="atualizar()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn excel @click="excel()"></cgi-btn>
          </v-col>
          <v-col cols="2">
            <cgi-btn filtro @click="dialogFiltro = true">
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
            </cgi-btn>
          </v-col>
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
            <v-col cols="2">
              <cgi-btn incluir @click="incluir()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn alterar @click="alterar()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn deletar @click="deletar()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn copiar @click="copiar()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn pdf @click="pdf()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn relatorio @click="relatorio()"></cgi-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <cgi-btn atualizar @click="atualizar()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn excel @click="excel()"></cgi-btn>
            </v-col>
            <v-col cols="2">
              <cgi-btn filtro @click="dialogFiltro = true">
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
                      <cgi-btn cgi-btn limpar @click="limpar()"></cgi-btn>
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
              </cgi-btn>
            </v-col>
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
                alterar() {
                  console.log("Botão ALTERAR!");
                },
                deletar() {
                  console.log("Botão DELETAR!");
                },
                copiar() {
                  console.log("Botão COPIAR!");
                },
                pdf() {
                  console.log("Botão PDF!");
                },
                relatorio() {
                  console.log("Botão RELATORIO!");
                },
                atualizar() {
                  console.log("Botão ATUALIZAR!");
                },
                excel() {
                  console.log("Botão EXCEL!");
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
    alterar() {
      console.log("Botão ALTERAR!");
    },
    deletar() {
      console.log("Botão DELETAR!");
    },
    copiar() {
      console.log("Botão COPIAR!");
    },
    pdf() {
      console.log("Botão PDF!");
    },
    relatorio() {
      console.log("Botão RELATORIO!");
    },
    atualizar() {
      console.log("Botão ATUALIZAR!");
    },
    excel() {
      console.log("Botão EXCEL!");
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