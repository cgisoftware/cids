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
      <v-card v-show="!componenteZoom && iframeUrl">
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

<script setup>
import { computed, nextTick, onMounted, ref, useSlots, watch } from "vue";
import { debounce, publisher, subscriber } from "../util";

const emits = defineEmits([
  "update:modelValue",
  "change",
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
  modelValue: {},
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
    emits("update:modelValue", valor.value);
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
  emits("update:modelValue", valor.value);
};

const debounceSearch = debounce(updateSearch, 500);

onMounted(async () => {
  if (valor.value && props.aoDigitar) {
    descricao.value = await props.aoDigitar(valor);
  }
  componenteZoom.value = await renderComponente();

  if (!subscriber) {
    return;
  }

  subscriber(props.zoom).listen("getParams", loadParams);
  subscriber(props.zoom).exportZoom(setaValor);
  subscriber(props.zoom).cancel(close);
});

const renderComponente = async () => {
  iframeUrl.value = null;

  if (props.zoom === null) {
    return null;
  }

  if (props.zoom.startsWith("/")) {
    iframeUrl.value = props.zoom;
    return null;
  }

  const [modulo, programa] = props.zoom.split("/");
  const component = (
    await import(`@/module/${modulo}/${programa}/view/${programa}.vue`)
  ).default;
  return component;
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
    emits("change", item);
  }
};
const chamaZoom = async () => {
  dialog.value = true;
  await new Promise((resolver) => setTimeout(resolver, 100));
  if (componenteZoom.value && !iframeUrl.value) {
    chamaZoomComponente();
    return;
  }
};
const loadParams = () => {
  if (!publisher) {
    return;
  }

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
  component.value.controller.dialogZoom = true;
  if (custom.value) {
    component.value.controller.preencheFormulario(
      props.params,
      props.desabilitaCampos
    );
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
const blur = () => {
  emits("perde-foco", valor.value);
};
const close = () => {
  dialog.value = false;
  setFocus();
  emits("cancelar-zoom");
};
const confirma = () => {
  dialog.value = false;
  setFocus();
  emits("confirmar-zoom");
};
const clear = () => {
  valor.value = null;
  descricao.value = null;
};

const setFocus = () => {
  nextTick(() => {
    textfield.value.focus();
  });
};
</script>

<style scoped>
.input-witdh-normal {
  width: 25%;
}
</style>