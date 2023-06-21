<template>
  <v-app>
    <v-main class="nav space-remove pt-6">
      <Home />
      <cgi-snackbar />
      <cgi-alert />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./components/home/documentacao.vue";

export default {
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
