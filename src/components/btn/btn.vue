<template>
  <div>
    <div>
      <cgi-btn></cgi-btn>
      <cgi-btn alterar></cgi-btn>
      <cgi-btn deletar></cgi-btn>
      <cgi-btn copiar></cgi-btn>
      <cgi-btn pdf></cgi-btn>
      <cgi-btn relatorio></cgi-btn>
      <cgi-btn atualizar></cgi-btn>
      <cgi-btn filtro>
        <template v-slot:formulario="{ cancelar }">
          <v-card>
            <v-card-text>
              asdjaiosdjioj
            </v-card-text>
            <v-card-actions>
              <cgi-btn
                cancelar
                @click="cancelar"
              ></cgi-btn>
            </v-card-actions>
          </v-card>
        </template>

      </cgi-btn>
      <cgi-btn excel></cgi-btn>
      <cgi-btn salvar></cgi-btn>
      <cgi-btn cancelar></cgi-btn>
      <cgi-btn limpar></cgi-btn>
    </div>

    <cgi-acoes
      incluir
      :desabilitar-incluir="desabilitado"
      :carregar-incluir="carregando"
      @incluir="teste"
      alterar
      :desabilitar-alterar="desabilitado"
      :carregar-alterar="carregando"
      @alterar="teste"
      filtro
      atualizar
    >
      <template v-slot:formulario="{ cancelar }">
        <v-card>
          <v-card-text>
            form
          </v-card-text>
          <v-card-actions>
            <cgi-btn
              cancelar
              @click="cancelar"
            ></cgi-btn>
          </v-card-actions>
        </v-card>
      </template>
    </cgi-acoes>
  </div>
</template>

<script>
export default {
  data: () => ({
    desabilitado: false,
    carregando: false,
  }),
  methods: {
    teste() {
      console.log("aaaa");
      alert("aaaa");
    },
  },
};
</script>