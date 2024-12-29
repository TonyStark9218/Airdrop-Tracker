<template lang="">
  <Head>
    <Title>Home</Title>
    <Meta
      name="description"
      content="Airdrop Dashboard is a platform to efficiently manage and monitor your
      airdrop campaigns. Create, track and complete airdrop tasks
      easily!"
    />
  </Head>

  <section class="carousel flex flex-col m-4">
    <div
      class="bg-slate-700 h-72 w-[350px] md:w-[700px] xl:w-full flex flex-col md:flex-row justify-center md:gap-16 items-center bg-opacity-45 rounded-md mb-10 mx-auto"
    >
      <div class="flex flex-col justify-center items-center gap-2">
        <h1 class="text-2xl md:text-3xl xl:text-5xl">Airdrop Manager</h1>
        <p class="text-md text-center px-2">
          Manage your airdrop project easily and efficiently
        </p>
      </div>
      <div>
        <img src="/public/airdrop.png" alt="" class="h-36 md:h-48" />
      </div>
    </div>
    <div class="flex flex-col gap-4 pb-10 m-2 xl:m-4">
      <div class="flex justify-between">
        <h1 class="text-xl">Your Favorite</h1>
        <NuxtLink
          to="/airdrop-collection"
          class="text-xl hover:text-blue-500"
          v-if="airdrops.length != 0"
          >Show All</NuxtLink
        >
      </div>
      <div class="favorite-airdrop flex flex-wrap gap-2 my-10 justify-center">
        <div class="my-12" v-if="airdrops.length == 0">
          <h1>Your favorite airdrops will be shown here</h1>
        </div>

        <div
          class="w-[10rem] mt-4 h-20 border-2 flex flex-col items-center pt-3 px-2 bg-gray-600 rounded-md bg-opacity-60 cursor-pointer hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-20"
          v-for="item in airdrops"
          @click="router.push(`/airdrop-detail/${item.id}`)"
        >
          <h1 class="font-bold">{{ item.name }}</h1>
          <p class="text-gray-200">{{ item.blockchain }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { AirdropsType } from "~/types"
import { useMyAirdrop } from "~/stores/myAirdrop"

const router = useRouter()
const airdrops = ref<AirdropsType[]>([])
const store = useMyAirdrop()

onMounted(() => {
  const favorites = store.fetchAirdrops()
  airdrops.value = favorites.filter((item: AirdropsType) => item.isFavorite)
})
</script>
<style lang=""></style>
