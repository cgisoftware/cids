<template>
  <v-card-text>
    <v-btn
      color="primary"
      class="mx-1"
      @click="mostraAlerta"
    >Alerta!</v-btn>
    <v-btn
      class="secondary"
      @click="mostraConfirmacao"
    >Confirmação</v-btn>

    <pre>
                <code
                class="language-html py-5"
                v-html="snackbarExample"
                style="font-size: 14px; "
              ></code>
              </pre>

  </v-card-text>
</template>

<script>
import Prism from "prismjs";
import { snackbar } from "cids-cgi/lib/util";
export default {
  data: () => ({
    snackbarExample: Prism.highlight(
      `
        <templete>
            <cgi-snackbar> 
            <!-- 
                ^^^^
                ||||
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
    mostraConfirmacao() {
      snackbar.confirm({ message: "Confirmar algo" });
    },
  },
};
</script>
