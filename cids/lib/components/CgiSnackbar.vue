<template>
  <div>
    <pre>{{ controller }}</pre>
    <v-snackbar
      :color="controller.color"
      v-model="controller.snackbar"
      :right="controller.position.right"
      :center="controller.position.center"
      :top="controller.position.top"
      multi-line
      :timeout="controller.timeout"
    >
      <div v-html="controller.message"></div>
      <template v-slot:action="{ attrs }">
        <div style="padding-right: 10px;">
          <v-btn
            v-show="controller.actions.accept"
            text
            v-bind="attrs"
            @click="controller.accept()"
          >
            Sim
          </v-btn>
          <v-btn
            v-show="controller.actions.accept || controller.actions.show"
            v-bind="attrs"
            @click="controller.decline()"
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </template>
      <v-spacer></v-spacer>
    </v-snackbar>

  </div>

</template>

<script>
import { snackbar } from "../util";
export default {
  computed: {
    controller() {
      return snackbar;
    },
  },
};
</script>