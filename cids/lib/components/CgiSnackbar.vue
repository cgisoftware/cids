<template>
  <v-snackbar
    :color="snackbar.color"
    v-model="snackbar.snackbar"
    :right="snackbar.position.right"
    :center="snackbar.position.center"
    :top="snackbar.position.top"
    multi-line
    :timeout="snackbar.timeout"
  >
    <div v-html="snackbar.message"></div>
    <template v-slot:action="{ attrs }">
      <div style="padding-right: 10px;">
        <v-btn
          v-show="snackbar.actions.accept"
          text
          v-bind="attrs"
          @click="snackbar.accept()"
        >
          Sim
        </v-btn>
        <v-btn
          v-show="snackbar.actions.accept || snackbar.actions.show"
          v-bind="attrs"
          @click="snackbar.decline()"
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
export default {};
</script>