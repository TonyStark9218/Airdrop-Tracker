import type { FilterType } from "~/types"
import { reactive } from "vue"

export const filterByType = reactive<FilterType[]>([
  {
    id: 1,
    name: "All",
    active: true,
  },
  {
    id: 2,
    name: "Testnet Airdrop",
    active: false,
  },
  {
    id: 3,
    name: "Retroactive Airdrop",
    active: false,
  },
  {
    id: 4,
    name: "Telegram Airdrop",
    active: false,
  },
  {
    id: 5,
    name: "Node Airdrop",
    active: false,
  },
])
