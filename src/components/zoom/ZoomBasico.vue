<template>
  <div>
    <strong>Basico</strong>
    <br>
    <br>
    <cgi-zoom-picker
      chave="id"
      :zoom="component"
      v-model="nome"
      nome="Desenvolvedor"
      posicao="inicial"
      formata-valor
      :ao-digitar="buscaDescricao"
    ></cgi-zoom-picker>

    {{nome}}

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
import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
export default {
  methods: {
    perdeFoco(valor){
      console.log(valor);
    }
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
            ></cgi-zoom-picker>
        <\/template>

        <script>
            import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
            export default {
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
  async mounted() {
    await new Promise(resolve => setTimeout(() => {
      resolve()
    }, 5000))
    this.nome = 4
  },
  methods: {
    buscaDescricao() {
      return "buongiorno"
    }
  }
};
</script>

    