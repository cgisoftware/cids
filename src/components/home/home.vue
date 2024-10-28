<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="70%" class="mt-10 rounded-t-lg" color="primary">
        <v-card-title class="d-flex justify-center align-center">
          <h3 class="font-weight-light-bold">Bem vindo, programador(a)!</h3>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card width="70%" class="rounded-b-lg pa-5">
        <v-card-title
          class="d-flex justify-center align-center font-weight-light mt-10"
        >
          Esse é o CGI Design System for Vue, o CIDS
        </v-card-title>
        <v-card-text class="font-weight-light text-center mt-10">
          Essa solução foi desenvolvida com o propósito de trazer um conforto a
          todos os desenvolvedores com casos onde o desenvolvimento se repete
          constantemente, como em tabelas de CRUD, campos customizados de data,
          botões personalizados, entre outros...
        </v-card-text>

        <v-card-text>
          <v-row class="d-flex justify-center align-center">
            <v-col cols="8">
              <div class="d-flex flex-column justify-center align-center">
                <v-row>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-gesture-tap" start></v-icon>
                    Ações
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-alert" start></v-icon>
                    Alertas
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-radiobox-marked" start></v-icon>
                    Botões
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-table" start></v-icon>
                    Tabelas
                  </v-chip>
                </v-row>
                <v-row>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-calendar-range" start></v-icon>
                    Date picker
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-minus" start></v-icon>
                    Divisores
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-form-select" start></v-icon>
                    Formulários
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-image-area" start></v-icon>
                    Image picker
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-currency-usd" start></v-icon>
                    Diretivas
                  </v-chip>
                </v-row>
                <v-row>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-information" start></v-icon>
                    Snackbar
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-calendar-clock" start></v-icon>
                    Time picker
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-form-dropdown" start></v-icon>
                    Tree view
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-magnify-plus" start></v-icon>
                    Zoom pad
                  </v-chip>
                  <v-chip class="ma-2" color="primary" label>
                    <v-icon icon="mdi-magnify-plus" start></v-icon>
                    Zoom picker
                  </v-chip>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="font-weight-light text-center mt-3">
          Procuramos deixar tudo documentado aqui, para que você possa consultar
          com facilidade como usar, quais props precisam ser passadas, se tem
          slot e como utilizá-lo, além de quais eventos podem ser criados.
        </v-card-text>
        <v-divider class="mt-10"></v-divider>
        <v-card-actions class="d-flex justify-center align-center">
          Desenvolvido pela
          <div>
            <v-img
              src="../../assets/static/cgi-preta-nova.png"
              width="30"
              class="ml-1 mt-1"
            >
            </v-img>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup></script>
