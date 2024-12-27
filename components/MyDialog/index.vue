<template lang="">
  <dialog :id="props.id" class="modal bg-black bg-opacity-80">
    <div class="modal-box bg-gradient-to-tr from-gray-800 to-slate-900">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">{{ props.title }}</h3>

      <slot />

      <div class="modal-action flex place-content-start">
        <form method="dialog" class="flex gap-3">
          <button
            @click="props.action()"
            class="btn bg-blue-500 border-none text-white hover:bg-blue-600"
          >
            {{ props.buttonTitle1 }}
          </button>
          <button
            v-if="props.buttonTitle2"
            class="btn bg-red-500 border-none text-white hover:bg-red-600"
          >
            {{ props.buttonTitle2 }}
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  action: () => void
  id: string
  buttonTitle1: string
  buttonTitle2?: string
}>()
</script>
<style lang=""></style>
