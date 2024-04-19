<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import {
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconDeviceFloppy,
  IconCamera
} from '@tabler/icons-vue'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail

const aspectRatio = ref('16:9')
const aspectRatiosList = [
  { label: '1:1', w: '1', h: '1' },
  { label: '3:4', w: '3', h: '4' },
  { label: '4:3', w: '4', h: '3' },
  { label: '16:9', w: '16', h: '9' },
  { label: '16:10', w: '16', h: '10' },
  { label: 'Custom', w: '1', h: '1' }
]

const customAspectRatio = ref({
  w: '1',
  h: '1'
})

const aspectRatioValues = computed(() => {
  if (aspectRatio.value === 'Custom') {
    return {
      w: customAspectRatio.value.w || '1',
      h: customAspectRatio.value.h || '1'
    }
  } else {
    const option = aspectRatiosList.find((a) => a.label === aspectRatio.value)
    return option ? { w: option.w, h: option.h } : { w: '1', h: '1' }
  }
})
</script>

<template>
  <div class="h-full grid grid-cols-[minmax(0,_1fr)_32rem] overflow-y-hidden">
    <div class="p-8">
      <Card
        class="max-w-full max-h-[calc(100vh-7rem)] mx-auto bg-no-repeat bg-contain bg-center relative"
        :style="{
          aspectRatio: `${aspectRatioValues.w}/${aspectRatioValues.h}`,
          backgroundImage: `url(${thumbnail})`
        }"
      ></Card>
    </div>
    <div class="bg-white border-l p-8 space-y-8 overflow-y-auto">
      <TooltipProvider>
        <div>
          <h1 class="text-2xl font-bold mb-2">Virtual Studio</h1>
          <p class="text-slate-500 text-sm mb-4">
            This UI will change <em>drastically</em> soon... this is just a placeholder for now.
          </p>
          <p>
            <span class="font-mono bg-slate-500/10 px-2 py-1 rounded ml-1 text-foreground/80">
              Product: {{ product?.name }}
            </span>
          </p>
        </div>
        <Separator />
        <div>
          <h2 class="text-lg font-bold">Settings</h2>
          <div class="flex gap-4 items-center">
            <Label class="whitespace-nowrap">Aspect ratio:</Label>
            <Select v-model="aspectRatio">
              <SelectTrigger class="w-32 tracking-wide">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="option in aspectRatiosList"
                    :key="option.label"
                    :value="option.label"
                    class="tracking-wide"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div v-if="aspectRatio === 'Custom'" class="custom-aspect-ratio-input">
              <Tooltip>
                <TooltipTrigger as-child>
                  <IconArrowsHorizontal
                    class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-600 cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Width</p>
                </TooltipContent>
              </Tooltip>
              <Input v-model="customAspectRatio.w" type="number" max="4096" min="1" />
            </div>
            <div v-if="aspectRatio === 'Custom'" class="custom-aspect-ratio-input">
              <Tooltip>
                <TooltipTrigger as-child>
                  <IconArrowsVertical
                    class="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-600 cursor-help"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Height</p>
                </TooltipContent>
              </Tooltip>
              <Input v-model="customAspectRatio.h" type="number" max="4096" min="1" />
            </div>
          </div>
        </div>
        <div>
          <h2 class="text-lg font-bold">Camera Views</h2>
          <ul class="grid gap-4 pt-4">
            <li class="flex items-center border-b pb-4">
              <Checkbox id="select-all-cameras" />
              <label
                for="select-all-cameras"
                class="text-sm font-medium leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select all cameras
              </label>
            </li>
            <li v-for="camera in product?.cameras" :key="camera.id" class="flex items-center">
              <Checkbox :id="`camera-${camera.id}`" />
              <label
                :for="`camera-${camera.id}`"
                class="text-sm font-medium leading-none ml-2 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {{ camera.name }}
              </label>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-lg font-bold">Environments</h2>
          <p>Stuff coming soon...</p>
        </div>
        <div>
          <h2 class="text-lg font-bold">Output</h2>
          <p>Stuff coming soon...</p>
        </div>
        <div>
          <h2 class="text-lg font-bold">Configurations</h2>
          <p>Stuff coming soon...</p>
        </div>
      </TooltipProvider>
      <div class="flex justify-end gap-4">
        <Button variant="outline">
          <IconDeviceFloppy class="w-5 h-5 mr-2" />
          Save
        </Button>
        <Button>
          <IconCamera class="w-5 h-5 mr-2" />
          Capture
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-aspect-ratio-input {
  @apply relative w-[5.5rem];
}

.custom-aspect-ratio-input input {
  @apply pl-9;
  -moz-appearance: textfield;
}

.custom-aspect-ratio-input input::-webkit-outer-spin-button,
.custom-aspect-ratio-input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
