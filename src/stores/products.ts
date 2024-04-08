import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IProduct {
  id: string
  title: string
  name: string
  workspace: string
  status: 'draft' | 'published'
  label: string
  dateModified: Date
  models: string[]
  versions: IVersion[]
  hotspots: IHotspot[]
}

export interface IHotspot {
  name: string
  title: string
  position: { x: number; y: number; z: number }
}

export interface IVersion {
  isDefault: boolean
  draftRevision: number
  published: number
  dateCreated: Date
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<IProduct[]>([
    {
      id: '1c43f733-457c-48ce-a5be-9c43aa5d296d',
      title: 'Motorcycle',
      name: 'arrow_motorcycle',
      workspace: 'demo-assets',
      status: 'published',
      label: 'demo',
      dateModified: new Date('2024-04-03T13:01:51'),
      models: ['0wRtfJqUrw', 'bIEoS3Ad9g'],
      versions: [
        {
          isDefault: false,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftRevision: 2,
          published: 2,
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: true,
          draftRevision: 3,
          published: 3,
          dateCreated: new Date('2024-03-21T02:54:40')
        }
      ],
      hotspots: [
        { name: 'motor', title: 'Motor', position: { x: 0.5, y: 0.5, z: 0 } },
        { name: 'suspension', title: 'Suspension', position: { x: 0.5, y: 0.5, z: 0.5 } },
        { name: 'handlebars', title: 'Handlebars', position: { x: 0.5, y: 0.5, z: 1 } },
        { name: 'tire_front', title: 'Front Tire', position: { x: 0.5, y: 0.5, z: 1.5 } },
        { name: 'tire_rear', title: 'Rear Tire', position: { x: 0.5, y: 0.5, z: 2 } }
      ]
    },
    {
      id: '903da72b-eda9-42d1-911e-6f0570c9df26',
      title: 'Purse',
      name: 'arrow_purse',
      workspace: 'demo-assets',
      status: 'published',
      label: 'demo',
      dateModified: new Date('2024-04-02T12:08:59'),
      models: ['7fC431d8dB'],
      versions: [
        {
          isDefault: false,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        },
        {
          isDefault: false,
          draftRevision: 2,
          published: 2,
          dateCreated: new Date('2024-03-19T08:29:34')
        },
        {
          isDefault: false,
          draftRevision: 3,
          published: 3,
          dateCreated: new Date('2024-03-21T12:54:40')
        },
        {
          isDefault: false,
          draftRevision: 4,
          published: 4,
          dateCreated: new Date('2024-03-21T12:57:51')
        },
        {
          isDefault: true,
          draftRevision: 5,
          published: 5,
          dateCreated: new Date('2024-03-26T20:03:27')
        }
      ],
      hotspots: []
    },
    {
      id: '1000d50a-1940-42e7-9f0c-4dfbcf322f76',
      title: 'Leather Jacket',
      name: 'leather_jacket',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-03-29T20:03:27'),
      models: ['F0601aA92d'],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Boat',
      name: 'arrow_boat',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-03-29T18:40:03'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Restoration Hardware - Couch',
      name: 'rh-couch',
      workspace: 'rh-assets',
      status: 'published',
      label: 'client',
      dateModified: new Date('2024-03-26T08:27:31'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Crate & Barrel Table',
      name: 'crate-barrel-demo',
      workspace: 'crate-barrel-assets',
      status: 'published',
      label: 'client',
      dateModified: new Date('2024-03-12T17:16:44'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Bike',
      name: 'arrow_bicycle_mvp',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-03-07T23:58:21'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Luggage',
      name: 'arrow_luggage',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-02-14T12:34:56'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Mixer',
      name: 'arrow_mixer',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-02-12T09:36:50'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Sofa',
      name: 'arrow_sofa',
      workspace: 'test-workspace',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-02-09T20:05:15'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Sneaker',
      name: 'arrow_sneaker',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-01-30T13:02:45'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Ring',
      name: 'arrow_ring',
      workspace: 'test-workspace',
      status: 'published',
      label: 'demo',
      dateModified: new Date('2024-01-30T13:01:51'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Guitar',
      name: 'arrow_guitar',
      workspace: 'test-workspace',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-01-30T12:58:19'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Power Saw',
      name: 'arrow_saw',
      workspace: 'test-workspace',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2024-01-29T17:04:30'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Watch',
      name: 'arrow_watch',
      workspace: 'demo-assets',
      status: 'published',
      label: 'demo',
      dateModified: new Date('2024-01-11T11:22:33'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Helmet',
      name: 'arrow_helmet',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2023-12-25T07:30:31'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Chair',
      name: 'arrow_chair',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2023-12-04T14:53:00'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    },
    {
      id: '',
      title: 'Golf Caddy',
      name: 'golf_caddy',
      workspace: 'demo-assets',
      status: 'draft',
      label: 'demo',
      dateModified: new Date('2023-11-27T14:01:28'),
      models: [],
      versions: [
        {
          isDefault: true,
          draftRevision: 1,
          published: 1,
          dateCreated: new Date('2024-02-12T11:04:11')
        }
      ],
      hotspots: []
    }
  ])

  function getProductTitle(name: string | string[], workspace: string | string[]) {
    const product = products.value.find((p) => p.name === name && p.workspace === workspace)
    return product?.title
  }

  return { getProductTitle, products }
})
