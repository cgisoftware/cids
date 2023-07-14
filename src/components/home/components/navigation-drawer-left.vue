<template>
  <div
    @mouseenter="controller.mini = false"
    @mouseleave="
      controller.mini = true;
    "
    style="width: auto"
  >
    <v-navigation-drawer
      v-model="controller.leftDrawer"
      app
      clipped
      :rail="$vuetify.display.mdAndUp ? controller.mini : false"
      left
      style="min-width: 60px; overflow-y: auto"
      id="keep"
      :permanent="$vuetify.display.mdAndUp"
      :temporary="!$vuetify.display.mdAndUp"
    >
      <v-list class="text-left ma-2" nav dense>
        <router-link
          v-for="item in menu"
          :key="item.nome"
          :to="item.path"
          :class="['router-link', { active: isActiveRoute(item.path) }]"
        >
          <v-list-item-title class="mb-3">
            <v-icon>{{
              item.icone.includes("mdi") ? item.icone : "mdi-home"
            }}</v-icon
            ><span class="ml-2">{{ item.nome }}</span>
          </v-list-item-title>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { menu } from "../const/menu";

export default {
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    menu,
  }),
  methods: {
    isActiveRoute(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}

.router-link.active {
  font-weight: bold;
  background-color: #f0f0f0;
}

.router-link:hover {
  background-color: #f0f0f0;
}
</style>