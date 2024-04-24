<template>
  <div>
    <v-row>
      <v-col :cols="formataValor ? 4 : 12">
        <v-text-field
          ref="textfield"
          v-if="!custom"
          v-model:model-value="valor"
          v-cgi-negative-number="tipo === 'number'"
          :label="nome"
          :dense="compacto"
          :rules="regras"
          :disabled="desabilitado"
          :readonly="somenteLeitura"
          :loading="loading"
          @blur="blur"
        >
          <template v-slot:append-inner>
            <v-icon tabindex="-1" @click="clear"> mdi-close </v-icon>
          </template>

          <template v-slot:prepend-inner>
            <v-icon tabindex="-1" @click="chamaZoom">
              mdi-database-search-outline
            </v-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col v-if="formataValor">
        <v-text-field
          v-if="!custom"
          tabindex="-1"
          :dense="compacto"
          :value="descricao"
          readonly
        />
      </v-col>
    </v-row>

    <slot name="customcomp" v-bind:chamaZoom="chamaZoom" />

    <v-dialog
      v-if="dialog"
      height="608px"
      class="pa-0"
      :model-value="true"
      :width="largura"
      persistent
      scrollable
    >
      <component
        ref="component"
        v-if="componenteZoom && !iframeUrl"
        :is="componenteZoom"
        :registro="valor"
        @click:close="close"
        @cancelar-zoom="close"
        @confirmar-zoom="confirma"
        @exporta-zoom="setaValor"
      />

      <v-card v-show="!componenteZoom && iframeUrl">
        <iframe
          :src="iframeUrl"
          width="100%"
          height="100%"
          style="border: white"
        />
      </v-card>

      <v-card v-if="!componenteZoom && !iframeUrl" height="500">
        <v-card-title class="d-flex align-center justify-end">
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>

        <v-card-text class="d-flex justify-center align-center">
          <div class="font-weight-bold red--text display-1">
            Zoom não disponível
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, useSlots, watch } from "vue";
import { debounce, publisher, subscriber } from "../util";

const emit = defineEmits([
  "update:model-value",
  "change",
  "clear",
  "perde-foco",
  "cancelar-zoom",
  "confirmar-zoom",
]);

const props = defineProps({
  chave: {
    type: String,
    require: true,
  },
  zoom: {
    type: [String, Promise],
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
  modelValue: {},
  desabilitado: {
    type: Boolean,
    default: false,
  },
  somenteLeitura: {
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
});

const slots = useSlots();
const custom = computed(() => {
  return !!slots["customcomp"];
});

const component = ref(null);
const textfield = ref(null);
const valor = ref(props.modelValue);
const dialog = ref(false);
const descricao = ref(null);
const loading = ref(false);
const componenteZoom = ref(null);
const iframeUrl = ref(null);

watch(valor, () => {
  if (props.formataValor) {
    debounceSearch();
  } else {
    emit("update:model-value", valor.value);
  }
});

watch(
  () => props.modelValue,
  () => {
    if (
      props.modelValue === 0 ||
      props.modelValue === null ||
      props.modelValue === ""
    ) {
      descricao.value = null;
    }

    valor.value = props.modelValue;
  }
);

const updateSearch = async () => {
  if (valor.value && props.aoDigitar) {
    descricao.value = await props.aoDigitar(valor.value);
  }

  emit("update:model-value", valor.value);
};

const debounceSearch = debounce(updateSearch, 500);

onMounted(async () => {
  if (valor.value && props.aoDigitar) {
    descricao.value = await props.aoDigitar(valor);
  }

  componenteZoom.value = await renderComponente();

  if (!subscriber) return;

  subscriber(props.zoom).listen("getParams", loadParams);
  subscriber(props.zoom).exportZoom(setaValor);
  subscriber(props.zoom).cancel(close);
});

const renderComponente = async () => {
  if (typeof props.zoom === "object" && typeof props.zoom.then === "function") {
    const { component } = (await props.zoom)();

    return component;
  }

  iframeUrl.value = null;

  if (props.zoom === null) {
    return null;
  }

  if (props.zoom.startsWith("/")) {
    iframeUrl.value = props.zoom;
    return null;
  }
};

const setaValor = async (item) => {
  if (!custom.value) {
    valor.value = item[props.chave];

    if (props.formataValor) {
      descricao.value = item[props.campoValorFormatado];
    }

    dialog.value = false;

    if (valor.value && props.aoDigitar) {
      descricao.value = await props.aoDigitar(valor.value);
    }

    setFocus();
    emit("change", item);
  }
};

const chamaZoom = async () => {
  if (props.desabilitado || props.somenteLeitura) return;

  dialog.value = true;
  await new Promise((resolver) => setTimeout(resolver, 100));

  if (componenteZoom.value && !iframeUrl.value) {
    chamaZoomComponente();
    return;
  }
};

const loadParams = () => {
  if (!publisher) return;

  publisher(props.zoom).send("dialogZoom", true);

  if (custom.value) {
    publisher(props.zoom).send("preencheFormulario", {
      params: props.params,
      desabilitaCampos: props.desabilitaCampos,
    });

    return;
  }

  if (props.params !== undefined) {
    publisher(props.zoom).send("queryZoom", props.params);
  }

  publisher(props.zoom).send(
    "pesquisa",
    valor.value && valor.value !== 0 ? valor.value.toString() : null
  );
};

const chamaZoomComponente = async () => {
  component.value.controller.dialogZoom.value = true;

  if (custom.value) {
    component.value.controller.preencheFormulario({
      params: props.params,
      desabilitaCampos: props.desabilitaCampos,
    });
    return;
  }

  if (component.value.controller.pesquisa !== undefined) {
    component.value.controller.pesquisa = null;
    await new Promise((resolver) => setTimeout(resolver, 100));
    component.value.controller.pesquisa =
      valor.value && valor.value !== 0 ? valor.value.toString() : null;
  }

  if (
    props.params !== undefined &&
    component.value.controller.queryZoom !== undefined
  ) {
    component.value.controller.queryZoom(props.params);
  }
};

const blur = async () => {
  await nextTick();

  if (dialog.value) return;

  emit("perde-foco", valor.value);
};

const close = () => {
  dialog.value = false;
  setFocus();
  emit("cancelar-zoom");
};

const confirma = () => {
  dialog.value = false;
  setFocus();
  emit("confirmar-zoom");
};

const clear = () => {
  if (props.desabilitado || props.somenteLeitura) {
    return;
  }

  valor.value = null;
  descricao.value = null;
  emit("clear");
};

const setFocus = async () => {
  await nextTick();

  textfield.value.focus();
};
</script>

<style scoped>
.input-witdh-normal {
  width: 25%;
}
</style>
