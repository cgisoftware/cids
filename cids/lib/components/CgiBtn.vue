<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          small
          v-if="!filtro"
          :text="btn.text"
          :outlined="btn.outlined"
          @click="$emit('click')"
          :disabled="desabilitado"
          :loading="carregando"
          :color="cancelar || salvar ? btn.cor : null"
        >
          <v-icon
            left
            :color="!salvar ? btn.cor : null"
          >{{ btn.icone }}</v-icon> {{ btn.label }}
        </v-btn>
      </template>
      <span>{{ btn.label }} registro</span>
    </v-tooltip>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :close-on-click="false"
      :nudge-width="400"
      offset-x
      offset-y
    >
      <template v-slot:activator="{ on: onMenu, attrs: attrMenu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: onTooltip, attrs: attrTooltip }">
            <v-btn
              v-bind="{ ...attrMenu, ...attrTooltip }"
              v-on="{ ...onMenu, ...onTooltip }"
              small
              text
              v-if="filtro"
              :disabled="desabilitado"
              :loading="carregando"
              @click="$emit('click')"
            >
              <v-icon
                left
                color="primary"
              >mdi-filter</v-icon> filtro
            </v-btn>
          </template>
          <span>Filtrar registros</span>
        </v-tooltip>
      </template>

      <slot
        name="formulario"
        v-bind:cancelar="cancelarMenu"
      />
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    menu: false,
    botoes: [
      {
        label: "Incluir",
        icone: "mdi-plus",
        cor: "blue",
        outlined: false,
        text: true,
      },
      {
        label: "Alterar",
        icone: "mdi-pencil",
        cor: "orange",
        outlined: false,
        text: true,
      },
      {
        label: "Excluir",
        icone: "mdi-delete",
        cor: "red",
        outlined: false,
        text: true,
      },
      {
        label: "Copiar",
        icone: "mdi-content-copy",
        cor: "green darken-2",
        outlined: false,
        text: true,
      },
      {
        label: "Relatório",
        icone: "mdi-file-chart",
        cor: "orange",
        outlined: false,
        text: true,
      },
      {
        label: "Excel",
        icone: "mdi-file-excel",
        cor: "green",
        outlined: false,
        text: true,
      },
      {
        label: "Pdf",
        icone: "mdi-file-pdf-box",
        cor: "red",
        outlined: false,
        text: true,
      },
      {
        label: "Salvar",
        icone: "mdi-content-save",
        cor: "primary",
        outlined: false,
        text: false,
      },
      {
        label: "Cancelar",
        icone: "mdi-close",
        cor: "red",
        outlined: true,
      },
      {
        label: "Limpar",
        icone: "mdi-broom",
        cor: "primary",
        outlined: true,
        text: false,
      },
      {
        label: "Atualizar",
        icone: "mdi-reload",
        cor: "green",
        outlined: false,
        text: true,
      },
      {
        label: "Filtrar",
        icone: "mdi-filter",
        cor: "primary",
        outlined: false,
        text: false,
      },
    ],
  }),
  methods: {
    cancelarMenu() {
      this.menu = false;
    },
  },
  computed: {
    btn() {
      if (this.alterar) {
        return this.botoes[1];
      }

      if (this.deletar) {
        return this.botoes[2];
      }

      if (this.copiar) {
        return this.botoes[3];
      }

      if (this.relatorio) {
        return this.botoes[4];
      }

      if (this.excel) {
        return this.botoes[5];
      }

      if (this.pdf) {
        return this.botoes[6];
      }

      if (this.salvar) {
        return this.botoes[7];
      }

      if (this.cancelar) {
        return this.botoes[8];
      }

      if (this.limpar) {
        return this.botoes[9];
      }

      if (this.atualizar) {
        return this.botoes[10];
      }

      if (this.filtrar) {
        return this.botoes[11];
      }

      return this.botoes[0];
    },
  },
  props: {
    incluir: {
      type: Boolean,
      default: () => false,
    },
    alterar: {
      type: Boolean,
      default: () => false,
    },
    deletar: {
      type: Boolean,
      default: () => false,
    },
    copiar: {
      type: Boolean,
      default: () => false,
    },
    filtro: {
      type: Boolean,
      default: () => false,
    },
    filtrar: {
      type: Boolean,
      default: () => false,
    },
    relatorio: {
      type: Boolean,
      default: () => false,
    },
    excel: {
      type: Boolean,
      default: () => false,
    },
    pdf: {
      type: Boolean,
      default: () => false,
    },
    limpar: {
      type: Boolean,
      default: () => false,
    },
    salvar: {
      type: Boolean,
      default: () => false,
    },
    cancelar: {
      type: Boolean,
      default: () => false,
    },
    atualizar: {
      type: Boolean,
      default: () => false,
    },
    desabilitado: {
      type: Boolean,
      default: () => false,
    },
    carregando: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>