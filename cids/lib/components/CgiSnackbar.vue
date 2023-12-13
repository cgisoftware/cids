<template>
  <v-snackbar
    :color="snackbar.snackbarState.color"
    v-model="snackbar.snackbarState.snackbar"
    :location="snackbar.snackbarState.position"
    multi-line
    :timeout="snackbar.snackbarState.timeout"
  >
    <div v-html="snackbar.snackbarState.message"></div>
    <template v-slot:actions>
      <v-btn
        v-show="snackbar.snackbarState.actions.accept"
        text
        color="white"
        @click="snackbar.accept()"
      >
        Sim
      </v-btn>
      <v-btn
        v-show="snackbar.snackbarState.actions.accept || snackbar.snackbarState.actions.show"
        color="white"
        @click="snackbar.decline()"
        icon="mdi-close"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useSnackbar } from "../composable/CgiSnackbar.js";
const snackbar = useSnackbar();
</script>