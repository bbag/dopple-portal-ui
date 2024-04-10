import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IWorkspace {
  name: string
  dateModified: Date
}

export const useWorkspacesStore = defineStore('workspaces', () => {
  const workspaces = ref<IWorkspace[]>([
    {
      name: 'crate-barrel-assets',
      dateModified: new Date('2024-03-29T08:16:47')
    },
    {
      name: 'demo-assets',
      dateModified: new Date('2024-04-10T12:52:09')
    },
    {
      name: 'rh-assets',
      dateModified: new Date('2024-03-28T15:39:20')
    },
    {
      name: 'test-workspace',
      dateModified: new Date('2024-04-09T11:04:11')
    }
  ])

  return { workspaces }
})
