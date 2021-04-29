<template>
  <v-card-text>
    <v-btn color="primary" class="mx-1" @click="mostraAlerta"
      >Alerta fixo!</v-btn
    >
    <v-btn class="secondary" @click="mostraConfirmacao">Confirmação fixa</v-btn>

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
import { alert } from "cids-cgi/lib/util";
export default {
  data: () => ({
    snackbarExample: Prism.highlight(
      `
        <template>
            <cgi-alert/> 
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
            >Alerta fixo!</v-btn>
            
            <v-btn
                class="secondary"
                @click="mostraConfirmacao"
            >Confirmação fixa</v-btn>
        <\/template>

        <script>
            import { snackbar } from "cids-cgi/lib/util";
            export default {
                methods: {
                    mostraAlerta() {
                        alert.show({ message: "Alerta geral!" });
                    },
                    async mostraConfirmacao() {
                        const confirmou = await alert.confirm({ message: "Confirmar algo?" });
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
      alert.show({ message: "Alerta geral!" });
    },
    mostraConfirmacao() {
      alert.confirm({ message: "Confirmar algo" });
    },
  },
};
</script>
