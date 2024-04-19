<script setup lang="ts">
import { nextTick, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore, type ICamera } from '@/stores/products'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import CamerasLockedLines from '@/components/sections/product-cameras/CamerasLockedLines.vue'

import {
  IconDeviceFloppy,
  IconEdit,
  IconPlus,
  IconSettings,
  IconTrash,
  IconVideo
} from '@tabler/icons-vue'
import IconInfo from '@/assets/icons/info.svg'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)

const selectedCameraName = ref('')

const cameraStates = ref<{ isOpen: boolean }[]>([])

// function handleEditName() {
//   isEditingName.value = !isEditingName.value
//   nextTick(() => {
//     if (isEditingName.value) {
//       console.log('focusing')
//       document.getElementById('camera-name')?.focus()
//     }
//   })
// }

function handleAddCamera() {
  console.log('adding hotspot')
  cameraStates.value.push({ isOpen: true })
  product?.cameras.push({
    name: `camera_${crypto.randomUUID().substring(0, 4)}`,
    id: crypto.randomUUID(),
    zoom: { min: '', val: 2.5, max: '' },
    hAngle: { min: '', val: 0, max: '' },
    vAngle: { min: '', val: 0, max: '' },
    target: { x: 0, y: 0, z: 0 },
    clipDistance: { far: 2250.5, near: 0.01 },
    sensitivity: { pan: 1000, rotate: 1000, zoom: 1000 },
    limitRadiusUsingBounds: false,
    precision: { pinch: 88.9, wheel: 88.9 }
  })
}

function handleDeleteCamera(i: number) {
  cameraStates.value.splice(i, 1)
  product?.cameras.splice(i, 1)
}

onBeforeMount(() => {
  selectedCameraName.value = product?.cameras[0].name || ''
  product?.cameras.forEach(() => {
    cameraStates.value.push({ isOpen: false })
  })
})
</script>

<template>
  <div class="grid grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center"
        :style="{ backgroundImage: `url(${product?.thumbnail})` }"
      />
    </div>
    <div class="bg-white border-l p-8 overflow-y-auto">
      <h1 class="text-2xl font-bold">Cameras</h1>
      <Collapsible
        v-for="(camera, i) in product?.cameras"
        :key="camera.id"
        v-model:open="cameraStates[i].isOpen"
      >
        <div
          class="group flex justify-between w-full items-center rounded hover:bg-slate-50 -mx-2 px-2 py-2 transition-all"
        >
          <CollapsibleTrigger>
            <div class="font-medium flex justify-start items-center gap-4">
              <span
                class="text-sm w-6 h-6 flex items-center justify-center rounded bg-slate-100 group-hover:bg-slate-200 transition-all"
              >
                {{ i + 1 }}
              </span>
              {{ camera.name || camera.id || `Camera #${i + 1}` }}
            </div>
          </CollapsibleTrigger>
          <div class="flex gap-2 flex-nowrap font-normal">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button size="icon-sm" variant="outline">
                    <IconVideo class="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger as-child>
                  <CollapsibleTrigger>
                    <Button size="icon-sm" variant="outline">
                      <IconSettings class="w-5 h-5" />
                    </Button>
                  </CollapsibleTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    size="icon-sm"
                    variant="outline"
                    class="hover:text-rose-600 hover:bg-rose-100 hover:bg-opacity-50 hover:border-rose-200"
                    @click="() => handleDeleteCamera(i)"
                    :disabled="i === 0"
                  >
                    <IconTrash class="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <CollapsibleContent class="-mr-2 border-l pl-4 ml-3">
          <div class="p-2 pt-4 space-y-4">
            <div class="grid gap-1.5 items-center w-full">
              <Label :for="`input-camera-title-${i}`">Camera Name</Label>
              <div class="relative">
                <Input
                  v-model="camera.name"
                  :id="`input-camera-title-${i}`"
                  class="pl-10"
                  type="text"
                  :placeholder="`New Camera #${i + 1}`"
                  :disabled="i === 0"
                />
                <IconVideo
                  class="w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
              </div>
            </div>
            <div class="flex items-center gap-4 justify-between">
              <div class="flex items-center gap-2">
                <Button size="sm">Set Values</Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <IconInfo class="w-4 h-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent align="center" side="top">
                      <p class="text-sm max-w-[15rem] p-1">
                        Sets the view values to the zoom, horizontal angle, vertical angle, and
                        target values for this camera.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div class="flex items-center gap-2">
                <Button size="sm" variant="outline">Revert</Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <IconInfo class="w-4 h-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent align="end" side="top">
                      <p class="text-sm max-w-[14rem] p-1">
                        Reverts the set values back to their previous values.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Separator />
            <div>
              <h3 class="font-bold mt-6">Zoom</h3>
              <div class="flex gap-2">
                <div>
                  <Label class="text-xs text-slate-700" for="zoom-min">Min</Label>
                  <div class="relative">
                    <Input type="number" id="zoom-min" v-model.number="camera.zoom.min" />
                    <Button size="xs" variant="outline" class="absolute right-2 top-2">
                      Set
                    </Button>
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="zoom-value">Value</Label>
                  <div class="relative">
                    <Input type="number" id="zoom-value" v-model.number="camera.zoom.val" />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="zoom-max">Max</Label>
                  <div class="relative">
                    <Input type="number" id="zoom-max" v-model.number="camera.zoom.max" />
                    <Button size="xs" variant="outline" class="absolute right-2 top-2">
                      Set
                    </Button>
                  </div>
                </div>
              </div>
              <CamerasLockedLines :is-locked="camera.zoom.min !== '' || camera.zoom.max !== ''" />
            </div>
            <div>
              <h3 class="font-bold mt-6">Horizontal Angle</h3>
              <div class="flex gap-2">
                <div>
                  <Label class="text-xs text-slate-700" for="h-angle-min">Min°</Label>
                  <div class="relative">
                    <Input type="number" id="h-angle-min" v-model.number="camera.hAngle.min" />
                    <Button size="xs" variant="outline" class="absolute right-2 top-2">
                      Set
                    </Button>
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="h-angle-value">Value°</Label>
                  <div class="relative">
                    <Input type="number" id="h-angle-value" v-model.number="camera.hAngle.val" />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="h-angle-max">Max°</Label>
                  <div class="relative">
                    <Input type="number" id="h-angle-max" v-model.number="camera.hAngle.max" />
                    <Button size="xs" variant="outline" class="absolute right-2 top-2">
                      Set
                    </Button>
                  </div>
                </div>
              </div>
              <CamerasLockedLines
                :is-locked="camera.hAngle.min !== '' || camera.hAngle.max !== ''"
              />
            </div>
            <div>
              <h3 class="font-bold mt-6">Vertical Angle</h3>
              <div class="flex gap-2">
                <div>
                  <Label class="text-xs text-slate-700" for="v-angle-min">Min°</Label>
                  <div class="relative">
                    <Input type="number" id="v-angle-min" v-model.number="camera.vAngle.min" />
                    <Button size="xs" variant="outline" class="absolute right-2 top-2">
                      Set
                    </Button>
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="v-angle-value">Value°</Label>
                  <div class="relative">
                    <Input type="number" id="v-angle-value" v-model.number="camera.vAngle.val" />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="v-angle-max">Max°</Label>
                  <div class="relative">
                    <Input type="number" id="v-angle-max" v-model.number="camera.vAngle.max" />
                    <Button size="xs" variant="outline" class="absolute right-2 top-2">
                      Set
                    </Button>
                  </div>
                </div>
              </div>
              <CamerasLockedLines
                :is-locked="camera.vAngle.min !== '' || camera.vAngle.max !== ''"
              />
            </div>
            <div>
              <h3 class="font-bold mt-6">Target</h3>
              <div class="flex gap-4">
                <div class="flex items-center gap-2">
                  <Label class="text-xs text-slate-700" for="target-x">X:</Label>
                  <div class="relative">
                    <Input type="number" id="target-x" v-model.number="camera.target.x" />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Label class="text-xs text-slate-700" for="target-y">Y:</Label>
                  <div class="relative">
                    <Input type="number" id="target-y" v-model.number="camera.target.y" />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Label class="text-xs text-slate-700" for="target-z">Z:</Label>
                  <div class="relative">
                    <Input type="number" id="target-z" v-model.number="camera.target.z" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="font-bold mt-6">Clip Distance</h3>
              <div class="flex gap-2">
                <div>
                  <Label class="text-xs text-slate-700" for="clip-dist-near">Near</Label>
                  <div class="relative">
                    <Input
                      type="number"
                      id="clip-dist-near"
                      v-model.number="camera.clipDistance.near"
                    />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="clip-dist-far">Far</Label>
                  <div class="relative">
                    <Input
                      type="number"
                      id="clip-dist-far"
                      v-model.number="camera.clipDistance.far"
                    />
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
                    <Input
                      type="number"
                      id="sensitivity-pan"
                      v-model.number="camera.sensitivity.pan"
                    />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="sensitivity-rotate">Rotate</Label>
                  <div class="relative">
                    <Input
                      type="number"
                      id="sensitivity-rotate"
                      v-model.number="camera.sensitivity.rotate"
                    />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="sensitivity-zoom">Zoom</Label>
                  <div class="relative">
                    <Input
                      type="number"
                      id="sensitivity-zoom"
                      v-model.number="camera.sensitivity.zoom"
                    />
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
                    <Input
                      type="number"
                      id="precision-pinch"
                      v-model.number="camera.precision.pinch"
                    />
                  </div>
                </div>
                <div>
                  <Label class="text-xs text-slate-700" for="precision-wheel">Wheel</Label>
                  <div class="relative">
                    <Input
                      type="number"
                      id="precision-wheel"
                      v-model.number="camera.precision.wheel"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div class="mt-4">
        <Button @click="handleAddCamera">
          <IconPlus class="w-4 h-4 mr-2" />
          New Camera
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
