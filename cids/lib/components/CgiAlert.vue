<template>
  <div>
    <v-dialog
      v-model="controller.dialog"
      persistent
      max-width="500"
    >
      <v-card
        :color="controller.color"
        class="white--text"
      >
        <v-card-title> Aviso! </v-card-title>
        <v-card-text class="white--text">
          <div v-html="controller.message"></div>
        </v-card-text>
        <v-card-actions v-if="controller.actions.accept">
          <v-btn
            class="white--text"
            text
            @click="controller.decline()"
          > Não </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            text
            @click="controller.accept()"
          > Sim </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            text
            @click="controller.decline()"
          > OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { alert } from '../util';
export default {
  computed: {
    controller() {
      return alert;
    }
  },
};
</script>
