<template>
  <v-card>
    <v-card-title>
      Formulario
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <cgi-zoom-picker
            chave="id"
            :zoom="table/CGIDataTableAcoes"
            v-model="nome"
            nome="Desenvolvedor"
            posicao="inicial"
          ></cgi-zoom-picker>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        outlined
        color="red"
        @click="$emit('cancelar-zoom')"
      >cancelar</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="primary"
        @click="$emit('confirma-zoom')"
      >salvar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CGIDataTableAcoes from "@/components/table/CGIDataTableAcoes.vue";
export default {
  data: () => ({
    component: CGIDataTableAcoes,
    nome: null,
  }),
};
</script>