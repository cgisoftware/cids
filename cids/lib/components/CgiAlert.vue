<template>
  <div>
    <v-dialog
      v-model="alert.dialog"
      persistent
      max-width="500"
    >
      <v-card
        :color="alert.color"
        class="white--text"
      >
        <v-card-title> Aviso! </v-card-title>
        <v-card-text class="white--text">
          <div v-html="alert.message"></div>
        </v-card-text>
        <v-card-actions v-if="alert.actions.accept">
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

<script>
export default {};
</script>
