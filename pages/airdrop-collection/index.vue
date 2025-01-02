<template lang="">
  <Head>
    <Title>Collection</Title>
    <Meta
      name="description"
      content="Airdrop Dashboard is a platform to efficiently manage and monitor your
      airdrop campaigns. Create, track and complete airdrop tasks
      easily!"
    />
  </Head>

  <section class="min-h-screen py-4 px-6 flex flex-col gap-10">
    <div class="content-1">
      <div class="flex flex-col gap-3">
        <h1 class="text-xl">Airdrop Collection</h1>
        <input
          type="text"
          placeholder="Search airdrop "
          class="input input-bordered input-primary w-full text-black bg-white"
          v-model="store.search"
        />
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in filterByType"
            :key="filter.id"
            class="btn btn-sm border-none hover:bg-blue-500 text-black"
            :class="
              filter.active == true ? 'bg-blue-500 text-white ' : 'bg-white'
            "
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
        <div class="flex gap-2">
          <button
            @click="store.exportAirdrops()"
            class="btn btn-sm bg-blue-500 border-none hover:bg-blue-600 text-white"
          >
            Eksport Data
          </button>
          <input
            type="file"
            id="fileInput"
            accept="application/json"
            class="hidden"
            @change="store.handleAirdropsImport"
          />
          <label
            for="fileInput"
            class="btn btn-sm border-none bg-blue-500 text-white px-4 py-2 cursor-pointer hover:bg-blue-600"
          >
            Import Data
          </label>
          <!-- <NuxtLink
            to="/add-airdrop"
            class="btn btn-sm bg-blue-500 border-none hover:bg-blue-600 text-white"
            >+ Add new airdrop</NuxtLink
          > -->
        </div>
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
