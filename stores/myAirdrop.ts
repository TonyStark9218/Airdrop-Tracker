import type { AirdropsType, ErrorsType, Tasks } from "~/types"
import { FormValidate } from "~/utils/FormValidate"
import { createUniqueId } from "~/utils/"
import { reactive } from "vue"

export const useMyAirdrop = defineStore("myAirdrop", {
  state: () => ({
    airdrops: [] as AirdropsType[],
    airdrop: {
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
      tasks: [] as Tasks[],
      type: "",
    } as AirdropsType,
    errors: {
      name: "",
      type: "",
      potency: "",
      blockchain: "",
      taskCount: "",
      tasks: [],
      details: "",
    } as ErrorsType,
    tempTasks: [] as Tasks[],
    search: "" as string,
    isSuccess: false as boolean,
    message: "" as string,
    taskCount: "" as string | number | null,
    isError: false as boolean,
  }),
  actions: {
    fetchAirdrops() {
      return (this.airdrops = JSON.parse(
        localStorage.getItem("airdrops") || "[]"
      ))
    },
    removeAirdrop(data: AirdropsType) {
      const existingAirdrops = this.fetchAirdrops()

      const index = existingAirdrops.findIndex(
        (item: AirdropsType) => item.id === data.id
      )

      if (index !== -1) {
        existingAirdrops.splice(index, 1)
        localStorage.setItem("airdrops", JSON.stringify(existingAirdrops))
        this.isSuccess = true
        this.message = "Successfully remove airdrop"
        setTimeout(() => {
          this.isSuccess = false
          this.message = ""
        }, 2000)
        this.airdrop = {
          id: "",
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
      } else {
        console.log(`${data} not found`)
      }

      this.fetchAirdrops()
    },
    submitAirdrop() {
      const router = useRouter()
      if (FormValidate(this.errors, this.airdrop, this.taskCount)) {
        const existingAirdrops = this.fetchAirdrops()

        existingAirdrops.push({
          ...this.airdrop,
          tasks: this.airdrop.tasks.map((task) => ({
            name: task.name,
          })),
        })

        localStorage.setItem("airdrops", JSON.stringify(existingAirdrops))

        this.airdrop.name = ""
        this.airdrop.type = ""
        this.airdrop.potency = ""
        this.airdrop.blockchain = ""
        this.airdrop.tasks = []
        this.airdrop.details = {}
        this.airdrop.notes = ""

        this.taskCount = ""

        this.isSuccess = true
        this.message = "Successfully add airdrop"
        setTimeout(() => {
          router.push("/airdrop-collection")
          this.isSuccess = false
          this.message = ""
        }, 2000)
      } else {
        this.isError = true
        setTimeout(() => {
          this.isError = false

          this.errors.name = ""
          this.errors.type = ""
          this.errors.potency = ""
          this.errors.blockchain = ""
          this.errors.taskCount = ""

          this.errors.tasks = this.errors.tasks.map(() => "")
        }, 2000)
        console.log("form has an error")
      }
    },
    openNotesDialog(itemNotes: string | null) {
      this.airdrop.notes = itemNotes || ""
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement
      modal?.showModal()
    },
    openEditTaskDialog(item: AirdropsType) {
      if (item.tasks && item.tasks.length > 0) {
        this.taskCount = item.tasks.length

        this.tempTasks = item.tasks.map((task: any) => ({ ...task }))
      } else {
        this.taskCount = 1
        this.tempTasks = [{ name: "" }]
      }

      const modal = document.getElementById("my_modal_1") as HTMLDialogElement
      modal?.showModal()
    },
    saveTasks() {
      const route = useRoute()
      this.airdrop.tasks = this.tempTasks.filter(
        (task: any) => task.name.trim() !== ""
      )

      const existingAirdrops = this.fetchAirdrops()
      const index = existingAirdrops.findIndex(
        (airdrop: AirdropsType) => airdrop.id === route.params.slug
      )

      if (index !== -1) {
        existingAirdrops[index].tasks = this.airdrop.tasks
        this.isSuccess = true
        this.message = "Successfully edit tasks"
        setTimeout(() => {
          this.isSuccess = false
          this.message = ""
        }, 2000)
        this.airdrop.tasks = []
        this.taskCount = ""
      }
      localStorage.setItem("airdrops", JSON.stringify(existingAirdrops))
      this.fetchAirdrops()
    },
    saveNotes() {
      const route = useRoute()
      const existingAirdrops = this.fetchAirdrops()

      const index = existingAirdrops.findIndex(
        (airdrop: AirdropsType) => airdrop.id === route.params.slug
      )

      if (index !== -1) {
        existingAirdrops[index].notes = this.airdrop.notes

        this.isSuccess = true
        this.message = "Successfully edit notes"
        setTimeout(() => {
          this.isSuccess = false
          this.message = ""
        }, 2000)
        this.airdrop.notes = ""
      } else {
        console.log("airdrops not found")
      }
      localStorage.setItem("airdrops", JSON.stringify(existingAirdrops))

      this.fetchAirdrops()
    },
    addToFavorite(item: AirdropsType) {
      item.isFavorite = !item.isFavorite

      const airdrops = this.fetchAirdrops()

      const updatedAirdrops = airdrops.map((airdropItem: AirdropsType) =>
        airdropItem.name === item.name ? item : airdropItem
      )

      localStorage.setItem("airdrops", JSON.stringify(updatedAirdrops))
    },
    openOfficalWebsiteDialog(item: AirdropsType) {
      const localItem = reactive<AirdropsType>({ ...item })
      this.airdrop.details.officialWebsite =
        localItem.details.officialWebsite || ""

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement
      modal?.showModal()
    },
    saveOfficialWebsite(item: AirdropsType) {
      const existingAirdrops = JSON.parse(
        localStorage.getItem("airdrops") || "[]"
      )
      const localItem = reactive<AirdropsType>({ ...item })

      const index = existingAirdrops.findIndex(
        (data: any) => data.id === item.id
      )

      if (index !== -1) {
        existingAirdrops[index].details.officialWebsite =
          this.airdrop.details.officialWebsite

        localItem.details.officialWebsite = this.airdrop.details.officialWebsite

        this.isSuccess = true
        this.message = "Successfully edit official website"
        setTimeout(() => {
          this.isSuccess = false
          this.message = ""
        }, 2000)
      } else {
        console.log("error")
      }

      localStorage.setItem("airdrops", JSON.stringify(existingAirdrops))
    },
    openFaucetDialog(item: AirdropsType) {
      const localItem = reactive<AirdropsType>({ ...item })
      this.airdrop.details.faucetUrl = localItem.details.faucetUrl || ""

      const modal = document.getElementById("my_modal_4") as HTMLDialogElement
      modal?.showModal()
    },
    saveFaucetUrl(item: AirdropsType) {
      const existingAirdrops = JSON.parse(
        localStorage.getItem("airdrops") || "[]"
      )
      const localItem = reactive<AirdropsType>({ ...item })

      const index = existingAirdrops.findIndex(
        (data: any) => data.id === item.id
      )

      if (index !== -1) {
        existingAirdrops[index].details.faucetUrl =
          this.airdrop.details.faucetUrl

        localItem.details.faucetUrl = this.airdrop.details.faucetUrl

        this.isSuccess = true
        this.message = "Successfully edit faucet url"
        setTimeout(() => {
          this.isSuccess = false
          this.message = ""
        }, 2000)
      } else {
        console.log("error")
      }

      localStorage.setItem("airdrops", JSON.stringify(existingAirdrops))
    },
    openDialogRemoveConfirmation(item: AirdropsType) {
      this.airdrop = item

      const modal = document.getElementById(
        "confirmation_dialog"
      ) as HTMLDialogElement
      modal?.showModal()
    },
    handleAirdropsImport(event: Event) {
      const input = event.target as HTMLInputElement

      const file = input.files?.[0]
      if (!file) return

      if (file.type !== "application/json") {
        alert("Please upload a valid JSON file.")
        input.value = ""
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)

          if (!Array.isArray(data)) {
            alert("Invalid airdrops data format.")
            input.value = ""
            return
          }

          const existingData = JSON.parse(
            localStorage.getItem("airdrops") || "[]"
          )

          if (JSON.stringify(existingData) === JSON.stringify(data)) {
            alert("The imported data is identical to the existing data.")
            input.value = "" // Reset input
            return
          }

          localStorage.setItem("airdrops", JSON.stringify(data))
          this.fetchAirdrops()
          this.isSuccess = true
          this.message = "Successfully imported data!"

          setTimeout(() => {
            this.isSuccess = false
            this.message = ""
          }, 2000)
        } catch (error) {
          alert("Failed to import airdrops data. Please check the file format.")
        } finally {
          input.value = ""
        }
      }
      reader.readAsText(file)
    },

    exportAirdrops(filename = "airdrops.json") {
      const airdrops = localStorage.getItem("airdrops")

      if (!airdrops) {
        alert("No data found for 'airdrops'!")
        return
      }

      const blob = new Blob([airdrops], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
  },
})
