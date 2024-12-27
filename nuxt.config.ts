// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@pinia/nuxt"],
  icon: {
    serverBundle: {
      collections: ["mdi"], // <!--- this
    },
  },

  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
})
