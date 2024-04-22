<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const cols = ref([
  {
    id: self.crypto.randomUUID(),
    i: 1,
    name: 'arch',
    options: [
      { id: self.crypto.randomUUID(), name: 'standard' },
      { id: self.crypto.randomUUID(), name: 'skill' },
      { id: self.crypto.randomUUID(), name: 'superskill' }
    ],
    hotspots: []
  },
  {
    id: self.crypto.randomUUID(),
    i: 2,
    name: 'size',
    options: [
      { id: self.crypto.randomUUID(), name: 'xsmall' },
      { id: self.crypto.randomUUID(), name: 'small' },
      { id: self.crypto.randomUUID(), name: 'medium' },
      { id: self.crypto.randomUUID(), name: 'large' },
      { id: self.crypto.randomUUID(), name: 'xlarge' },
      { id: self.crypto.randomUUID(), name: '2x' },
      { id: self.crypto.randomUUID(), name: '3x' }
    ],
    hotspots: []
  },
  {
    id: self.crypto.randomUUID(),
    i: 3,
    name: 'ribProtection',
    options: [
      { id: self.crypto.randomUUID(), name: 'none' },
      { id: self.crypto.randomUUID(), name: 'ribGuard' },
      { id: self.crypto.randomUUID(), name: 'beltRibL' },
      { id: self.crypto.randomUUID(), name: 'ribGuard+beltRibL' }
    ],
    hotspots: []
  },
  {
    id: self.crypto.randomUUID(),
    i: 4,
    name: 'cup',
    options: [
      { id: self.crypto.randomUUID(), name: 'none' },
      { id: self.crypto.randomUUID(), name: 'standard' },
      { id: self.crypto.randomUUID(), name: 'skill' },
      { id: self.crypto.randomUUID(), name: 'superskill' }
    ],
    hotspots: []
  },
  {
    id: self.crypto.randomUUID(),
    i: 5,
    name: 'epaulet',
    options: [
      { id: self.crypto.randomUUID(), name: 'none' },
      { id: self.crypto.randomUUID(), name: 'standard' },
      { id: self.crypto.randomUUID(), name: 'skill' },
      { id: self.crypto.randomUUID(), name: 'superskill' }
    ],
    hotspots: []
  }
])

const hotspots = ref([
  { id: self.crypto.randomUUID(), name: 'backPlateHotspot' },
  { id: self.crypto.randomUUID(), name: 'cupHotspot' },
  { id: self.crypto.randomUUID(), name: 'shoulderDecalHotspot' }
])

const models = ref([
  {
    id: self.crypto.randomUUID(),
    name: 'pads',
    path: '/assets/padsvariants/',
    filename: 'model.gltf'
  },
  {
    id: self.crypto.randomUUID(),
    name: 'car',
    path: '/assets/padsvariants/',
    filename: 'model.gltf'
  },
  {
    id: self.crypto.randomUUID(),
    name: 'car2',
    path: '/assets/padsvariants/',
    filename: 'model.gltf'
  }
])
</script>

<template>
  <div class="bg-white overflow-x-auto">
    <table class="config-matrix-table">
      <thead>
        <tr>
          <td class="font-bold">
            Configuration
            <br />
            <div class="text-xs text-rose-600 bg-rose-600/10 p-2 mt-1 rounded">
              <em>STILL A SUPER WORK-IN-PROGRESS!</em>
            </div>
          </td>
          <td v-for="col in cols" :key="col.id">
            <Input size="sm" type="number" v-model="col.i" />
            <Input size="sm" type="text" v-model="col.name" />
          </td>
        </tr>
        <tr>
          <td>
            Add Choice
            <Input size="sm" type="text" />
          </td>
          <td v-for="col in cols" :key="col.id">
            Add Option
            <Input size="sm" type="text" />
          </td>
        </tr>
        <tr>
          <td>
            <Button size="xs" variant="outline">Reset</Button>
            <Button size="xs" variant="outline">Save</Button>
            <Button size="xs" variant="outline">Download</Button>
            <Button size="xs" variant="outline">Upload</Button>
            <br />
            <input size="sm" type="file" />
          </td>
          <td v-for="col in cols" :key="col.id" class="whitespace-nowrap space-x-2">
            <input
              data-vertical
              class="[writing-mode:vertical-lr]"
              size="sm"
              type="text"
              v-for="option in col.options"
              :key="option.id"
              v-model="option.name"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="font-bold">Hotspots</td>
          <td></td>
        </tr>
        <tr v-for="hotspot in hotspots" :key="hotspot.id">
          <td>{{ hotspot.name }}</td>
          <td v-for="col in cols" :key="col.id">X</td>
        </tr>
        <tr>
          <td class="font-bold">Models</td>
          <td></td>
        </tr>
        <tr v-for="model in models" :key="model.id">
          <td>{{ model.name }}</td>
          <td v-for="col in cols" :key="col.id">X</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.config-matrix-table th,
.config-matrix-table td {
  @apply p-2;
  vertical-align: top;
}

input[data-vertical] {
  @apply rounded-sm border border-input bg-background px-1 py-2 text-xs rotate-180 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75;
}
</style>
