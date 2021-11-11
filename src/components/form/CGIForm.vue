<template>
  <div>
    <cgi-form
      titulo="Titulo do form"
      :configuracao="configuracao"
      @confirmar="confirmar"
      :selecionado1="itens"
      :selecionado="itens"
    ></cgi-form>
    <pre>
    <code
        class="language-html py-5"
        v-html="dataExample"
        style="font-size: 14px; "
    ></code>
    </pre>
  </div>
</template>

<script>
import moment from "moment";
import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
export default {
  data: () => ({
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-form
                titulo="Titulo do form"
                :configuracao="configuracao"
                @confirmar="confirmar"
                :selecionado1="itens"
                :selecionado="itens"
            ></cgi-form>
        <\/template>

        <script>
            export default {
                data: () => ({
                    itens: [
                        {
                            descricao: "teste",
                            id: 1,
                        },
                        {
                            descricao: "teste 2",
                            id: 2,
                        },
                    ],
                    configuracao: {
                        linha1: [
                            {
                                coluna: 6,
                                campo: "zoom",
                                nome: "Nome",
                                compacto: true,
                                chave: "nome",
                                chaveZoom: "id",
                                zoom: CGIDataTableAcoes,
                                posicao: "inicial",
                                formataValor: true,
                                valorInicial: 4,
                            },
                            {
                                campo: "select",
                                nome: "Selecionar",
                                compacto: true,
                                chave: "selecionado",
                                textoItem: "descricao",
                                valorItem: "id",
                            },
                            {
                                campo: "autocomplete",
                                nome: "Autocompletar",
                                compacto: true,
                                chave: "selecionado1",
                                textoItem: "descricao",
                                valorItem: "id",
                            },
                        ],
                        linha2: [
                            {
                                campo: "texto",
                                nome: "CPF",
                                compacto: true,
                                chave: "senha",
                                mascara: ["###.###.###-##"],
                            },
                            {
                                campo: "data",
                                nome: "Data de nascimento",
                                compacto: true,
                                regras: [(v) => !!v || "Preencha o campo"],
                                chave: "dtNascimento",
                                valorInicial: moment().format("DD/MM/YYYY"),
                            },
                            {
                                campo: "hora",
                                nome: "Hora de nascimento",
                                compacto: true,
                                regras: [(v) => !!v || "Preencha o campo"],
                                chave: "hrNascimento",
                            },
                        ],
                        linha3: [
                            {
                                campo: "checkbox",
                                nome: "Observação 1",
                                compacto: true,
                                chave: "observacao1",
                            },
                            {
                                campo: "texto-area",
                                nome: "Observação 2",
                                compacto: true,
                                regras: [(v) => !!v || "Preencha o campo"],
                                chave: "observacao2",
                            },
                        ],
                    },
                }),
                methods: {
                    confirmar(form) {
                        console.log(form);
                    },
                },
            };
        <\/script>
      `,
      Prism.languages.html
    ),
    itens: [
      {
        descricao: "teste",
        id: 1,
      },
      {
        descricao: "teste 2",
        id: 2,
      },
    ],
    configuracao: {
      linha1: [
        {
          coluna: 6,
          campo: "zoom",
          nome: "Nome",
          compacto: true,
          chave: "nome",
          chaveZoom: "id",
          zoom: CGIDataTableAcoes,
          posicao: "inicial",
          formataValor: true,
          valorInicial: 4,
        },
        {
          campo: "select",
          nome: "Selecionar",
          compacto: true,
          chave: "selecionado",
          textoItem: "descricao",
          valorItem: "id",
        },
        {
          campo: "autocomplete",
          nome: "Autocompletar",
          compacto: true,
          chave: "selecionado1",
          textoItem: "descricao",
          valorItem: "id",
        },
      ],
      linha2: [
        {
          campo: "texto",
          nome: "CPF",
          compacto: true,
          chave: "senha",
          mascara: ["###.###.###-##"],
        },
        {
          campo: "data",
          nome: "Data de nascimento",
          compacto: true,
          regras: [(v) => !!v || "Preencha o campo"],
          chave: "dtNascimento",
          valorInicial: moment().format("DD/MM/YYYY"),
        },
        {
          campo: "hora",
          nome: "Hora de nascimento",
          compacto: true,
          regras: [(v) => !!v || "Preencha o campo"],
          chave: "hrNascimento",
        },
      ],
      linha3: [
        {
          campo: "checkbox",
          nome: "Observação 1",
          compacto: true,
          chave: "observacao1",
        },
        {
          campo: "texto-area",
          nome: "Observação 2",
          compacto: true,
          regras: [(v) => !!v || "Preencha o campo"],
          chave: "observacao2",
        },
      ],
    },
  }),
  methods: {
    confirmar(form) {
      console.log(form);
    },
  },
};
</script>
