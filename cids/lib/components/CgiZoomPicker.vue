<template>
  <div>
    <v-row>
      <v-col :cols="formataValor ? 4 : 12">
        <v-text-field
          v-if="!custom"
          :dense="compacto"
          :label="nome"
          :rules="regras"
          v-model="valor"
          type="number"
          :disabled="desabilitado"
          @click:prepend="chamaZoom"
          @click:append="clear"
          prepend-icon="mdi-database-search-outline"
          append-icon="mdi-close"
          @blur="blur"
          :loading="loading"
        >
        </v-text-field>
      </v-col>
      <v-col v-if="formataValor">
        <v-text-field
          v-if="!custom"
          :dense="compacto"
          :value="descricao"
          disabled
        >
        </v-text-field>
      </v-col>
    </v-row>

    <slot
      name="customcomp"
      v-bind:chamaZoom="chamaZoom"
    > </slot>

    <v-dialog
      v-if="dialog"
      persistent
      scrollable
      :value="true"
      class="pa-0"
      :width="largura"
    >
      <component
        ref="component"
        @click:close="close"
        @cancelar-zoom="close"
        @confirmar-zoom="confirma"
        v-bind:is="zoom"
        :registro="valor"
        @exporta-zoom="setaValor"
      ></component>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: (vm) => ({
    valor: vm.value,
    dialog: false,
    descricao: null,
    item: {},
    debounceSearch: null,
    loading: false,
  }),
  watch: {
    valor() {
      debugger
      if (this.formataValor) {
        this.debounceSearch();
      } else {
        this.$emit("input", this.valor);
      }
    },
    value() {
      debugger
      if (this.value === 0 || this.value === null || this.value === "") {
        this.descricao = null;
      }
      this.valor = this.value;
    },
  },
  computed: {
    custom() {
      return !!this.$slots["customcomp"] || !!this.$scopedSlots["customcomp"];
    },
  },
  created() {
    this.debounceSearch = this.debounce(this.updateSearch, 500);
  },
  mounted() {
    this.valor = this.value
      ? this.value
      : this.posicao === "inicial"
      ? 0
      : 999999999;
  },
  methods: {
    setaValor: function (valor) {
      if (!this.custom) {
        this.valor = valor[this.chave];
        if (this.formataValor) {
          this.descricao = valor[this.campoValorFormatado];
        }
        this.item = valor;
        this.dialog = false;

        this.$emit("change", this.item);
      }
    },
    async chamaZoom() {
      this.dialog = true;
      await new Promise((resolver) => setTimeout(resolver, 200));
      this.$refs.component.controller.dialogZoom = true;
      if (this.custom) {
        this.$refs.component.controller.preencheFormulario(
          this.params,
          this.desabilitaCampos
        );
      } else {
        this.$refs.component.controller.pesquisa = null;
        await new Promise((resolver) => setTimeout(resolver, 400));
        this.$refs.component.controller.pesquisa =
          this.valor !== 0 && this.valor ? this.valor.toString() : null;
      }
    },
    blur() {
      this.$emit("perde-foco", this.valor);
    },
    close() {
      this.dialog = false;
      this.$emit("cancelar-zoom");
    },
    confirma() {
      this.dialog = false;
      this.$emit("confirmar-zoom");
    },
    clear() {
      if (this.posicao === "inicial") {
        this.valor = 0;
      } else {
        this.valor = 999999999;
      }
      this.descricao = null;
    },
    async updateSearch() {
      if (this.valor && this.aoDigitar) {
        this.descricao = await this.aoDigitar(this.valor);
      }
      this.$emit("input", this.valor);
    },
    debounce(func, wait) {
      let timer = null;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(func, wait);
      };
    },
  },
  props: {
    chave: {
      type: String,
      require: true,
    },
    zoom: {
      type: Object,
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
    posicao: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      default: () => "valor",
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
    "formata-valor": {
      type: Boolean,
      default: () => false,
    },
    "campo-valor-formatado": {
      type: String,
      default: () => "nome",
    },
    "ao-digitar": {
      type: Function,
    },
  },
};
</script>

<style scoped>
.input-witdh-normal {
  width: 25%;
}
</style>
