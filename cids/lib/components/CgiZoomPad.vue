<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-text-field
          :dense="compacto"
          :label="nome"
          :rules="regras"
          v-model="valor"
          :type="tipo"
          :disabled="desabilitado"
          @click:prepend="chamaZoom"
          @click:append="clear"
          prepend-icon="mdi-database-search-outline"
          append-icon="mdi-close"
          :loading="loading"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :dense="compacto"
          :value="descricao"
          readonly
          :loading="loading"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-dialog
      :width="largura"
      persistent
      v-model="dialog"
    >
      <v-card>

        <cgi-data-table
          :linhas="linhas"
          :colunas="colunas"
          :nome-tabela="nomeTabela"
          mostra-acoes
          mostra-pesquisa
          :mostra-paginacao="false"
          altura="80%"
          :zoom-dialog="true"
          @exporta-zoom="setaValor"
          :alterar="false"
          :copiar="false"
          :deletar="false"
        >
        </cgi-data-table>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data: (vm) => ({
    valor: vm.value,
    dialog: false,
    descricao: null,
    item: {},
    loading: false,
    linhas: [],
    colunas: [
      {
        text: "Código",
        align: "start",
        sortable: false,
        value: "codigo",
      },
      {
        text: "Descrição",
        align: "start",
        sortable: false,
        value: "descricao",
      },
    ],
  }),
  watch: {
    valor() {
      this.$emit("input", this.valor);
    },
    value() {
      this.valor = this.value;
    },
  },
  mounted() {
    this.valor = this.value;
  },
  methods: {
    async buscaValores() {
      try {
        this.loading = true;
        const url = localStorage.getItem("serviceURI");
        const response = await axios.get(`${url}/rest/admin/adm210`, {
          params: {
            filter: {
              ablFilter: `tipo = '${this.tipo}'`,
            },
          },
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        });
        this.linhas = response?.data?.dSet?.ttZoomPadSeq ?? [];
      } catch (error) {
        alert.show({ message: error.toString() });
      } finally {
        this.loading = false;
      }
    },

    setaValor: function (valor) {
      this.valor = valor["codigo"];
      this.descricao = valor["descricao"];

      this.item = valor;
      this.dialog = false;

      this.$emit("change", this.item);
    },
    async chamaZoom() {
      if (!this.loading) {
        await this.buscaValores();
        this.dialog = true;
      }
    },
    clear() {
      this.valor = 0;
      this.descricao = null;
    },
  },
  props: {
    chave: {
      type: String,
      require: true,
    },
    compacto: {
      type: Boolean,
      default: false,
    },
    nome: {
      type: String,
      required: true,
    },
    regras: {
      type: Array,
      default: () => [],
    },
    value: {},
    desabilitado: {
      type: Boolean,
      default: false,
    },
    largura: {
      type: String,
      default: () => "70%",
    },
    params: {
      type: Object,
      require: true,
    },
    "desabilita-campos": {
      type: Boolean,
      default: () => false,
    },
    tipo: {
      type: String,
      required: true,
    },
    "nome-tabela": {
      type: String,
      required: true,
    },
  },
};
</script>