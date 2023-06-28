<template>
  <v-card class="mx-auto mt-5" width="90%" style="margin-top: -64px">
    <v-card-title primary-title class="font-weight-bold">
      Exemplos
    </v-card-title>
    <v-divider></v-divider>
    <v-toolbar flat>
      <v-toolbar-title
        :class="$vuetify.theme.isDark ? 'white--text' : 'black--text'"
        class="subtitle-1"
      >
        Snackbar
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text>
      <v-btn color="primary" class="mx-1" @click="mostraAlerta">Alerta!</v-btn>
      <v-btn class="secondary" @click="mostraConfirmacao">Confirmação</v-btn>

      <pre>
                <code
                class="language-html py-5"
                v-html="snackbarExample"
                style="font-size: 14px; "
              ></code>
              </pre>
    </v-card-text>
  </v-card>
</template>

<script>
import Prism from "prismjs";
import { snackbar } from "cids-cgi/lib/util";
export default {
  data: () => ({
    snackbarExample: Prism.highlight(
      `
        <template>
            <cgi-snackbar/>
            <!--
                SOMENTE NO ARQUIVO APP.VUE DO PROJETO.
                NÃO DEFINIR EM OUTROS LUGARES NO CÓDIGO!!
            -->

            <v-btn
                color="primary"
                class="mx-1"
                @click="mostraAlerta"
            >Alerta!</v-btn>

            <v-btn
                class="secondary"
                @click="mostraConfirmacao"
            >Confirmação</v-btn>
        <\/template>

        <script>
            import { snackbar } from "cids-cgi/lib/util";
            export default {
                methods: {
                    mostraAlerta() {
                        snackbar.show({ message: "Alerta geral!" });
                    },
                    async mostraConfirmacao() {
                        const confirmou = await snackbar.confirm({ message: "Confirmar algo" });
                        if (confirmou) {
                          //faz algo
                        }
                    },
                },
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
  methods: {
    mostraAlerta() {
      snackbar.show({ message: "Alerta geral!" });
    },
    async mostraConfirmacao() {
      const confirmou = await snackbar.confirm({ message: "Confirmar algo" });
      console.log(confirmou);
    },
  },
};
</script>
