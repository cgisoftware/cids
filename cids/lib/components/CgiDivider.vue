<template>
  <v-card
    class="my-6"
    variant="outlined"
  >
    <div class="d-flex justify-center">
      <v-sheet
        position="fixed"
        style="margin-top: -12px;"
      >
        <div class="mx-2">{{ titulo }}</div>
      </v-sheet>
    </div>

    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
});
</script>