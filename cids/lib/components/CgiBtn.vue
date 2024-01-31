<template>
  <div>
    <v-tooltip
      location="bottom"
      :text="`${btn.label} registro`"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          small
          v-if="!filtro"
          :variant="btn.variant"
          :disabled="desabilitado"
          :loading="carregando"
          :color="salvar || cancelar ? btn.cor : null"
        >
          <v-icon
            :color="btn.cor"
            start
          >{{ btn.icone }}</v-icon> {{ btn.label }}
        </v-btn>
      </template>
    </v-tooltip>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :close-on-click="false"
      :nudge-width="200"
      offset-x
      offset-y
    >
      <template v-slot:activator="{ props: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              v-bind="mergeProps(menu, tooltip)"
              variant="text"
              v-if="filtro"
              :disabled="desabilitado"
              :loading="carregando"
            >
              <v-icon
                start
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

<script setup>
import { computed, ref } from "vue";
import { mergeProps } from "vue";

const props = defineProps({
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
  configuracoes: {
    type: Boolean,
    default: () => false,
  },
  carregando: {
    type: Boolean,
    default: () => false,
  },
});

const menu = ref(false);
const botoes = ref([
  {
    label: "Incluir",
    icone: "mdi-plus",
    cor: "blue",
    variant: "text",
  },
  {
    label: "Alterar",
    icone: "mdi-pencil",
    cor: "orange",
    variant: "text",
  },
  {
    label: "Excluir",
    icone: "mdi-delete",
    cor: "red",
    variant: "text",
  },
  {
    label: "Copiar",
    icone: "mdi-content-copy",
    cor: "green darken-2",
    variant: "text",
  },
  {
    label: "Relatório",
    icone: "mdi-file-chart",
    cor: "orange",
    variant: "text",
  },
  {
    label: "Excel",
    icone: "mdi-file-excel",
    cor: "green",
    variant: "text",
  },
  {
    label: "Pdf",
    icone: "mdi-file-pdf-box",
    cor: "red",
    variant: "text",
  },
  {
    label: "Salvar",
    icone: "mdi-content-save",
    cor: "primary",
    variant: "elevated",
  },
  {
    label: "Cancelar",
    icone: "mdi-close",
    cor: "red",
    variant: "outlined",
  },
  {
    label: "Limpar",
    icone: "mdi-broom",
    cor: "primary",
    variant: "outlined",
  },
  {
    label: "Atualizar",
    icone: "mdi-reload",
    cor: "green",
    variant: "text",
  },
  {
    label: "Filtrar",
    icone: "mdi-filter",
    cor: "primary",
    variant: "text",
  },
  {
    label: "Configurações",
    icone: "mdi-cogs",
    cor: "primary",
    variant: "text",
  },
]);

const cancelarMenu = () => {
  menu.value = false;
};

const btn = computed(() => {
  if (props.alterar) {
    return botoes.value[1];
  }

  if (props.deletar) {
    return botoes.value[2];
  }

  if (props.copiar) {
    return botoes.value[3];
  }

  if (props.relatorio) {
    return botoes.value[4];
  }

  if (props.excel) {
    return botoes.value[5];
  }

  if (props.pdf) {
    return botoes.value[6];
  }

  if (props.salvar) {
    return botoes.value[7];
  }

  if (props.cancelar) {
    return botoes.value[8];
  }

  if (props.limpar) {
    return botoes.value[9];
  }

  if (props.atualizar) {
    return botoes.value[10];
  }

  if (props.filtrar) {
    return botoes.value[11];
  }

  if (props.configuracoes) {
    return botoes.value[12];
  }

  return botoes.value[0];
});
</script>