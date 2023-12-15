<template>
  <div>
    <v-dialog
      v-model="alert.alertState.dialog"
      persistent
      max-width="500"
    >
      <v-card
        :color="alert.alertState.color"
        class="white--text"
      >
        <v-card-title> Aviso! </v-card-title>
        <v-card-text class="white--text">
          <div v-html="alert.alertState.message"></div>
        </v-card-text>
        <v-card-actions v-if="alert.alertState.actions.accept">
          <v-btn
            color="white"
            text
            @click="alert.decline()"
          > Não </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            text
            @click="alert.accept()"
          > Sim </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            text
            @click="alert.decline()"
          > OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useAlert } from '../composable/CgiAlert'
const alert = useAlert()
</script>
