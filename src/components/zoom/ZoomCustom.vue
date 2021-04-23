<template>
  <div>
    <strong>Custom zoom para telas que não são de listagem</strong>
    <br>
    <strong>Só funciona tela de zoom é um formulário, caso contrario apresenta problemas no console</strong>
    <br>
    <br>
    <cgi-zoom-picker
      chave="id"
      :zoom="component"
      v-model="nome"
      nome="Desenvolvedor"
      posicao="inicial"
      largura="30%"
    >
      <template v-slot:customcomp="{ chamaZoom }">
        <v-btn @click="chamaZoom">Abrir alguma coisa</v-btn>
      </template>
    </cgi-zoom-picker>

    <pre>
                <code
                class="language-html py-5"
                v-html="dataExample"
                style="font-size: 14px; "
              ></code>
              </pre>

    <v-divider class="my-5"></v-divider>
  </div>
</template>

<script>
import form from "./form";
export default {
  data: () => ({
    component: form,
    nome: null,
    dataExample: Prism.highlight(
      `
        <!-- tela para zoom -->
        <template>
            <cgi-zoom-picker
                chave="id"
                :zoom="component"
                v-model="nome"
                nome="Desenvolvedor"
                posicao="inicial"
                largura="30%"
            >
              <template v-slot:customcomp="{ chamaZoom }">
                <v-btn @click="chamaZoom">Abrir alguma coisa</v-btn>
              </template>
            </cgi-zoom-picker>
        <\/template>

        <script>
            import form from "./form";
            export default {
                data: () => ({
                    component: form,
                    idDesenvolvedor: null,
                }
            };
        <\/script>


        <!-- componente do formulario -->
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
                    :zoom="component"
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
        import CGIDataTableAcoes from "../table/CGIDataTableAcoes";
        export default {
          data: () => ({
              component: CGIDataTableAcoes,
              nome: null,
          }),
        };
        <\/script>

      `,
      Prism.languages.html
    ),
  }),
};
</script>

    

    