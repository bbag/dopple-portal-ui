import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useProductsStore } from '@/stores/products'

export interface IWorkspace {
  name: string
  dateModified: Date
  productCount: number
}

function getProductCount(workspace: string) {
  return useProductsStore().products.filter((p) => p.workspace === workspace).length || 0
}

export const useWorkspacesStore = defineStore('workspaces', () => {
  const currentWorkspace = ref<string>('')

  const workspaces = computed<IWorkspace[]>(() => [
    {
      name: 'crate-barrel-assets',
      dateModified: new Date('2024-03-29T08:16:47'),
      productCount: getProductCount('crate-barrel-assets')
    },
    {
      name: 'demo-assets',
      dateModified: new Date('2024-04-10T12:52:09'),
      productCount: getProductCount('demo-assets')
    },
    {
      name: 'rh-assets',
      dateModified: new Date('2024-03-28T15:39:20'),
      productCount: getProductCount('rh-assets')
    },
    {
      name: 'test-workspace',
      dateModified: new Date('2024-04-09T11:04:11'),
      productCount: getProductCount('test-workspace')
    },
    {
      name: 'empty-workspace',
      dateModified: new Date('2024-04-14T09:22:53'),
      productCount: getProductCount('empty-workspace')
    }
  ])

  function addNewWorkspace(name: string) {
    workspaces.value.push({
      name: name || 'new-workspace',
      dateModified: new Date(),
      productCount: getProductCount(name ? name : 'new-workspace')
    })
  }

  return { addNewWorkspace, currentWorkspace, workspaces }
})
