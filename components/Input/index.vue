<template>
  <label class="form-control w-full max-w-xs my-2">
    <input
      type="text"
      :placeholder="props.placeholder"
      class="input input-bordered bg-slate-100 border-blue-500 w-full max-w-xs text-black placeholder:text-sm"
      :value="props.modelValue"
      @input="updateValue"
    />
  </label>
</template>
<script setup lang="ts">
const props = defineProps<{
  placeholder: string
  modelValue: string
}>()

const emits = defineEmits(["update:modelValue"])

const updateValue = (e: any) => {
  emits("update:modelValue", e.target.value)
}
</script>
<style></style>
