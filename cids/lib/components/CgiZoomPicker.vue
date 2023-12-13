<template>
  <div>
    <v-row>
      <v-col :cols="formataValor ? 4 : 12">
        <v-text-field
          ref="textfield"
          v-if="!custom"
          :label="nome"
          :dense="compacto"
          :rules="regras"
          v-model:model-value="valor"
          :disabled="desabilitado"
          @click:prepend-inner="chamaZoom"
          @click:append-inner="clear"
          prepend-inner-icon="mdi-database-search-outline"
          append-inner-icon="mdi-close"
          @blur="blur"
          :loading="loading"
          v-cgi-negative-number="tipo === 'number'"
        >
        </v-text-field>
      </v-col>
      <v-col v-if="formataValor">
        <v-text-field
          tabindex="-1"
          v-if="!custom"
          :dense="compacto"
          :value="descricao"
          readonly
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
      overlay-opacity="0"
      :model-value="true"
      class="pa-0"
      height="608px"
      :width="largura"
    >
      <component
        v-if="componenteZoom && !iframeUrl"
        ref="component"
        @click:close="close"
        @cancelar-zoom="close"
        @confirmar-zoom="confirma"
        v-bind:is="componenteZoom"
        :registro="valor"
        @exporta-zoom="setaValor"
      ></component>
      <v-card
        v-show="!componenteZoom && iframeUrl"
      >
        <iframe
          :src="iframeUrl"
          width="100%"
          height="100%"
          style="border: white;"
          ></iframe>
      </v-card>
      <v-card
        v-if="!componenteZoom && !iframeUrl"
        height="500"
      >
        <v-card-title>
          <v-spacer></v-spacer>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="d-flex justify-center align-center">
          <div class="font-weight-bold red--text display-1"> Zoom não disponível</div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { publisher, subscriber } from "../util";

export default {
  data: (vm) => ({
    valor: vm.value,
    dialog: false,
    descricao: null,
    item: {},
    debounceSearch: null,
    loading: false,
    componenteZoom: null,
    iframeUrl: null,
  }),
  watch: {
    valor() {
      if (this.formataValor) {
        this.debounceSearch();
      } else {
        this.$emit("update:modelValue", this.valor);
      }
    },
    value() {
      if (this.value === 0 || this.value === null || this.value === "") {
        this.descricao = null;
      }
      this.valor = this.value;
    },
  },
  computed: {
    custom() {
      return !!this.$slots["customcomp"];
    },
  },
  created() {
    this.debounceSearch = this.debounce(this.updateSearch, 500);
  },
  async mounted() {
    if (this.valor && this.aoDigitar) {
      this.descricao = await this.aoDigitar(this.valor);
    }
    this.componenteZoom = await this.renderComponente();

    subscriber(this.zoom).listen('getParams', this.loadParams)
    subscriber(this.zoom).exportZoom(this.setaValor);
    subscriber(this.zoom).cancel(this.close);
  },
  methods: {
    async renderComponente() {
      this.iframeUrl = null;

      if (this.zoom === null) {
        return null;
      }

      if (this.zoom.startsWith("/")) {
        this.iframeUrl = this.zoom;
        return null;
      }

      const [modulo, programa] = this.zoom.split("/");
      const component = (
        await import(`@/module/${modulo}/${programa}/view/${programa}.vue`)
      ).default;
      return component;
    },
    async setaValor(valor) {
      if (!this.custom) {
        this.valor = valor[this.chave];

        if (this.formataValor) {
          this.descricao = valor[this.campoValorFormatado];
        }

        this.item = valor;
        this.dialog = false;

        if (this.valor && this.aoDigitar) {
          this.descricao = await this.aoDigitar(this.valor);
        }

        setTimeout(() => {
          this.$refs.textfield?.focus();
        }, 100);
        this.$emit("change", this.item);
      }
    },
    async chamaZoom() {
      this.dialog = true;
      await new Promise((resolver) => setTimeout(resolver, 100));
      if (this.componenteZoom && !this.iframeUrl) {
        this.chamaZoomComponente();
        return;
      }
    },
    loadParams() {
      publisher(this.zoom).send("dialogZoom", true);

      if (this.custom) {
        publisher(this.zoom).send("preencheFormulario", {
          params: this.params,
          desabilitaCampos: this.desabilitaCampos,
        });

        return;
      }

      if (this.params !== undefined) {
        publisher(this.zoom).send("queryZoom", this.params);
      }

      publisher(this.zoom).send(
        "pesquisa",
        this.valor && this.valor !== 0 ? this.valor.toString() : null
      );
    },
    async chamaZoomComponente() {
      this.$refs.component.controller.dialogZoom = true;
      if (this.custom) {
        this.$refs.component.controller.preencheFormulario(
          this.params,
          this.desabilitaCampos
        );
        return;
      }

      if (this.$refs.component.controller.pesquisa !== undefined) {
        this.$refs.component.controller.pesquisa = null;
        await new Promise((resolver) => setTimeout(resolver, 100));
        this.$refs.component.controller.pesquisa =
          this.valor && this.valor !== 0 ? this.valor.toString() : null;
      }

      if (
        this.params !== undefined &&
        this.$refs.component.controller.queryZoom !== undefined
      ) {
        this.$refs.component.controller.queryZoom(this.params);
      }
    },
    blur() {
      this.$emit("perde-foco", this.valor);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.$refs.textfield?.focus();
      }, 100);
      this.$emit("cancelar-zoom");
    },
    confirma() {
      this.dialog = false;
      setTimeout(() => {
        this.$refs.textfield?.focus();
      }, 100);
      this.$emit("confirmar-zoom");
    },
    clear() {
      this.valor = null;
      this.descricao = null;
    },
    async updateSearch() {
      if (this.valor && this.aoDigitar) {
        this.descricao = await this.aoDigitar(this.valor);
      }
      this.$emit("update:modelValue", this.valor);
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
      type: String,
      default: () => null,
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
      required: false,
    },
    largura: {
      type: String,
      default: () => "70%",
    },
    params: {
      require: false,
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
    tipo: {
      type: String,
      default: () => "number",
    },
  },
};
</script>

<style scoped>
.input-witdh-normal {
  width: 25%;
}
</style>