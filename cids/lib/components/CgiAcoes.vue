<template>
  <div>
    <v-menu v-if="$vuetify.breakpoint.smAndDown">
      <template v-slot:activator="{ on, attrs }">
        <v-icon text v-bind="attrs" v-on="on"> mdi-menu </v-icon>
      </template>

      <v-list>
        <div class="d-flex flex-column">
          <cgi-btn
            v-if="atualizar"
            atualizar
            :carregando="carregarAtualizar"
            :desabilitado="desabilitarAtualizar"
            class="mb-3"
            @click="$emit('atualizar')"
          ></cgi-btn>

          <v-divider v-if="incluir" class="mx-1" vertical></v-divider>

          <cgi-btn
            v-if="incluir"
            incluir
            :carregando="carregarIncluir"
            :desabilitado="desabilitarIncluir"
            class="mb-3"
            @click="$emit('incluir')"
          ></cgi-btn>

          <v-divider v-if="alterar" class="mx-1" vertical></v-divider>

          <cgi-btn
            v-if="alterar"
            alterar
            :carregando="carregarAlterar"
            :desabilitado="desabilitarAlterar"
            class="mb-3"
            @click="$emit('alterar')"
          ></cgi-btn>

          <v-divider v-if="copiar" class="mx-1" vertical></v-divider>

          <cgi-btn
            v-if="copiar"
            copiar
            :carregando="carregarCopiar"
            :desabilitado="desabilitarCopiar"
            class="mb-3"
            @click="$emit('copiar')"
          ></cgi-btn>

          <v-divider v-if="deletar" class="mx-1" vertical></v-divider>

          <cgi-btn
            v-if="deletar"
            deletar
            :carregando="carregarDeletar"
            :desabilitado="desabilitarDeletar"
            class="mb-3"
            @click="$emit('deletar')"
          ></cgi-btn>

          <v-divider class="px-1" vertical v-if="relatorio"></v-divider>

          <cgi-btn
            v-if="relatorio"
            relatorio
            :carregando="carregarRelatorio"
            :desabilitado="desabilitarRelatorio"
            class="mb-3"
            @click="$emit('relatorio')"
          ></cgi-btn>

          <v-divider class="mx-1" vertical v-if="excel"></v-divider>

          <cgi-btn
            v-if="excel"
            excel
            :carregando="carregarExcel"
            :desabilitado="desabilitarExcel"
            class="mb-3"
            @click="$emit('excel')"
          ></cgi-btn>

          <v-divider class="mx-1" vertical v-if="pdf"></v-divider>

          <cgi-btn
            v-if="pdf"
            pdf
            :carregando="carregarPdf"
            :desabilitado="desabilitarPdf"
            class="mb-3"
            @click="$emit('pdf')"
          ></cgi-btn>

          <v-divider class="mx-1" vertical v-if="configuracoes"></v-divider>

          <cgi-btn
            v-if="configuracoes"
            configuracoes
            :carregando="carregarConfiguracoes"
            :desabilitado="desabilitarConfiguracoes"
            class="mb-3"
            @click="$emit('configuracoes')"
          ></cgi-btn>

          <v-divider v-if="filtro" class="mx-1" vertical></v-divider>

          <cgi-btn
            v-if="filtro"
            filtro
            :carregando="carregarFiltro"
            :desabilitado="desabilitarFiltro"
            class="mb-3"
            @click="$emit('filtro')"
          >
            <template v-slot:formulario="{ cancelar }">
              <slot name="formulario" v-bind:cancelar="cancelar" />
            </template>
          </cgi-btn>
        </div>
      </v-list>
    </v-menu>

    <div v-else class="d-flex">
      <cgi-btn
        v-if="atualizar"
        atualizar
        :carregando="carregarAtualizar"
        :desabilitado="desabilitarAtualizar"
        @click="$emit('atualizar')"
      ></cgi-btn>

      <v-divider v-if="incluir" class="mx-1" vertical></v-divider>

      <cgi-btn
        v-if="incluir"
        incluir
        :carregando="carregarIncluir"
        :desabilitado="desabilitarIncluir"
        @click="$emit('incluir')"
      ></cgi-btn>

      <v-divider v-if="alterar" class="mx-1" vertical></v-divider>

      <cgi-btn
        v-if="alterar"
        alterar
        :carregando="carregarAlterar"
        :desabilitado="desabilitarAlterar"
        @click="$emit('alterar')"
      ></cgi-btn>

      <v-divider v-if="copiar" class="mx-1" vertical></v-divider>

      <cgi-btn
        v-if="copiar"
        copiar
        :carregando="carregarCopiar"
        :desabilitado="desabilitarCopiar"
        @click="$emit('copiar')"
      ></cgi-btn>

      <v-divider v-if="deletar" class="mx-1" vertical></v-divider>

      <cgi-btn
        v-if="deletar"
        deletar
        :carregando="carregarDeletar"
        :desabilitado="desabilitarDeletar"
        @click="$emit('deletar')"
      ></cgi-btn>

      <v-divider class="px-1" vertical v-if="relatorio"></v-divider>

      <cgi-btn
        v-if="relatorio"
        relatorio
        :carregando="carregarRelatorio"
        :desabilitado="desabilitarRelatorio"
        @click="$emit('relatorio')"
      ></cgi-btn>

      <v-divider class="mx-1" vertical v-if="excel"></v-divider>

      <cgi-btn
        v-if="excel"
        excel
        :carregando="carregarExcel"
        :desabilitado="desabilitarExcel"
        @click="$emit('excel')"
      ></cgi-btn>

      <v-divider class="mx-1" vertical v-if="pdf"></v-divider>

      <cgi-btn
        v-if="pdf"
        pdf
        :carregando="carregarPdf"
        :desabilitado="desabilitarPdf"
        @click="$emit('pdf')"
      ></cgi-btn>

      <v-divider class="mx-1" vertical v-if="configuracoes"></v-divider>

      <cgi-btn
        v-if="configuracoes"
        configuracoes
        :carregando="carregarConfiguracoes"
        :desabilitado="desabilitarConfiguracoes"
        class="mb-3"
        @click="$emit('configuracoes')"
      ></cgi-btn>

      <v-divider v-if="filtro" class="mx-1" vertical></v-divider>

      <cgi-btn
        v-if="filtro"
        filtro
        :carregando="carregarFiltro"
        :desabilitado="desabilitarFiltro"
        @click="$emit('filtro')"
      >
        <template v-slot:formulario="{ cancelar }">
          <slot name="formulario" v-bind:cancelar="cancelar" />
        </template>
      </cgi-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    incluir: {
      type: Boolean,
      default: () => false,
    },
    desabilitarIncluir: {
      type: Boolean,
      default: () => false,
    },
    carregarIncluir: {
      type: Boolean,
      default: () => false,
    },
    alterar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarAlterar: {
      type: Boolean,
      default: () => false,
    },
    carregarAlterar: {
      type: Boolean,
      default: () => false,
    },
    deletar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarDeletar: {
      type: Boolean,
      default: () => false,
    },
    carregarDeletar: {
      type: Boolean,
      default: () => false,
    },
    copiar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarCopiar: {
      type: Boolean,
      default: () => false,
    },
    carregarCopiar: {
      type: Boolean,
      default: () => false,
    },
    filtro: {
      type: Boolean,
      default: () => false,
    },
    desabilitarFiltro: {
      type: Boolean,
      default: () => false,
    },
    carregarFiltro: {
      type: Boolean,
      default: () => false,
    },
    relatorio: {
      type: Boolean,
      default: () => false,
    },
    desabilitarRelatorio: {
      type: Boolean,
      default: () => false,
    },
    carregarRelatorio: {
      type: Boolean,
      default: () => false,
    },
    excel: {
      type: Boolean,
      default: () => false,
    },
    desabilitarExcel: {
      type: Boolean,
      default: () => false,
    },
    carregarExcel: {
      type: Boolean,
      default: () => false,
    },
    pdf: {
      type: Boolean,
      default: () => false,
    },
    desabilitarPdf: {
      type: Boolean,
      default: () => false,
    },
    carregarPdf: {
      type: Boolean,
      default: () => false,
    },
    configuracoes: {
      type: Boolean,
      default: () => false,
    },
    desabilitarConfiguracoes: {
      type: Boolean,
      default: () => false,
    },
    carregarConfiguracoes: {
      type: Boolean,
      default: () => false,
    },
    atualizar: {
      type: Boolean,
      default: () => false,
    },
    desabilitarAtualizar: {
      type: Boolean,
      default: () => false,
    },
    carregarAtualizar: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>
