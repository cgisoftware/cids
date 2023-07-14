<template>
  <v-app>
    <v-main class="nav space-remove">
      <documentacao :controller="controller" />
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
</style>
