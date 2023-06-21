<template>
  <div @mouseenter="mini = false" @mouseleave="mini = true" style="width: auto">
    <v-navigation-drawer
      v-model="leftDrawer"
      app
      clipped
      :mini-variant="$vuetify.breakpoint.mdAndUp ? mini : false"
      width="330"
      left
      style="max-width: 340px; min-width: 60px; overflow-y: auto"
      id="keep"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="!$vuetify.breakpoint.mdAndUp"
    >
      <v-list class="text-left" nav dense>
          <!-- :active-class="raiz ? 'primary' : 'primary--text'" -->
        <v-list-group
          v-for="(item, key) in menu"
          :key="key"
          color="white"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title @click="activateItem(item)">
              <v-icon left class="pr-4">{{
                item.icone.includes("mdi") ? item.icone : "mdi-home"
              }}</v-icon
              >{{ item.descricao }}
            </v-list-item-title>
            <!-- <div v-if="raiz && item.temFilho">
              <v-icon>mdi-chevron-down</v-icon>
            </div> -->
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    leftDrawer: false,
    mini: true,
    menu: [
      { icone: "mdi-clock-outline", descricao: "Pickers - Hora" },
      { icone: "mdi-calendar-month", descricao: "Pickers - Data" },
      { icone: "mdi-message-alert-outline", descricao: "Snackbar" },
      { icone: "mdi-alert-outline", descricao: "Alertas" },
      { icone: "mdi-alert-outline", descricao: "Alertas" },
      { icone: "mdi-form-textbox", descricao: "Diretivas" },
      { icone: "mdi-table", descricao: "Tabelas" },
      { icone: "mdi-magnify", descricao: "Zoons" },
      { icone: "mdi-file-tree-outline", descricao: "Tree View" },
      { icone: "mdi-file-jpg-box", descricao: "Image picker" },
      { icone: "mdi-list-box-outline", descricao: "Form" },
    ],
  }),
};
</script>

<style>
</style>