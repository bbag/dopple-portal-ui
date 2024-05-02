<script setup lang="ts">
import { computed, h, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import { IconCircle, IconCircleCheck, IconPencil, IconTrash, IconX } from '@tabler/icons-vue'

const totalCols = computed(() =>
  properties.value.reduce((total, property) => total + property.options.length, 1)
)

interface IProperty {
  id: string
  i: number
  name: string
  options: IPropertyOption[]
}

interface IPropertyOption {
  id: string
  name: string
  hotspots: { [key: string]: string }[]
  models: { [key: string]: string }[]
}

const properties = ref<IProperty[]>([
  {
    id: self.crypto.randomUUID(),
    i: 1,
    name: 'Bed Base',
    options: [
      {
        id: self.crypto.randomUUID(),
        name: 'Regular',
        hotspots: [{ hotspot_a1a1a1: 'allowed' }, { hotspot_b2b2b2: 'blocked' }],
        models: [{ model_a1a1a1: 'allowed' }, { model_b2b2b2: 'blocked' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Smart Base',
        hotspots: [{ hotspot_c3c3c3: 'allowed' }],
        models: [{ model_a1a1a1: 'allowed' }, { model_b2b2b2: 'blocked' }]
      }
    ]
  },
  {
    id: self.crypto.randomUUID(),
    i: 2,
    name: 'Mattress',
    options: [
      {
        id: self.crypto.randomUUID(),
        name: 'None',
        hotspots: [],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Balance',
        hotspots: [{ hotspot_b2b2b2: 'allowed' }],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Firm',
        hotspots: [],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Hybrid',
        hotspots: [{ hotspot_a1a1a1: 'blocked' }, { hotspot_c3c3c3: 'allowed' }],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      }
    ]
  },
  {
    id: self.crypto.randomUUID(),
    i: 3,
    name: 'Mattress Cover',
    options: [
      {
        id: self.crypto.randomUUID(),
        name: 'Hide',
        hotspots: [],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Show',
        hotspots: [{ hotspot_b2b2b2: 'allowed' }],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      }
    ]
  },
  {
    id: self.crypto.randomUUID(),
    i: 4,
    name: 'Blend Pillow',
    options: [
      {
        id: self.crypto.randomUUID(),
        name: 'Hide',
        hotspots: [{ hotspot_b2b2b2: 'blocked' }],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Show',
        hotspots: [],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      }
    ]
  },
  {
    id: self.crypto.randomUUID(),
    i: 5,
    name: 'Cervical Gel Pillow',
    options: [
      {
        id: self.crypto.randomUUID(),
        name: 'Hide',
        hotspots: [{ hotspot_b2b2b2: 'blocked' }],
        models: [{ model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Show',
        hotspots: [],
        models: [{ model_a1a1a1: 'blocked' }]
      }
    ]
  },
  {
    id: self.crypto.randomUUID(),
    i: 4,
    name: 'Cervical Lavendar Pillow',
    options: [
      {
        id: self.crypto.randomUUID(),
        name: 'Hide',
        hotspots: [{ hotspot_b2b2b2: 'blocked' }],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Show',
        hotspots: [],
        models: [{ model_a1a1a1: 'blocked' }, { model_b2b2b2: 'allowed' }]
      }
    ]
  }
])

interface IHotspot {
  id: string
  isExpanded: boolean
  name: string
  positions: { name: string; x: number; y: number; z: number }[]
}

interface IModel {
  id: string
  isExpanded: boolean
  name: string
  filename: string
  path: string
  positions: { name: string; x: number; y: number; z: number }[]
  rotations: { name: string; x: number; y: number; z: number }[]
  scales: { name: string; x: number; y: number; z: number }[]
  nodes: string[]
  variants: string[]
  animations: string[]
  cameras: string[]
}

const tableSections = ref([
  {
    name: 'Hotspots',
    items: [
      {
        id: 'hotspot_a1a1a1',
        isExpanded: true,
        name: 'hotspot1',
        positions: [
          { name: 'default', x: 0, y: 0, z: 0 },
          { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 }
        ]
      },
      {
        id: 'hotspot_b2b2b2',
        isExpanded: true,
        name: 'hotspot2',
        positions: [
          { name: 'default', x: 0, y: 0, z: 0 },
          { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 }
        ]
      },
      {
        id: 'hotspot_c3c3c3',
        isExpanded: true,
        name: 'hotspot3',
        positions: [
          { name: 'default', x: 0, y: 0, z: 0 },
          { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 }
        ]
      }
    ]
  },
  {
    name: 'Models',
    items: [
      {
        id: 'model_a1a1a1',
        isExpanded: true,
        name: 'base',
        filename: 'base_model.gltf',
        path: '/assets/base/',
        positions: [{ name: 'default', x: 0, y: 0, z: 0 }],
        rotations: [{ name: 'default', x: 0, y: 0, z: 0 }],
        scales: [{ name: 'default', x: 0, y: 0, z: 0 }],
        nodes: [
          'base-regular',
          'base-electric-frame',
          'base-topper',
          'mattress-firm',
          'mattress-balance',
          'mattress-hybrid',
          'mattress-cover',
          'pillow-blend',
          'pillow-gel',
          'pillow-lavendar'
        ],
        variants: [],
        animations: [],
        cameras: []
      },
      {
        id: 'model_b2b2b2',
        isExpanded: true,
        name: 'duvet',
        filename: 'duvet_model.gltf',
        path: '/assets/duvet/',
        positions: [{ name: 'default', x: 0, y: 0, z: 0 }],
        rotations: [{ name: 'default', x: 0, y: 0, z: 0 }],
        scales: [{ name: 'default', x: 0, y: 0, z: 0 }],
        nodes: [
          'duvet',
          'duvet-pillowcase01',
          'duvet-pillowcase02',
          'duvet-zipper',
          'comforter-mulberry'
        ],
        variants: [],
        animations: [],
        cameras: []
      }
    ]
  }
])

// const hotspots = ref<IHotspot[]>([
//   {
//     id: 'hotspot_a1a1a1',
//     isExpanded: true,
//     name: 'hotspot1',
//     positions: [
//       { name: 'default', x: 0, y: 0, z: 0 },
//       { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 }
//     ]
//   },
//   {
//     id: 'hotspot_b2b2b2',
//     isExpanded: true,
//     name: 'hotspot2',
//     positions: [
//       { name: 'default', x: 0, y: 0, z: 0 },
//       { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 }
//     ]
//   },
//   {
//     id: 'hotspot_c3c3c3',
//     isExpanded: true,
//     name: 'hotspot3',
//     positions: [
//       { name: 'default', x: 0, y: 0, z: 0 },
//       { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 }
//     ]
//   }
// ])

// const models = ref<IModel[]>([
//   {
//     id: 'model_a1a1a1',
//     isExpanded: true,
//     name: 'base',
//     filename: 'base_model.gltf',
//     path: '/assets/base/',
//     positions: [{ name: 'default', x: 0, y: 0, z: 0 }],
//     rotations: [{ name: 'default', x: 0, y: 0, z: 0 }],
//     scales: [{ name: 'default', x: 0, y: 0, z: 0 }],
//     nodes: [
//       'base-regular',
//       'base-electric-frame',
//       'base-topper',
//       'mattress-firm',
//       'mattress-balance',
//       'mattress-hybrid',
//       'mattress-cover',
//       'pillow-blend',
//       'pillow-gel',
//       'pillow-lavendar'
//     ],
//     variants: [],
//     animations: [],
//     cameras: []
//   },
//   {
//     id: 'model_b2b2b2',
//     isExpanded: true,
//     name: 'duvet',
//     filename: 'duvet_model.gltf',
//     path: '/assets/duvet/',
//     positions: [{ name: 'default', x: 0, y: 0, z: 0 }],
//     rotations: [{ name: 'default', x: 0, y: 0, z: 0 }],
//     scales: [{ name: 'default', x: 0, y: 0, z: 0 }],
//     nodes: [
//       'duvet',
//       'duvet-pillowcase01',
//       'duvet-pillowcase02',
//       'duvet-zipper',
//       'comforter-mulberry'
//     ],
//     variants: [],
//     animations: [],
//     cameras: []
//   }
// ])

const currentProperty = ref(properties.value[0])

function handleEditProperty(property: IProperty) {
  currentProperty.value = property
}

function handleAddNewOption() {
  currentProperty.value.options.push({
    id: self.crypto.randomUUID(),
    name: '',
    hotspots: [],
    models: []
  })
}

function handleCellToggle(category: string, itemId: string, option: IPropertyOption) {
  let item = option[category.toLowerCase()].find((item) => item[itemId])
  if (!item) {
    option[category.toLowerCase()].push({ [itemId]: 'allowed' })
  } else if (item[itemId] === 'allowed') {
    item[itemId] = 'blocked'
  } else if (item[itemId] === 'blocked') {
    item[itemId] = 'unset'
  } else if (item[itemId] === 'unset') {
    item[itemId] = 'allowed'
  }
}

function calcCellValue(category: string, itemId: string, option: IPropertyOption) {
  const items = option[category.toLowerCase()]?.find((item) => item[itemId])

  if (!items || items[itemId] === 'unset') return h(IconCircle, { class: 'text-slate-300 w-5 h-5' })

  return items[itemId] === 'allowed'
    ? h(IconCircleCheck, { class: 'text-green-500 w-5 h-5' })
    : h(IconX, { class: 'text-rose-500 w-5 h-5' })
}
</script>

<template>
  <div class="bg-muted overflow-x-auto p-4">
    <div class="w-max text-xs text-rose-600 bg-rose-600/10 px-3 py-2 mb-4 rounded">
      <em>THIS IS JUST A PLACEHOLDER SCREEN — IT'S STILL A *HEAVY* WORK-IN-PROGRESS!</em>
    </div>
    <table class="config-matrix-table text-sm">
      <thead>
        <Sheet>
          <tr>
            <th class="min-w-48"></th>
            <th
              v-for="property in properties"
              :key="property.id"
              :colspan="property.options.length"
            >
              <span class="flex items-center gap-4 whitespace-nowrap">
                {{ property.name }}
                <SheetTrigger as-child>
                  <Button size="xs" variant="outline" @click="handleEditProperty(property)">
                    Edit
                  </Button>
                </SheetTrigger>
              </span>
            </th>
          </tr>
          <tr>
            <td>Options:</td>
            <template v-for="property in properties" :key="property.id">
              <td
                v-for="option in property.options"
                :key="option.id"
                class="align-bottom text-center"
              >
                <span data-vertical>{{ option.name || '-' }}</span>
              </td>
            </template>
          </tr>

          <!-- Sheet: edit property settings -->
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit {{ currentProperty.name }}</SheetTitle>
              <SheetDescription>
                Make changes to your property here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <Label> Property Name: </Label>
              <Input id="name" v-model="currentProperty.name" />
              <Label> Options: </Label>
              <ul class="grid gap-2">
                <li
                  v-for="option in currentProperty.options"
                  :key="option.id"
                  class="flex gap-2 items-center"
                >
                  <Input v-model="option.name" />
                  <Button size="icon" variant="ghost" class="shrink-0">
                    <IconTrash class="w-5 h-5" />
                  </Button>
                </li>
              </ul>
              <Button variant="secondary" @click="handleAddNewOption"> Add New Option </Button>
              <Separator />
            </div>
            <SheetFooter>
              <SheetClose as-child>
                <Button type="submit"> Save </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </thead>

      <!-- Table Sections -->
      <template v-for="section in tableSections" :key="section.name">
        <Sheet>
          <tbody>
            <tr>
              <td :colspan="totalCols" data-section-header>
                {{ section.name }}
                <SheetTrigger as-child>
                  <Button size="sm" variant="outline" class="ml-2">Edit</Button>
                </SheetTrigger>
              </td>
            </tr>
          </tbody>
          <template v-for="item in section.items" :key="item.id">
            <tbody>
              <tr>
                <td class="font-mono !p-0" :colspan="totalCols" data-row-header>
                  <button class="w-full p-2 text-left" @click="item.isExpanded = !item.isExpanded">
                    {{ item.name }}
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-show="item.isExpanded">
              <tr>
                <td data-row-label>Visibility</td>
                <template v-for="property in properties" :key="property.id">
                  <td v-for="option in property.options" :key="option.id" class="text-center">
                    <button @click="handleCellToggle(section.name, item.id, option)">
                      <component :is="calcCellValue(section.name, item.id, option)" />
                    </button>
                  </td>
                </template>
              </tr>
            </tbody>
          </template>

          <!-- Sheet: edit section items -->
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit {{ section.name }}</SheetTitle>
            </SheetHeader>
            <div class="grid gap-4 py-4">
              <div v-for="item in section.items" :key="item.id" class="flex gap-2 items-center">
                <Input v-model="item.name" />
                <Button size="icon" variant="ghost" class="shrink-0">
                  <IconTrash class="w-5 h-5" />
                </Button>
              </div>
              <Button variant="secondary"> Add New </Button>
              <Separator />
            </div>
            <SheetFooter>
              <SheetClose as-child>
                <Button type="submit"> Save </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </template>
    </table>
  </div>
</template>

<style scoped>
th,
td {
  @apply p-2 border bg-white;
}

[data-section-header] {
  @apply bg-transparent font-bold border-none pb-1 pt-4;
}

[data-row-header] {
  @apply bg-slate-50;
}

[data-row-label] {
  @apply pl-8;
}

[data-vertical] {
  @apply text-xs pb-1 rotate-180;
  writing-mode: vertical-lr;
}
</style>
