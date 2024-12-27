<template lang="">
  <table class="table">
    <!-- head -->
    <thead class="text-xl">
      <tr class="text-white text-center">
        <th>No</th>
        <th class="xl:w-52">Name</th>
        <th>Type</th>
        <th>Potency</th>
        <th>Tasks</th>
        <th>Blockchain</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="props.airdrops.length == 0">
        <th scope="row" colspan="7">
          <h1 class="text-center md:text-xl">
            Your airdrops collection will be shown here
          </h1>
        </th>
      </tr>
      <!-- row 1 -->
      <tr
        v-for="(item, index) in props.airdrops"
        class="text-center group hover:font-bold cursor-pointer"
      >
        <th>{{ index + 1 }}</th>
        <td
          class="group-hover:text-blue-500"
          @click="$router.push(`/airdrop-detail/${item.id}`)"
        >
          {{ item.name.toUpperCase() }}
        </td>
        <td
          class="group-hover:text-blue-500"
          @click="$router.push(`/airdrop-detail/${item.id}`)"
        >
          {{ item.type.toUpperCase() }}
        </td>
        <td
          class="group-hover:text-blue-500"
          @click="$router.push(`/airdrop-detail/${item.id}`)"
        >
          {{ item.potency.toUpperCase() }}
        </td>
        <td
          class="group-hover:text-blue-500"
          @click="$router.push(`/airdrop-detail/${item.id}`)"
        >
          {{ item.tasks.length }}
        </td>
        <td
          class="group-hover:text-blue-500"
          @click="$router.push(`/airdrop-detail/${item.id}`)"
        >
          {{ item.blockchain.toUpperCase() }}
        </td>
        <td>
          <span
            @click.stop="store.openDialogRemoveConfirmation(item)"
            class="bg-red-500 p-1 rounded-md cursor-pointer hover:bg-red-600 hover:text-white"
            >Remove</span
          >
        </td>
      </tr>
    </tbody>
    <MyDialog
      :title="`Are
            you
            sure
            to
            remove
            ${store.airdrop.name}
            airdrop?`"
      id="confirmation_dialog"
      buttonTitle1="Yes"
      buttonTitle2="No"
      :action="() => store.removeAirdrop(store.airdrop)"
    >
    </MyDialog>
  </table>
</template>
<script setup lang="ts">
import type { AirdropsType } from "~/types"
import { useMyAirdrop } from "~/stores/myAirdrop"

const store = useMyAirdrop()

const props = defineProps<{
  airdrops: AirdropsType
  removeAirdrop: (item: string) => void
}>()
</script>
<style lang=""></style>
