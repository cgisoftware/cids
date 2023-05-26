<template>
  <v-snackbar
    :color="snackbar.color"
    v-model="snackbar.snackbar"
    :location="snackbar.position"
    multi-line
    :timeout="snackbar.timeout"
  >
    <div v-html="snackbar.message"></div>
    <template v-slot:actions>
      <v-btn
        v-show="snackbar.actions.accept"
        text
        color="white"
        @click="snackbar.accept()"
      >
        Sim
      </v-btn>
      <v-btn
        v-show="snackbar.actions.accept || snackbar.actions.show"
        color="white"
        @click="snackbar.decline()"
        icon="mdi-close"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {};
</script>