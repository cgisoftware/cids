<template>
  <div>
    <cgi-form
      titulo="Titulo do form"
      :configuracao="configuracao"
      @confirmar="confirmar"
      :selecionado1="itens"
      :selecionado="itens"
      retornar-query
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
import { alert } from "cids-cgi/lib/util";
export default {
  data: () => ({
    form: {
      observacao2: "kkkkkkkkk",
    },
    dataExample: Prism.highlight(
      `
        <template>
            <cgi-form
                titulo="Titulo do form"
                :configuracao="configuracao"
                @confirmar="confirmar"
                :selecionado1="itens"
                :selecionado="itens"
                retornar-query
            ></cgi-form>
        <\/template>

        <script>
            import { alert } from "cids-cgi/lib/util";
            import moment from "moment";
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
                          campo: "select",
                          nome: "Selecionar",
                          compacto: true,
                          chave: "selecionado",
                          textoItem: "descricao",
                          valorItem: "id",
                          tipo: "number",
                          query: {
                            operacao: "=",
                            comparacao: "and",
                          },
                        },
                        {
                          campo: "autocomplete",
                          nome: "Autocompletar",
                          compacto: true,
                          chave: "selecionado1",
                          textoItem: "descricao",
                          valorItem: "id",
                          tipo: "number",
                          query: {
                            campo: "cod_emp",
                            operacao: "=",
                            comparacao: "and",
                          },
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
                          valorInicial: false,
                          query: {
                            operacao: "=",
                            comparacao: "and",
                          },
                        },
                        {
                          campo: "texto-area",
                          nome: "Observação 2",
                          compacto: true,
                          regras: [(v) => !!v || "Preencha o campo"],
                          chave: "observacao2",
                          valorInicial: "teste",
                        },
                      ],
                    },
                }),
                methods: {
                  confirmar(query) {
                    alert.show({ message: query });
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
          campo: "select",
          nome: "Selecionar",
          compacto: true,
          chave: "selecionado",
          textoItem: "descricao",
          valorItem: "id",
          tipo: "number",
          query: {
            operacao: "=",
            comparacao: "and",
          },
        },
        {
          campo: "autocomplete",
          nome: "Autocompletar",
          compacto: true,
          chave: "selecionado1",
          textoItem: "descricao",
          valorItem: "id",
          tipo: "number",
          query: {
            campo: "cod_emp",
            operacao: "=",
            comparacao: "and",
          },
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
          valorInicial: false,
          query: {
            operacao: "=",
            comparacao: "and",
          },
        },
        {
          campo: "texto-area",
          nome: "Observação 2",
          compacto: true,
          regras: [(v) => !!v || "Preencha o campo"],
          chave: "observacao2",
          valorInicial: "teste",
        },
      ],
    },
  }),
  methods: {
    confirmar(query) {
      alert.show({ message: query });
    },
  },
};
</script>
