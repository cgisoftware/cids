<template>
  <div>
    <v-text-field
      :dense="compacto"
      :label="nome"
      :rules="regras"
      v-model="valor"
      type="number"
      @click:prepend="chamaZoom"
      @click:append="clear"
      prepend-icon="mdi-database-search-outline"
      append-icon="mdi-close"
    >
    </v-text-field>

    <v-dialog
      persistent
      v-model="dialog"
      class="pa-0"
      width="70%"
    >

      <!-- <v-card height="90vh"> -->
      <!-- <component
              ref="component"
              @click:zoom="setaZoom"
              @click:close="close"
              v-bind:is="zoom"
              :registro="valor"
            ></component> -->
      <!-- </v-col>
          <v-col>
            
          </v-col>
        </v-row> -->
      <!-- </v-card> -->
      <!-- <component
        ref="component"
        @click:zoom="setaZoom"
        @click:close="close"
        v-bind:is="zoom"
        :registro="valor"
      ></component> -->

      <v-card elevation="0">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-card-text
          style="height: 800px"
          class="pa-0"
        >
          <div v-show="loading">
            <v-skeleton-loader
              ref="skeleton"
              type="table-thead"
              class="mx-auto"
            ></v-skeleton-loader>
            <v-skeleton-loader
              ref="skeleton"
              type="table-theading"
              class="mx-auto"
            ></v-skeleton-loader>
            <v-skeleton-loader
              ref="skeleton"
              type="table-tbody"
              class="mx-auto"
            ></v-skeleton-loader>
            <v-skeleton-loader
              ref="skeleton"
              type="table-tbody"
              class="mx-auto"
            ></v-skeleton-loader>
            <v-skeleton-loader
              ref="skeleton"
              type="table-tbody"
              class="mx-auto"
            ></v-skeleton-loader>
          </div>
          <iframe
            v-show="!loading"
            :id="posicao"
            :src="zoom"
            width="100%"
            v-on:load="hideHeader"
            height="100%"
            frameborder="0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { eventBus } from "../util";
export default {
  data: (vm) => ({
    valor: vm.value ? vm.value : vm.posicao === "inicial" ? 0 : 999999999,
    dialog: false,
    item: {},
    baitaca: null,
    loading: true,
  }),
  watch: {
    valor() {
      this.$emit("input", this.valor);
    },
  },
  methods: {
    setaValor: function (valor) {
      this.valor = valor[this.chave];
      this.item = valor;
      this.dialog = false;

      eventBus.unsubscribe(this.evento, this.setaValor);
      this.$emit("change", this.item);
    },

    sendMessage() {
      const component = document.getElementById(this.posicao);
      if (component) {
        if (this.valor !== 999999999 && this.valor !== 0) {
          eventBus.emmitIframe(
            `${this.evento}-data`,
            this.tipo === "valor" ? this.valor : this.item,
            component
          );
        } else {
          eventBus.emmitIframe(`${this.evento}-data`, "", component);
        }
      }
    },
    hideHeader() {
      this.loading = false;

      this.sendMessage();
    },
    chamaZoom() {
      eventBus.subscribe(this.evento, this.setaValor);
      this.dialog = true;

      this.sendMessage();
    },
    setaZoom(item) {
      this.item = item;
      this.valor = item[this.chave];
      this.dialog = false;
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
    posicao: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      default: () => "valor",
    },
    evento: {
      type: String,
      require: true,
    },
  },
};
</script>
