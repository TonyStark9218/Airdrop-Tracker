<template lang="">
  <div
    v-if="store.isSuccess"
    class="fixed rounded-md right-6 top-14 w-40 h-16 p-4 bg-green-500 flex items-center justify-center"
  >
    {{ store.message }}
  </div>
</template>
<script setup lang="ts">
import { useMyAirdrop } from "~/stores/myAirdrop"

const store = useMyAirdrop()
</script>
<style lang=""></style>
