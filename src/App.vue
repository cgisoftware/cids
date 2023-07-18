<template>
  <v-app>
    <v-main class="nav space-remove">
      <documentacao :controller="controller" />
      <cgi-snackbar />
      <cgi-alert />
    </v-main>
  </v-app>
</template>

<script>
import Documentacao from "@/components/home/view/documentacao.vue";

export default {
  components: {
    Documentacao,
  },
};
</script>

<style scoped>
:deep(pre[class*="language-"]:before) {
  content: none !important;
}
:deep(pre[class*="language-"]:after) {
  content: none !important;
}
</style>
