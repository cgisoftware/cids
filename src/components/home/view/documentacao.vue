<template>
  <v-app-bar
    color="primary"
    app
    class="rounded-xl rounded-te-0 rounded-ts-0"
    clipped-left
    clipped-right
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      color="white"
      @click="controller.leftDrawer = !controller.leftDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title v-if="$vuetify.display.mdAndUp">
      <v-img
        width="70"
        class="mt-2 hidden-md-and-down"
        src="@/assets/cgi-branca-nova.png"
      />
      <v-img
        width="40"
        class="mt-2 hidden-lg-and-up"
        src="@/assets/cgi-branca-nova.png"
      />
    </v-toolbar-title>
    <h3 class="white--text">CGI Design System for Vue - CIDS</h3>
    <v-spacer></v-spacer>
    <v-btn
      text
      @click="controller.rightDrawer = !controller.rightDrawer"
      class="white--text"
    >
      <v-icon color="white">mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <navigation-left :controller="controller" />
  <div @mouseleave="controller.rightDrawer = false">
    <v-navigation-drawer
      v-model="controller.rightDrawer"
      app
      hide-overlay
      fixed
      clipped
      color="nav"
      right
      location="right"
    >
      <v-card class="elevation-0 mb-5 mt-5 text-center" color="nav">
        <div>Bem vindo</div>
        <v-switch
          inset
          class="ml-5 pl-5"
          hide-details
          v-model="controller.dark"
          @change="controller.changeDark()"
          color="primary"
          :label="controller.dark ? 'Modo escuro' : 'Modo claro'"
        ></v-switch>
      </v-card>
    </v-navigation-drawer>
  </div>

  <v-container>
    <v-main class="pa-0">
      <router-view></router-view>
    </v-main>
  </v-container>
</template>

<script>
import homeController from "@/components/home/controller/homeController";
import NavigationLeft from "@/components/home/components/navigation-drawer-left.vue";

export default {
  components: {
    NavigationLeft,
  },
  data: () => ({
    controller: new homeController(),
  }),
  mounted() {
    this.controller.mounted();
  },
};
</script>
