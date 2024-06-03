<template>
  <v-card
    class="my-6"
    outlined
  >
    <v-sheet class="v-sheet--offset mx-auto">
      <div class="mx-2">{{ titulo }}</div>
    </v-sheet>

    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
    },
  },
};
</script>