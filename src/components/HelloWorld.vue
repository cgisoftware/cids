<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      CIDS CGI
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-row justify="center" align="start">
        <v-col cols="12" lg="4">
          <CGIBtn />
          <v-card>
            <v-card-title>
              Pickers - Hora
            </v-card-title>
            <v-card-text>
              

              <CGITimePickerNormal />

              <CGITimePickerCompacto />

              <CGITimePickerDisabled />

              <!-- <cgi-date-picker
                nome="Data"
                v-model="data"
              ></cgi-date-picker>
              Data v-model: {{data}} -->
            </v-card-text>
          </v-card>
        </v-col>
        <!-- <v-col
          cols="12"
          lg="4"
        >
          <v-card>
            <v-card-title>
              Directives
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Valor"
                v-model="numero"
                v-cgi-number
              ></v-text-field>
              Número v-model: {{ numero }}
              <v-divider class="my-5"></v-divider>
              <v-text-field
                label="Dinheiro"
                v-model="dinheiro"
                v-cgi-money
              ></v-text-field>
              Número v-model: {{ dinheiro }}
              <v-divider class="my-5"></v-divider>
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="12" lg="4">
          <v-card>
            <v-card-title>
              Pickers - Data
            </v-card-title>
            <v-card-text>
              <CGIDatePickerNormal />

              <CGIDatePickerCompacto />

              <CGIDatePickerDisabled />

              <CGIDatePickerTipo />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="12" lg="4">
          <v-card>
            <v-card-title>
              Snackbar
            </v-card-title>
            <Snackbar />
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="12" lg="4">
          <section id="alertas">
            <v-card>
              <v-card-title>
                <a href="#alertas">Alertas</a>
              </v-card-title>
              <Alert />
            </v-card>
          </section>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="12" lg="4">
          <v-card>
            <v-card-title>
              Diretivas
            </v-card-title>
            <v-card-text>
              <Money />
              <Number />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="10">
          <v-card>
            <v-card-title>
              Tabelas
            </v-card-title>
            <v-card-text>
              <CGIDataTableBasica />
              <CGIDataTablePropriedades />
              <CGIDataTableSelecionarVarios />
              <CGIDataTablePaginacao />
              <CGIDataTableSlotsToolbar />
              <CGIDataTableAgrupamento />
              <CGIDataTableAcoes />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="4">
          <v-card>
            <v-card-title>
              Zoons
            </v-card-title>
            <v-card-text>
              <ZoomBasico />
              <ZoomChange />
              <ZoomCustom />
              <ZoomPAD />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="6">
          <section id="tree-view-default">
            <v-card>
              <v-card-title>
                <a href="#tree-view-default">Tree View</a>
              </v-card-title>
              <v-card-text>
                <CGITreeView />
              </v-card-text>
            </v-card>
          </section>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="6">
          <section id="tree-view-default">
            <v-card>
              <v-card-title>
                <a href="#image-picker">Image picker</a>
              </v-card-title>
              <v-card-text>
                <CGIImagePicker />
              </v-card-text>
            </v-card>
          </section>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="6">
          <section id="tree-view-default">
            <v-card>
              <v-card-title>
                <a href="#form">Form</a>
              </v-card-title>
              <v-card-text>
                <CGIForm />
              </v-card-text>
            </v-card>
          </section>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CGITimePickerNormal from "./time-picker/CGITimePickerNormal";
import CGITimePickerCompacto from "./time-picker/CGITimePickerCompacto";
import CGITimePickerDisabled from "./time-picker/CGITimePickerDisabled";
import CGIDatePickerNormal from "./date-picker/CGIDatePickerNormal";
import CGIDatePickerCompacto from "./date-picker/CGIDatePickerCompacto";
import CGIDatePickerDisabled from "./date-picker/CGIDatePickerDisabled";
import CGIDatePickerTipo from "./date-picker/CGIDatePickerTipo";
import CGIDataTableBasica from "./table/CGIDataTableBasica";
import CGIDataTablePropriedades from "./table/CGIDataTablePropriedades";
import CGIDataTableSelecionarVarios from "./table/CGIDataTableSelecionarVarios";
import CGIDataTablePaginacao from "./table/CGIDataTablePaginacao";
import CGIDataTableAcoes from "./table/CGIDataTableAcoes";
import CGIDataTableSlotsToolbar from "./table/CGIDataTableSlotsToolbar";
import CGIDataTableAgrupamento from "./table/CGIDataTableAgrupamento";
import CGITreeView from "./treeview/CGITreeView";
import ZoomBasico from "./zoom/ZoomBasico";
import ZoomChange from "./zoom/ZoomChange";
import ZoomCustom from "./zoom/ZoomCustom";
import ZoomPAD from "./zoom/ZoomPAD";
import Snackbar from "./snackbar/Snackbar";
import Alert from "./alert/Alert";
import Money from "./directives/Money";
import Number from "./directives/Number";
import CGIImagePicker from './image-picker/CGIImagePicker.vue'
import CGIForm from './form/CGIForm.vue'
import CGIBtn from './btn/btn.vue'

export default {
  components: {
    CGITimePickerNormal,
    CGITimePickerCompacto,
    CGITimePickerDisabled,
    CGIDatePickerNormal,
    CGIDatePickerCompacto,
    CGIDatePickerDisabled,
    CGIDatePickerTipo,
    Snackbar,
    Money,
    Number,
    CGIDataTableBasica,
    CGIDataTablePropriedades,
    CGIDataTableSelecionarVarios,
    CGIDataTablePaginacao,
    CGIDataTableAcoes,
    CGIDataTableSlotsToolbar,
    CGIDataTableAgrupamento,
    ZoomBasico,
    ZoomChange,
    ZoomCustom,
    ZoomPAD,
    CGITreeView,
    Alert,
    CGIImagePicker,
    CGIForm,
    CGIBtn
  },
  data: () => ({
    hora: "08:02",
    data: "08/08/2020",
    numero: 258954.85,
    dinheiro: 258954.85,
  }),
};
</script>
