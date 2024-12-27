<template lang="">
  <div
    class="mb-8 border-2 border-blue-500 h-auto rounded-md p-3 relative"
    :class="props.task.isDone ? 'bg-blue-500' : ''"
  >
    <h1 class="p-3">
      {{ props.task.name }}
    </h1>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  task: any
  index: number
  taskDone: () => void
}>()
</script>
<style lang=""></style>
