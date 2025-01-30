<template>
  <section class="mx-10 mb-16">
    <Head>
      <Title>{{ toTitleCase(title) }}</Title>
      <Meta
        name="description"
        content="Airdrop Dashboard is a platform to efficiently manage and monitor your
      airdrop campaigns. Create, track and complete airdrop tasks
      easily!"
      />
    </Head>

    <div v-for="item in filteredAirdrop">
      <DetailHeader :item="item" />

      <div class="flex flex-col xl:flex-row justify-center gap-10 px-2">
        <div class="w-full">
          <div class="flex items-center gap-3 mb-5">
            <h1 class="text-2xl">Task</h1>
            <div class="tooltip mt-2" data-tip="Edit Task">
              <button @click="store.openEditTaskDialog(item)">
                <Icon
                  name="mdi:square-edit-outline"
                  size="23"
                  class="hover:text-blue-500"
                />
              </button>
            </div>
          </div>
          <TaskList
            v-for="(task, index) in item.tasks"
            :task="task"
            :index="index"
          />
        </div>

        <div class="w-full">
          <div class="flex items-center gap-3 mb-5">
            <h1 class="text-2xl">Notes</h1>
            <div
              class="tooltip mt-2"
              :data-tip="
                item.notes === '' || item.notes == null
                  ? 'Add Notes'
                  : 'Edit Notes'
              "
            >
              <button class="" @click="store.openNotesDialog(item.notes)">
                <Icon
                  name="mdi:receipt-text-plus"
                  size="23"
                  class="hover:text-blue-500"
                />
              </button>
            </div>
          </div>
          <div
            v-if="item.notes === '' || item.notes == null"
            class="border-2 border-blue-500 rounded-md h-auto w-full p-2 text-center"
          >
            Your notes will be shown here.
          </div>
          <div
            v-else
            class="border-2 border-blue-500 rounded-md h-auto w-full p-2 whitespace-pre-line"
          >
            {{ item.notes }}
          </div>
        </div>
      </div>

      <MyDialog
        id="my_modal_2"
        :title="
          item.notes === '' || item.notes == null
            ? 'Form Add Notes'
            : 'Form Edit Notes'
        "
        :action="store.saveNotes"
        buttonTitle1="Save"
        buttonTitle2="Cancel"
      >
        <textarea
          className="textarea  w-full my-4 h-48 bg-slate-100 text-black "
          v-model="store.airdrop.notes"
          placeholder="Type your notes here..."
        ></textarea>
      </MyDialog>

      <MyDialog
        id="my_modal_1"
        title="Form Edit Task"
        :action="store.saveTasks"
        buttonTitle1="Save"
        buttonTitle2="Cancel"
      >
        <div class="flex flex-col">
          <select
            v-model="store.taskCount"
            class="select select-bordered w-full max-w-xs text-black dark:text-white"
          >
            <option disabled value="">How many tasks?</option>
            <option v-for="i in 10" :key="i" :value="i">
              {{ i }}
            </option>
          </select>
        </div>
        <div v-for="count in store.taskCount" :key="count" class="">
          <Input
            :placeholder="`Task ${count}`"
            :modelValue="store.tempTasks[count as number - 1]?.name || ''"
            @update:modelValue="
              (val) => {
                if (!store.tempTasks[count as number - 1]) {
                  store.tempTasks[count as number - 1] = { name: val }
                } else {
                  store.tempTasks[count as number - 1].name = val
                }
              }
            "
          />
        </div>
      </MyDialog>
    </div>

    <MyToast :isSuccess="store.isSuccess" :message="store.message" />
  </section>
</template>
<script setup lang="ts">
import type { AirdropsType } from "~/types"
import { useMyAirdrop } from "~/stores/myAirdrop"

const store = useMyAirdrop()

const route = useRoute()
const router = useRouter()
const title = ref<string>("Wait")

const filteredAirdrop = computed(() => {
  return store.airdrops.filter((item) => item.id === route.params.slug)
})

onMounted(() => {
  store.fetchAirdrops()
  setTimeout(() => {
    title.value = filteredAirdrop.value[0]?.name
  }, 500)
})
</script>
<style></style>
