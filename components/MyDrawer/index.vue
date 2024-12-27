<template>
  <div class="drawer absolute z-10">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content"></div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-gray-800 min-h-full w-72 p-4">
        <!-- Sidebar content here -->
        <header class="mb-10">
          <h1 class="text-2xl font-bold text-center">
            Dashboard <span class="text-blue-500">Airdrop</span>
          </h1>
          <hr class="border-b-2 w-52 my-2 mx-auto border-gray-600" />
        </header>
        <div v-for="nav in props.navigation">
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
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
type Navigation = {
  title: string
  path: string
  icon: string
}
const props = defineProps<{
  navigation: Navigation[]
  route: string
}>()
</script>
<style></style>
