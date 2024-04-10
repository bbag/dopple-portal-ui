import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IWorkspace {
  name: string
}

export const useWorkspacesStore = defineStore('workspaces', () => {
  const workspaces = ref<IWorkspace[]>([
    { name: 'crate-barrel-assets' },
    { name: 'demo-assets' },
    { name: 'rh-assets' },
    { name: 'test-workspace' }
  ])

  return { workspaces }
})
