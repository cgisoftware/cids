<template>
  <div>
    <strong>Evento change</strong>
    <br>
    <br>
    <cgi-zoom-picker
      chave="id"
      :zoom="component"
      v-model="nome"
      nome="Desenvolvedor"
      posicao="inicial"
      @change="fazAlgo"
    ></cgi-zoom-picker>

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
import { snackbar } from "cids-cgi/lib/util";
import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
export default {
  methods: {
    fazAlgo(item) {
      //faz algo com o item selecionado no zoom
      snackbar.confirm({ message: `olha o item ai ${JSON.stringify(item)}` });
    },
  },
  data: () => ({
    component: CGIDataTableAcoes,
    nome: null,
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-zoom-picker
                chave="id"
                :zoom="component"
                v-model="idDesenvolvedor"
                nome="Desenvolvedor"
                posicao="inicial"
                @change="fazAlgo"
            ></cgi-zoom-picker>
        <\/template>

        <script>
            import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
            export default {
                methods: {
                  fazAlgo(item) {
                    //faz algo com o item selecionado no zoom
                  }
                },
                data: () => ({
                    component: CGIDataTableAcoes,
                    idDesenvolvedor: null,
                }
            };
        <\/script>
      `,
      Prism.languages.html
    ),
  }),
};
</script>