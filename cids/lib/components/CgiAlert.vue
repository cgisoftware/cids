<template>
  <div>
    <v-dialog v-model="alert.dialog" persistent max-width="500">
      <v-card :color="alert.color" class="white--text">
        <v-card-title> Aviso! </v-card-title>
        <v-card-text class="white--text">
          {{ alert.message }}
        </v-card-text>
        <v-card-actions  v-if="alert.actions.accept">
          <v-btn class="white--text" text @click="alert.dialog = false"> Não </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="white--text" text @click="alert.accept()"> Sim </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn class="white--text" text @click="alert.dialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    alert: window.cgiAlert,
  }),
};
</script>
