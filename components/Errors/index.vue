<template>
  <span v-if="props.isError" class="text-red-500">{{ props.message }}</span>
</template>
<script setup lang="ts">
const props = defineProps<{
  message: any
  isError: boolean
}>()
</script>
<style></style>
