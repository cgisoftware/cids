<template>
  <div>
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
    >
    </v-text-field>

    <slot name="customcomp" v-bind:chamaZoom="chamaZoom"> </slot>

    <v-dialog
      persistent
      scrollable
      v-model="dialog"
      class="pa-0"
      :width="largura"
    >
      <component
        ref="component"
        @click:close="close"
        @cancelar-zoom="close"
        @confirma-zoom="close"
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
    valor: vm.value ? vm.value : vm.posicao === "inicial" ? 0 : 999999999,
    dialog: false,
    item: {},
  }),
  watch: {
    valor() {
      this.$emit("input", this.valor);
    },
  },
  computed: {
    custom() {
      console.log(
        !!this.$slots["customcomp"] || !!this.$scopedSlots["customcomp"]
      );
      return !!this.$slots["customcomp"] || !!this.$scopedSlots["customcomp"];
    },
  },
  methods: {
    setaValor: function(valor) {
      console.log(valor);
      if (!this.custom) {
        this.valor = valor[this.chave];
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
        this.$refs.component.controller.preencheFormulario(this.params);
      } else {
        this.$refs.component.controller.pesquisa = null;
        await new Promise((resolver) => setTimeout(resolver, 400));
        this.$refs.component.controller.pesquisa =
          this.valor !== 0 ? this.valor.toString() : null;
      }
    },
    close() {
      this.dialog = false;
    },
    clear() {
      if (this.posicao === "inicial") {
        this.valor = 0;
      } else {
        this.valor = 999999999;
      }
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
  },
};
</script>
