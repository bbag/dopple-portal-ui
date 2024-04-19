<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, type ICamera } from '@/stores/products'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import CamerasLockedLines from '@/components/sections/product-cameras/CamerasLockedLines.vue'

import { IconDeviceFloppy, IconEdit, IconTrash, IconVideo } from '@tabler/icons-vue'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)

const selectedCameraName = ref('')

onMounted(() => {
  selectedCameraName.value = product?.cameras[0].name || ''
})

const isEditingName = ref(false)

function handleEditName() {
  isEditingName.value = !isEditingName.value
  nextTick(() => {
    if (isEditingName.value) {
      console.log('focusing')
      document.getElementById('camera-name')?.focus()
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center"
        :style="{ backgroundImage: `url(${product?.thumbnail})` }"
      />
    </div>
    <div class="bg-white border-l p-8 space-y-4 overflow-y-auto">
      <h1 class="text-2xl font-bold">Cameras</h1>
      <Select v-model="selectedCameraName">
        <SelectTrigger>
          <SelectValue placeholder="Select camera..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="camera in product?.cameras" :key="camera.id" :value="camera.name">
              {{ camera.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <!-- <Table>
        <TableBody>
          <TableRow v-for="camera in cameras" :key="camera.id">
            <TableCell class="p-2">
              <IconVideo class="h-6 w-6 text-slate-500" />
            </TableCell>
            <TableCell class="p-2 w-full">{{ camera.name }}</TableCell>
            <TableCell class="p-2">
              <Button size="xs">Set</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table> -->
      <Separator />
      <h2 class="text-lg font-bold">Camera Settings</h2>
      <div>
        <Label class="text-xs text-slate-700" for="camera-name">Camera Name</Label>
        <div class="relative flex gap-2">
          <Input
            ref="cameraNameInput"
            class="pl-10 pr-16"
            :class="{ 'disabled:cursor-default': !isEditingName }"
            type="text"
            id="camera-name"
            v-model="selectedCameraName"
            :disabled="!isEditingName"
          />
          <IconVideo class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <Button variant="outline" size="icon" class="w-14" @click="handleEditName">
            <IconEdit v-if="!isEditingName" class="w-5 h-5" />
            <IconDeviceFloppy v-else class="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            class="w-14 hover:text-rose-600 hover:bg-rose-100 hover:bg-opacity-50 hover:border-rose-200"
          >
            <IconTrash class="w-5 h-5" />
          </Button>
        </div>
      </div>
      <Separator />
      <div>
        <h3 class="font-bold mt-6">Zoom</h3>
        <div class="flex gap-2">
          <div>
            <Label class="text-xs text-slate-700" for="zoom-min">Min</Label>
            <div class="relative">
              <Input type="number" id="zoom-min" />
              <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="zoom-value">Value</Label>
            <div class="relative">
              <Input type="number" id="zoom-value" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="zoom-max">Max</Label>
            <div class="relative">
              <Input type="number" id="zoom-max" />
              <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
            </div>
          </div>
        </div>
        <CamerasLockedLines />
        <!-- <CamerasLockedLines :is-locked="selectedCamera.zoom.locked" /> -->
      </div>
      <div>
        <h3 class="font-bold mt-6">Horizontal Angle</h3>
        <div class="flex gap-2">
          <div>
            <Label class="text-xs text-slate-700" for="h-angle-min">Min</Label>
            <div class="relative">
              <Input type="number" id="h-angle-min" />
              <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="h-angle-value">Value</Label>
            <div class="relative">
              <Input type="number" id="h-angle-value" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="h-angle-max">Max</Label>
            <div class="relative">
              <Input type="number" id="h-angle-max" />
              <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
            </div>
          </div>
        </div>
        <CamerasLockedLines />
        <!-- <CamerasLockedLines :is-locked="selectedCamera.hAngle.locked" /> -->
      </div>
      <div>
        <h3 class="font-bold mt-6">Vertical Angle</h3>
        <div class="flex gap-2">
          <div>
            <Label class="text-xs text-slate-700" for="v-angle-min">Min</Label>
            <div class="relative">
              <Input type="number" id="v-angle-min" />
              <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="v-angle-value">Value</Label>
            <div class="relative">
              <Input type="number" id="v-angle-value" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="v-angle-max">Max</Label>
            <div class="relative">
              <Input type="number" id="v-angle-max" />
              <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
            </div>
          </div>
        </div>
        <CamerasLockedLines />
        <!-- <CamerasLockedLines :is-locked="selectedCamera.vAngle.locked" /> -->
      </div>
      <div>
        <h3 class="font-bold mt-6">Target</h3>
        <div class="flex gap-4">
          <div class="flex items-center gap-2">
            <Label class="text-xs text-slate-700" for="target-x">X:</Label>
            <div class="relative">
              <Input type="number" id="target-x" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Label class="text-xs text-slate-700" for="target-y">Y:</Label>
            <div class="relative">
              <Input type="number" id="target-y" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Label class="text-xs text-slate-700" for="target-z">Z:</Label>
            <div class="relative">
              <Input type="number" id="target-z" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold mt-6">Clip Distance</h3>
        <div class="flex gap-2">
          <div>
            <Label class="text-xs text-slate-700" for="clip-dist-far">Far</Label>
            <div class="relative">
              <Input type="number" id="clip-dist-far" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="clip-dist-near">Near</Label>
            <div class="relative">
              <Input type="number" id="clip-dist-near" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold mt-6">Sensitivity</h3>
        <div class="flex gap-2">
          <div>
            <Label class="text-xs text-slate-700" for="sensitivity-pan">Pan</Label>
            <div class="relative">
              <Input type="number" id="sensitivity-pan" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="sensitivity-rotate">Rotate</Label>
            <div class="relative">
              <Input type="number" id="sensitivity-rotate" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="sensitivity-zoom">Zoom</Label>
            <div class="relative">
              <Input type="number" id="sensitivity-zoom" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold mt-6">Precision</h3>
        <div class="flex gap-2">
          <div>
            <Label class="text-xs text-slate-700" for="precision-pinch">Pinch</Label>
            <div class="relative">
              <Input type="number" id="precision-pinch" />
            </div>
          </div>
          <div>
            <Label class="text-xs text-slate-700" for="precision-wheel">Wheel</Label>
            <div class="relative">
              <Input type="number" id="precision-wheel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
