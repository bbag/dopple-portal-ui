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

import { IconCircle, IconCircleCheck, IconX } from '@tabler/icons-vue'

const totalCols = computed(() => properties.value.reduce(
  (total, property) => total + property.options.length, 1
))

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

function handleCellToggle(category: string, itemId: string, option: IPropertyOption) {
  let item = option[category].find((item) => item[itemId])
  if (!item) {
    option[category].push({ [itemId]: 'allowed' })
  } else if (item[itemId] === 'allowed') {
    item[itemId] = 'blocked'
  } else if (item[itemId] === 'blocked') {
    item[itemId] = 'unset'
  } else if (item[itemId] === 'unset') {
    item[itemId] = 'allowed'
  }
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
        hotspots: [
          { 'hotspot_a1a1a1': 'allowed' },
          { 'hotspot_b2b2b2': 'blocked' },
        ],
        models: [
          { 'model_a1a1a1': 'allowed' },
          { 'model_b2b2b2': 'blocked' },
        ]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Smart Base',
        hotspots: [
          { 'hotspot_c3c3c3': 'allowed' },
        ],
        models: [
          { 'model_a1a1a1': 'allowed' },
          { 'model_b2b2b2': 'blocked' },
        ]
      },
    ],
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
        models: [
          { 'model_a1a1a1': 'blocked' },
          { 'model_b2b2b2': 'allowed' },
        ]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Balance',
        hotspots: [
          { 'hotspot_b2b2b2': 'allowed' },
        ],
        models: [
          { 'model_a1a1a1': 'blocked' },
          { 'model_b2b2b2': 'allowed' },
        ]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Firm',
        hotspots: [],
        models: [
          { 'model_a1a1a1': 'blocked' },
          { 'model_b2b2b2': 'allowed' },
        ]
      },
      {
        id: self.crypto.randomUUID(),
        name: 'Hybrid',
        hotspots: [
          { 'hotspot_a1a1a1': 'blocked' },
          { 'hotspot_c3c3c3': 'allowed' },
        ],
        models: [
          { 'model_a1a1a1': 'blocked' },
          { 'model_b2b2b2': 'allowed' },
        ]
      },
    ],
  },
])

interface IHotspot {
  id: string
  positions: { name: string, x: number, y: number, z: number }[]
}

const hotspots = ref<IHotspot[]>([
  {
    id: 'hotspot_a1a1a1',
    positions: [
      { name: 'default', x: 0, y: 0, z: 0 },
      { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 },
    ]
  },
  {
    id: 'hotspot_b2b2b2',
    positions: [
      { name: 'default', x: 0, y: 0, z: 0 },
      { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 },
    ]
  },
  {
    id: 'hotspot_c3c3c3',
    positions: [
      { name: 'default', x: 0, y: 0, z: 0 },
      { name: 'pillow_hotspot', x: 0.5, y: 0.5, z: 0.5 },
    ]
  }
])

interface IModel {
  id: string
  name: string
  filename: string
  path: string
  positions: { name: string, x: number, y: number, z: number }[]
  rotations: { name: string, x: number, y: number, z: number }[]
  scales: { name: string, x: number, y: number, z: number }[]
  nodes: string[]
  variants: string[]
  animations: string[]
  cameras: string[]
}

const models = ref<IModel[]>([
  {
    id: 'model_a1a1a1',
    name: 'base',
    filename: 'base_model.gltf',
    path: '/assets/base/',
    positions: [
      { name: 'default', x: 0, y: 0, z: 0 },
    ],
    rotations: [
      { name: 'default', x: 0, y: 0, z: 0 },
    ],
    scales: [
      { name: 'default', x: 0, y: 0, z: 0 },
    ],
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
    name: 'duvet',
    filename: 'duvet_model.gltf',
    path: '/assets/duvet/',
    positions: [
      { name: 'default', x: 0, y: 0, z: 0 },
    ],
    rotations: [
      { name: 'default', x: 0, y: 0, z: 0 },
    ],
    scales: [
      { name: 'default', x: 0, y: 0, z: 0 },
    ],
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
  },
])

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

function calcCellValue(category: string, itemId: string, option: IPropertyOption) {
  const items = option[category]?.find((item) => item[itemId])

  if (!items || items[itemId] === 'unset') return h(IconCircle, { class: 'text-slate-300 w-5 h-5' })

  return items[itemId] === 'allowed'
    ? h(IconCircleCheck, { class: 'text-green-500 w-5 h-5'})
    : h(IconX, { class: 'text-rose-500 w-5 h-5'})
}
</script>

<template>
  <div class="bg-muted overflow-x-auto p-4">
    <Sheet>
      <table class="config-matrix-table text-sm">
        <thead>
          <tr>
            <th></th>
            <th
              v-for="property in properties"
              :key="property.id"
              :colspan="property.options.length">
              {{ property.name }}

              <SheetTrigger as-child>
                <Button
                  size="xs"
                  variant="outline"
                  class="ml-2"
                  @click="handleEditProperty(property)">
                  Edit
                </Button>
              </SheetTrigger>
            </th>
          </tr>
          <tr>
            <td>Options:</td>
            <template
              v-for="property in properties"
              :key="property.id">
              <td
                v-for="option in property.options"
                :key="option.id"
                data-vertical>
                {{ option.name || '-' }}
              </td>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :colspan="totalCols" class="font-bold bg-slate-500">Hotspots</td>
          </tr>
          <tr v-for="hotspot in hotspots" :key="hotspot.id">
            <td class="font-mono">{{ hotspot.id }}</td>
            <template
              v-for="property in properties"
              :key="property.id">
              <td
                v-for="option in property.options"
                :key="option.id"
                class="text-center">
                <button @click="handleCellToggle('hotspots', hotspot.id, option)">
                  <component :is="calcCellValue('hotspots', hotspot.id, option)" />
                </button>
              </td>
            </template>
          </tr>
          <tr>
            <td :colspan="totalCols" class="font-bold bg-slate-500">Models</td>
          </tr>
          <tr v-for="model in models" :key="model.id">
            <td class="font-mono">{{ model.name }}</td>
            <template
              v-for="property in properties"
              :key="property.id">
              <td
                v-for="option in property.options"
                :key="option.id"
                class="text-center">
                <button @click="handleCellToggle('models', model.id, option)">
                  <component :is="calcCellValue('models', model.id, option)" />
                </button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
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
            <li v-for="option in currentProperty.options" :key="option.id">
              <Input v-model="option.name" />
            </li>
          </ul>
          <Button variant="outline" @click="handleAddNewOption"> Add New Option </Button>
          <Separator />
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit"> Save </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>

<style scoped>
.config-matrix-table th,
.config-matrix-table td {
  @apply p-2 border bg-white;
}

.config-matrix-table td[colspan] {
  @apply bg-slate-50
}

[data-vertical] {
  @apply rounded-sm px-1 py-2 text-xs rotate-180;
  writing-mode: vertical-lr;
}
</style>
