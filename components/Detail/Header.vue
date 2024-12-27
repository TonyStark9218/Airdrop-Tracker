<template>
  <div class="md:my-12 flex justify-between pb-4">
    <div>
      <div class="text-2xl font-bold flex gap-3 items-center">
        <h1>
          {{ props.item.name?.toUpperCase() }}
        </h1>

        <div
          class="tooltip mt-1"
          :data-tip="
            props.item.isFavorite ? 'delete from favorite' : 'add to favorite'
          "
        >
          <Icon
            @click="store.addToFavorite(props.item)"
            :name="props.item.isFavorite ? 'mdi:star' : 'mdi:star-outline'"
            class="cursor-pointer hover:bg-yellow-400"
            :class="props.item.isFavorite ? 'bg-yellow-400' : ''"
            size="30"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="badge badge-info">{{ props.item.type }}</p>
        <div
          v-if="
            props.item.type === 'Testnet Airdrop' ||
            props.item.type === 'Retroactive Airdrop'
          "
        >
          <div class="flex gap-2">
            <a
              :href="props.item.details.officialWebsite"
              target="_blank"
              class="flex items-center gap-2"
            >
              <Icon name="mdi:web" size="20" />
              <span class="hover:text-blue-500">Offical Website</span>
            </a>
            <div class="tooltip mt-1" data-tip="Edit offical website link">
              <button @click="store.openOfficalWebsiteDialog(props.item)">
                <Icon
                  name="mdi:square-edit-outline"
                  size="18"
                  class="hover:text-blue-500"
                />
              </button>
            </div>
          </div>
          <div v-if="props.item.type === 'Testnet Airdrop'" class="flex gap-2">
            <a
              :href="props.item.details.faucetUrl"
              target="_blank"
              class="flex items-center gap-2"
            >
              <Icon name="mdi:dollar" size="20" />
              <span class="hover:text-blue-500">Faucet</span>
            </a>
            <div class="tooltip mt-1" data-tip="Edit faucet link">
              <button @click="store.openFaucetDialog(props.item)">
                <Icon
                  name="mdi:square-edit-outline"
                  size="18"
                  class="hover:text-blue-500"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gap-2 mt-[5px]">
      <p class="badge badge-info">
        {{ props.item.blockchain?.toUpperCase() }}
      </p>
    </div>
  </div>
  <MyDialog
    id="my_modal_3"
    title="Form Edit Official Website"
    :action="() => store.saveOfficialWebsite(props.item)"
    buttonTitle1="Save"
    buttonTitle2="Cancel"
  >
    <Input
      placeholder="Official Website (Ex:https://example.com)"
      :modelValue="store.airdrop.details.officialWebsite"
      @update:modelValue="store.airdrop.details.officialWebsite = $event"
    />
  </MyDialog>
  <MyDialog
    id="my_modal_4"
    title="Form Edit Faucet Url"
    :action="() => store.saveFaucetUrl(props.item)"
    buttonTitle1="Save"
    buttonTitle2="Cancel"
  >
    <Input
      placeholder="Faucet Url (Ex:https://example.com)"
      :modelValue="store.airdrop.details.faucetUrl"
      @update:modelValue="store.airdrop.details.faucetUrl = $event"
    />
  </MyDialog>

  <MyToast :isSuccess="store.isSuccess" :message="store.message" />
</template>
<script setup lang="ts">
import type { AirdropsType } from "~/types"
import { useMyAirdrop } from "~/stores/myAirdrop"

const store = useMyAirdrop()

const props = defineProps<{
  item: AirdropsType
}>()
</script>
<style lang=""></style>
