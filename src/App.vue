<template>
  <v-app>
    <v-app-bar
      color="primary"
      class="rounded-xl rounded-te-0 rounded-ts-0 no-print app-bar"
      rail
      clipped-left
    >
      <v-toolbar-title>
        <v-img
          width="70"
          class="hidden-md-and-down"
          src="../src/assets/static/logo_cgi_software_branca_grande_atualizada.png"
        />
      </v-toolbar-title>
    </v-app-bar>
    <div @mouseenter="mini = false" @mouseleave="mini = true">
      <v-navigation-drawer
        expand-on-hover
        :rail="!mobile ? mini : false"
        :mini-variant="mobile ? mini : false"
        :permanent="!mobile"
        :temporary="mobile"
      >
        <v-list class="text-left" dense>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
            class="my-2"
          >
            <v-list-item-title class="d-flex align-center">
              <v-icon class="mr-2">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const mini = ref(true);

const items = ref([
  { title: "Home", icon: "mdi-home", to: "/" },
  { title: "Ações", icon: "mdi-gesture-tap", to: "/acoes" },
  { title: "Alertas", icon: "mdi-alert", to: "/alert" },
  { title: "Botões", icon: "mdi-radiobox-marked", to: "/botoes" },
  { title: "Tabelas", icon: "mdi-table", to: "/tabelas" },
  { title: "Date picker", icon: "mdi-calendar-range", to: "/date" },
  { title: "Divisor", icon: "mdi-minus", to: "/divider" },
  { title: "Formulário", icon: "mdi-form-select", to: "/form" },
  { title: "Image picker", icon: "mdi-image-area", to: "/image" },
  { title: "Diretivas", icon: "mdi-currency-usd", to: "/diretivas" },
  { title: "Snackbar", icon: "mdi-information", to: "/snackbar" },
  { title: "Time picker", icon: "mdi-calendar-clock", to: "/time" },
  { title: "Tree view", icon: "mdi-form-dropdown", to: "/view" },
  { title: "Zoom", icon: "mdi-magnify-plus", to: "/zoom" },
]);
</script>

<style>
.app-bar {
  position: fixed !important;
}
</style>
