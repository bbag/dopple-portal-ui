import { ref } from 'vue'
import { defineStore } from 'pinia'

import GenericThumbnail from '@/assets/img/generic.jpg'

export interface IProduct {
  id: String
  shortId: string
  name: string
  workspace: string
  status: 'draft' | 'published'
  thumbnail: string
  dateCreated: Date
  dateModified: Date
  versions: IVersion[]
}

export interface IVersion {
  isDefault: boolean
  draftVersion: number
  published: number
  dateCreated: Date
}

export const useModelsStore = defineStore('models', () => {
  const models = ref<IProduct[]>([
    {
      id: '2aa86839-2bcf-4b67-af24-2d28c74626ce',
      shortId: 'GpS8Jj4lXe',
      name: 'export_final_FINAL(2).gltf',
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
          isDefault: false,
          draftVersion: 3,
          published: 3,
          dateCreated: new Date('2024-03-21T02:54:40')
        },
        {
          isDefault: true,
          draftVersion: 4,
          published: 4,
          dateCreated: new Date('2024-04-03T19:03:28')
        }
      ]
    },
    {
      id: '811c2d67-ef02-41a9-8a40-d4436e364443',
      shortId: 'Y08QG4mOwD',
      name: 'foobar.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-04-02T13:01:51'),
      dateModified: new Date('2024-04-02T13:01:51'),
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    },
    {
      id: '5aab3ff0-5dd3-4650-a49b-1b60557dcb74',
      shortId: 'JXCcuhbekS',
      name: 'example_model.gltf',
      workspace: 'demo-assets',
      status: 'published',
      thumbnail: GenericThumbnail,
      dateCreated: new Date('2024-02-14T09:54:00'),
      dateModified: new Date('2024-02-27T10:02:41'),
      versions: [
        {
          isDefault: true,
          draftVersion: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ]
    }
  ])

  return { models }
})
