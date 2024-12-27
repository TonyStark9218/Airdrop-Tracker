<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div
    v-else
    class="flex bg-gradient-to-tr from-gray-800 to-slate-900 text-white relative min-h-screen"
  >
    <MyDrawer :route="$route.path" :navigation="navigation" />

    <div
      class="hidden xl:w-[22%] border-r-2 border-gray-600 h-auto py-4 xl:flex flex-col gap-14"
    >
      <header>
        <h1 class="text-2xl font-bold text-center">
          Dashboard <span class="text-blue-500">Airdrop</span>
        </h1>
        <hr class="border-b-2 w-52 my-2 mx-auto border-gray-600" />
      </header>
      <div class="navigation flex flex-col gap-2 px-4">
        <div v-for="nav in navigation">
          <Nuxt-Link
            :to="nav.path"
            class="flex items-center hover:bg-blue-500 hover:bg-opacity-20 p-3 cursor-pointer rounded-md group"
            :class="$route.path === nav.path ? 'bg-blue-900 bg-opacity-30' : ''"
          >
            <Icon :name="nav.icon" size="30" class="group-hover:bg-blue-500" />
            <NuxtLink :to="nav.path" class="px-4 text-xl">{{
              nav.title
            }}</NuxtLink>
          </Nuxt-Link>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-[78%]">
      <header
        class="flex justify-between items-center mx-2 my-4 xl:hidden border-b-2 border-gray-400"
      >
        <NuxtLink to="/" class="text-2xl font-bold text-center">
          Dashboard <span class="text-blue-500">Airdrop</span>
        </NuxtLink>
        <label for="my-drawer" class="drawer-button cursor-pointer"
          ><Icon name="mdi:hamburger" size="40" />
        </label>
      </header>
      <slot />
      <hr class="border-b-2 border-gray-600" />
      <Footer />
    </div>
  </div>
</template>
<script setup lang="ts">
const $route = useRoute()
const loading = ref(true)

const navigation = [
  {
    title: "Home",
    path: "/",
    icon: "mdi:home",
  },
  {
    title: "Airdrop Collection",
    path: "/airdrop-collection",
    icon: "mdi:rocket-launch",
  },
  {
    title: "Add Airdrop",
    path: "/add-airdrop",
    icon: "mdi:book-open-variant",
  },
]

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>
<style lang=""></style>
