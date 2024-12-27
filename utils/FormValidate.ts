import type { AirdropsType, ErrorsType, Tasks } from "~/types"

export const FormValidate = (
  errors: ErrorsType,
  airdrops: AirdropsType,
  taskCount: number | string | null
) => {
  let valid = true

  errors.name = ""
  errors.type = ""
  errors.potency = ""
  errors.blockchain = ""
  errors.taskCount = ""
  errors.tasks = []
  errors.details = ""

  if (!airdrops.name) {
    errors.name = "Airdrop name is required"
    valid = false
  }

  if (!airdrops.type) {
    errors.type = "Airdrop type is required"
    valid = false
  }

  if (!airdrops.potency) {
    errors.potency = "Airdrop potency is required"
    valid = false
  }

  if (!airdrops.blockchain) {
    errors.blockchain = "Airdrop blockchain is required"
    valid = false
  }

  if (!taskCount) {
    errors.taskCount = "You must specify the number of tasks"
    valid = false
  }

  if (airdrops.type === "Testnet Airdrop") {
    if (!airdrops.details.faucetUrl || !airdrops.details.officialWebsite) {
      valid = false
      errors.details = "All fields for Testnet Airdrop must be filled."
      return
    }
  }

  if (airdrops.type === "Retroactive Airdrop") {
    if (!airdrops.details.officialWebsite) {
      valid = false
      errors.details =
        "Official Website for Retroactive Airdrop must be filled."
      return
    }
  }

  airdrops.tasks.forEach((task: Tasks, index: number) => {
    if (!task || !task.name) {
      // Tambahkan validasi `task.name`
      errors.tasks[index] = `Task ${index + 1} is required`
      valid = false
    } else {
      errors.tasks[index] = "" // Bersihkan error jika valid
    }
  })

  return valid
}
