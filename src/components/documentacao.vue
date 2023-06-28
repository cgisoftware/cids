<template>
  <div>
    <v-card class="mx-auto overflow-hidden">
      <v-app-bar
        color="primary"
        app
        class="rounded-xl rounded-tl-0 rounded-tr-0 no-print"
        clipped-left
        clipped-right
      >
        <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.smAndDown"
          color="white"
          @click="leftDrawer = !leftDrawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">
          <img
            width="70"
            class="mt-2 hidden-md-and-down"
            src="../assets/cgi-branca-nova.png"
          />
          <img
            width="40"
            class="mt-2 hidden-lg-and-up"
            src="../assets/cgi-branca-nova.png"
          />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <h3 class="white--text">CGI Design System for Vue - CIDS</h3>
        <v-spacer></v-spacer>
        <v-btn text @click="rightDrawer = !rightDrawer" class="white--text">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>

      <navigation-left />
      <div @mouseleave="rightDrawer = false">
        <v-navigation-drawer
          v-model="rightDrawer"
          app
          hide-overlay
          fixed
          clipped
          color="nav"
          right
        >
          <v-card class="elevation-0 mb-5 mt-5 text-center" color="nav">
            <div>Bem vindo</div>
            <v-switch
              inset
              class="ml-5 pl-5"
              hide-details
              v-model="dark"
              @change="changeDark()"
              color="primary"
              :label="dark ? 'Modo escuro' : 'Modo claro'"
            ></v-switch>
          </v-card>
        </v-navigation-drawer>
      </div>
    </v-card>

    <v-container>
      <router-view></router-view>
      <router-view name="componenteA"></router-view>
      <router-view name="componenteB"></router-view>
      <router-view name="componenteC"></router-view>
      <router-view name="componenteD"></router-view>
      <router-view name="componenteE"></router-view>
      <router-view name="componenteF"></router-view>
      <router-view name="componenteG"></router-view>
      <router-view name="componenteH"></router-view>
      <router-view name="componenteI"></router-view>
      <router-view name="componenteJ"></router-view>
      <router-view name="componenteK"></router-view>
    </v-container>
  </div>
</template>

<script>
import NavigationLeft from "./home/navigation/navigation-drawer-left.vue";

export default {
  components: {
    NavigationLeft,
  },
  data: () => ({
    leftDrawer: false,
    rightDrawer: false,
    dark: false,
  }),
  methods: {
    changeDark() {
      this.$vuetify.theme.dark = this.dark;
      localStorage.setItem("dark", this.dark);
    },
  },
};
</script>

<style scoped>
</style>