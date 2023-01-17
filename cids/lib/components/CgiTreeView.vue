<template>
  <v-treeview
    dense
    activatable
    :active.sync="ativoData"
    :color="'primary'"
    :items="itensManipulados"
    item-text="nomeComposto"
    :item-key="chaveTree"
    hoverable
    rounded
    :selectable="selecionavel"
    v-model="selecionados"
  >
  <template v-slot:label="{ item }">
    <div :style="{color: item.cor}">
      {{ item.nomeComposto }}
    </div>
  </template>
    <template v-slot:append="{ item }">
      <div v-show="dialogZoom">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              x-small
              icon
              color="orange darken-2"
              :fab="true"
              v-on="on"
              @click="exportaZoom(item)"
            >
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </template>
          <span>Usar registro na tela anterior</span>
        </v-tooltip>
      </div>
      <div>
        <slot name="botoes" v-bind:item="item"></slot>
      </div>
    </template>
  </v-treeview>
</template>

<script>
export default {
  data: (vm) => ({
    ativoTree: vm.ativo,
    selecionados: vm.value,
  }),
  watch: {
    value() {
      this.selecionados = this.value
    },
    selecionados() {
      this.$emit("input", this.selecionados);
    },
  },
  computed: {
    itensManipulados() {
      return this.listToTree(this.itens);
    },
    ativoData: {
      get: function () {
        if (this.ativoTree) {
          return [parseInt(this.ativoTree)];
        }

        return [];
      },
      set: function () {},
    },
  },
  methods: {
    exportaZoom(item) {
      this.$emit("exporta-zoom", item);
    },
    listToTree(list) {
      var map = {},
        node,
        roots = [],
        i;

      for (i = 0; i < list.length; i += 1) {
        map[list[i][this.chaveTree]] = i;
        list[i].children = [];
        list[i].nomeComposto = `${list[i][this.chaveTree]} - ${
          list[i][this.textoItem]
        }`;
      }

      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node[this.chavePaiTree] !== 0) {
          list[map[node[this.chavePaiTree]]]?.children?.push(node);
        } else {
          roots.push(node);
        }
      }

      return roots;
    },
  },

  props: {
    itens: {
      type: Array,
      required: true,
    },
    "chave-tree": {
      type: String,
      required: true,
    },
    "chave-pai-tree": {
      type: String,
      required: true,
    },
    "dialog-zoom": {
      type: Boolean,
      default: () => false,
    },
    "texto-item": {
      type: String,
      required: true,
    },
    ativo: {
      default: () => 0,
    },
    value: {},
    selecionavel: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
