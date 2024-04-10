import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IClient {
  clientId: string
}

export const useClientStore = defineStore('client', () => {
  const client = ref<IClient>({
    clientId: 'a4cb7e75-86d6-4d5a-87a9-5d31ec035b74'
  })

  return { client }
})
