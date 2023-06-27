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
      <v-list class="text-left ma-2" nav dense>
        <router-link
          v-for="item in menu"
          :key="item.nome"
          :to="item.path"
          class="router-link"
        >
          <v-list-item-title class="mb-3">
            <v-icon left class="pr-4">{{
              item.icone.includes("mdi") ? item.icone : "mdi-home"
            }}</v-icon
            >{{ item.nome }}
          </v-list-item-title>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { menu } from "../const/menu";

export default {
  data: () => ({
    leftDrawer: false,
    mini: true,
    menu,
  }),
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}

.router-link.active {
  font-weight: bold;
}

.router-link:hover {
  background-color: #f0f0f0;
}
</style>