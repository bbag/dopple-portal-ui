import { ref } from 'vue'
import { defineStore } from 'pinia'

import GenericThumbnail from '@/assets/img/generic.jpg'

export interface IModel {
  id: string
  shortId: string
  name: string
  workspace: string
  status: 'draft' | 'published'
  thumbnail: string
  dateCreated: Date
  dateModified: Date
  versions: IModelVersion[]
  materials: string[]
}

export interface IModelVersion {
  isDefault: boolean
  draftVersion: number
  published: number
  dateCreated: Date
}

export const useModelsStore = defineStore('models', () => {
  const models = ref<IModel[]>([
    {
      id: 'e2f6385f-7809-426f-aac1-db603028d18e',
      shortId: 'db603028d1',
      name: 'export.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-03-01T18:24:17'),
      dateModified: new Date('2024-04-03T14:21:09'),
      versions: [
        {
          isDefault: false,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftVersion: 2,
          published: 2,
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: true,
          draftVersion: 3,
          published: 3,
          dateCreated: new Date('2024-03-21T02:54:40')
        }
      ],
      materials: ['2d28c74626', '8c3a240b45', '0ee2d924d8']
    }
  ])

  return { models }
})
