<template lang="">
  <section class="h-screen py-4 px-6 flex flex-col gap-10">
    <div class="content-1">
      <div class="flex flex-col gap-3">
        <h1 class="text-xl">Airdrop Collection</h1>
        <input
          type="text"
          placeholder="Search airdrop "
          class="input input-bordered input-primary w-full text-black"
          v-model="store.search"
        />
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in filterByType"
            :key="filter.id"
            class="btn btn-sm border-none hover:bg-blue-500"
            :class="filter.active == true ? 'bg-blue-500 text-white ' : ''"
            @click="airdropFilter(filter)"
          >
            {{ filter.name.replace("Airdrop", "") }}
          </button>
        </div>
      </div>
    </div>
    <div class="content-2 w-78 md:w-[700px] xl:w-full">
      <div class="flex items-center justify-between mb-4 flex-wrap">
        <h1>
          Found
          <span class="text-blue-400">{{ filteredAirdrops.length }}</span>
          airdrop
        </h1>
        <NuxtLink
          to="/add-airdrop"
          class="btn btn-sm bg-blue-500 border-none hover:bg-blue-600 text-white"
          >+ Add new airdrop</NuxtLink
        >
      </div>

      <div
        :class="
          store.airdrops.length >= 1
            ? 'overflow-x-auto'
            : 'overflow-x-auto md:overflow-hidden'
        "
        class="overflow-x-auto"
      >
        <TableCollection :airdrops="filteredAirdrops" />
      </div>
    </div>
    <MyToast />
  </section>
</template>
<script setup lang="ts">
import type { FilterType } from "~/types"
import { filterByType } from "~/utils/constant"
import { useMyAirdrop } from "~/stores/myAirdrop"

const store = useMyAirdrop()

const airdropFilter = (filter: FilterType) => {
  filterByType.forEach((f) => (f.active = false))

  filter.active = true
}

const filteredAirdrops = computed(() => {
  const activeFilter = filterByType.find((filter) => filter.active)
  const searchTerm = store.search.replace(/\s+/g, "").toLowerCase()

  return store.airdrops.filter((airdrop) => {
    const matchesSearch = airdrop.name
      .replace(/\s+/g, "")
      .toLowerCase()
      .includes(searchTerm)
    const matchesType =
      activeFilter?.name === "All" || airdrop.type === activeFilter?.name
    return matchesSearch && matchesType
  })
})

onMounted(() => {
  store.fetchAirdrops()
})
</script>
<style lang=""></style>
