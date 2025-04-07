<template>
  <Head>
    <Title>Add Airdrop</Title>
    <Meta
      name="description"
      content="Airdrop Dashboard is a platform to efficiently manage and monitor your
      airdrop campaigns. Create, track and complete airdrop tasks
      easily!"
    />
  </Head>

  <section class="m-4 min-h-[60%] my-10">
    <div class="mt-8">
      <h1 class="text-2xl">Form Add new airdrop</h1>
    </div>

    <form @submit.prevent="store.submitAirdrop()" class="mt-10">
      <div class="flex flex-wrap md:flex-nowrap">
        <div class="w-full mx-4 md:mx-0">
          <div class="flex flex-col">
            <Errors :isError="store.isError" :message="store.errors.name" />

            <Input
              placeholder="Airdrop Name"
              :modelValue="store.airdrop.name"
              @update:modelValue="store.airdrop.name = $event"
            />
          </div>

          <div class="flex flex-col">
            <Errors :isError="store.isError" :message="store.errors.type" />
            <select
              v-model="store.airdrop.type"
              class="select bg-slate-100 select-bordered w-full max-w-xs text-black"
            >
              <option disabled value="">Airdrop Type</option>
              <option
                v-for="(type, i) in [
                  'Testnet Airdrop',
                  'Retroactive Airdrop',
                  'Node Airdrop',
                  'Telegram Airdrop',
                ]"
                :key="i"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>

          <div v-if="store.airdrop.type === 'Testnet Airdrop'" class="mt-4">
            <h2 class="text-lg font-bold">Testnet Airdrop Details</h2>

            <div class="flex flex-col mt-2">
              <Errors
                :isError="store.isError"
                :message="store.errors.details"
              />
              <Input
                placeholder="URL Faucet (Ex:https://example.com)"
                :modelValue="store.airdrop.details.faucetUrl"
                @update:modelValue="store.airdrop.details.faucetUrl = $event"
              />
            </div>

            <div class="flex flex-col mt-2">
              <Input
                placeholder="Official Website (Ex:https://example.com)"
                :modelValue="store.airdrop.details.officialWebsite"
                @update:modelValue="
                  store.airdrop.details.officialWebsite = $event
                "
              />
            </div>
          </div>

          <div v-if="store.airdrop.type === 'Retroactive Airdrop'" class="mt-4">
            <h2 class="text-lg font-bold">Retroactive Airdrop Details</h2>

            <div class="flex flex-col mt-2">
              <Errors
                :isError="store.isError"
                :message="store.errors.details"
              />
              <Input
                placeholder="URL Official Website"
                :modelValue="store.airdrop.details.officialWebsite"
                @update:modelValue="
                  store.airdrop.details.officialWebsite = $event
                "
              />
            </div>
          </div>

          <div class="flex flex-col">
            <Errors :isError="store.isError" :message="store.errors.potency" />
            <select
              v-model="store.airdrop.potency"
              class="select select-bordered w-full max-w-xs text-black mt-2 bg-slate-100"
            >
              <option disabled value="">Airdrop Potency</option>
              <option
                v-for="(type, i) in ['Low', 'Middle', 'High']"
                :key="i"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>

          <div class="flex flex-col">
            <Errors
              :isError="store.isError"
              :message="store.errors.blockchain"
            />
            <Input
              placeholder="Airdrop Blockchain (Ex:Ton,Eth,Solana)"
              :modelValue="store.airdrop.blockchain"
              @update:modelValue="store.airdrop.blockchain = $event"
            />
          </div>

          <div class="flex flex-col">
            <Errors
              :isError="store.isError"
              :message="store.errors.taskCount"
            />
            <select
              v-model="store.taskCount"
              class="select select-bordered w-full max-w-xs text-black bg-slate-100"
            >
              <option disabled value="">How many tasks?</option>
              <option v-for="i in 10" :key="i" :value="i">
                {{ i }}
              </option>
            </select>
          </div>

          <div v-for="n in store.taskCount" :key="n" class="">
            <Input
              :placeholder="`Task ${n}`"
              :modelValue="store.airdrop.tasks[n as number - 1]?.name || ''"
              @update:modelValue="
            (val) => {
              if (!store.airdrop.tasks[n as number - 1]) {
                store.airdrop.tasks[n as number - 1] = { name: val }
              } else {
                store.airdrop.tasks[n as number - 1].name = val
              }
            }
          "
            />
            <span
              v-if="store.errors.tasks[n as number - 1]"
              class="text-red-500"
            >
              {{ store.errors.tasks[(n as number) - 1] }}
            </span>
          </div>
        </div>

        <div class="w-full p-2">
          <textarea
            className="textarea  w-full my-4 h-64 bg-slate-100 text-black "
            v-model="store.airdrop.notes"
            placeholder="Type your notes here (optional)"
          ></textarea>
        </div>
      </div>

      <div>
        <button
          class="btn mt-4 bg-blue-500 border-none text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>

    <MyToast :isSuccess="store.isSuccess" :message="store.message" />
  </section>
</template>

<script setup lang="ts">
import { useMyAirdrop } from "~/stores/myAirdrop"
import { createUniqueId } from "~/utils/"

const router = useRouter()
const store = useMyAirdrop()

onMounted(() => {
  store.airdrop = {
    id: createUniqueId(),
    name: "",
    blockchain: "",
    details: {
      faucetUrl: "",
      officialWebsite: "",
    },
    isFavorite: false,
    notes: "",
    potency: "",
    tasks: [],
    type: "",
  }
})
</script>

<style scoped>
/* Tambahkan gaya sesuai kebutuhan */
</style>
