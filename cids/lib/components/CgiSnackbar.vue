<template>
  <v-snackbar
    :color="alert.color"
    v-model="alert.snackbar"
    :right="alert.position.right"
    :center="alert.position.center"
    :top="alert.position.top"
    multi-line
    :timeout="alert.timeout"
  >
    <div v-html="alert.message"></div>
    <template v-slot:action="{ attrs }">
      <div style="padding-right: 10px;">
        <v-btn
          v-show="alert.actions.accept"
          text
          v-bind="attrs"
          @click="alert.accept()"
        >
          Sim
        </v-btn>
        <v-btn
          v-show="alert.actions.accept"
          v-bind="attrs"
          @click="alert.decline()"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </template>
    <v-spacer></v-spacer>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    alert: window.cgiSnackbar,
  }),
};
</script>