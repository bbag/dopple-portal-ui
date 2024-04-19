<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { IconEye, IconEyeOff, IconPlus, IconSettings, IconTrash } from '@tabler/icons-vue'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail

const hotspotStates = ref<{ isOpen: boolean; isVisible: boolean }[]>([])
onBeforeMount(() => {
  product?.hotspots.forEach((hotspot) => {
    hotspotStates.value.push({ isOpen: false, isVisible: true })
  })
})

function handleAddHotspot() {
  console.log('adding hotspot')
  hotspotStates.value.push({ isOpen: true, isVisible: true })
  product?.hotspots.push({
    title: `Hotspot #${product?.hotspots.length + 1}`,
    id: crypto.randomUUID(),
    position: {
      x: Math.floor(Math.random() * 100) / 100,
      y: Math.floor(Math.random() * 100) / 100,
      z: Math.floor(Math.random() * 100) / 100
    }
  })
}

function handleDeleteHotspot(i: number) {
  hotspotStates.value.splice(i, 1)
  product?.hotspots.splice(i, 1)
}
</script>

<template>
  <div class="grid grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center relative"
        :style="{ backgroundImage: `url(${thumbnail})` }"
      >
        <TooltipProvider>
          <Tooltip v-for="(hotspot, i) in product?.hotspots" :key="hotspot.id">
            <TooltipTrigger as-child>
              <button
                v-show="hotspotStates[i].isVisible"
                class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 xl:w-6 xl:h-6 flex items-center justify-center text-white text-[0.6875rem] xl:text-xs font-medium bg-blue-600 border border-2 border-white rounded-full ring-[0.375rem] ring-white/20"
                :class="[hotspotStates[i].isOpen ? 'bg-[#EF5493]' : '']"
                :style="{
                  left: `${hotspot.position.x * 100}%`,
                  top: `${hotspot.position.y * 100}%`
                }"
                @click="hotspotStates[i].isOpen = true"
              >
                {{ i + 1 }}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ hotspot.title }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Card>
    </div>
    <div class="bg-white border-l p-8 space-y-4 overflow-y-auto">
      <h1 class="text-2xl font-bold">Hotspots</h1>
      <Collapsible
        v-for="(hotspot, i) in product?.hotspots"
        :key="hotspot.id"
        v-model:open="hotspotStates[i].isOpen"
      >
        <div class="flex justify-between w-full items-center">
          <CollapsibleTrigger>
            <div
              class="font-medium flex justify-start items-center gap-4"
              :class="{ 'text-muted-foreground': !hotspotStates[i].isVisible }"
            >
              <span class="text-sm w-6 h-6 flex items-center justify-center rounded bg-muted">
                {{ i + 1 }}
              </span>
              {{ hotspot.title || hotspot.id || `Hotspot #${i + 1}` }}
            </div>
          </CollapsibleTrigger>
          <div class="flex gap-2 flex-nowrap font-normal">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    size="icon-sm"
                    variant="outline"
                    @click="hotspotStates[i].isVisible = !hotspotStates[i].isVisible"
                  >
                    <IconEye v-if="hotspotStates[i].isVisible" class="w-5 h-5" />
                    <IconEyeOff v-else class="w-5 h-5 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Visibility</p>
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
                    @click="() => handleDeleteHotspot(i)"
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
        <CollapsibleContent class="-mx-2">
          <div class="p-2 pt-4 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid w-full items-center gap-1.5">
                <Label :for="`input-hotspot-title-${i}`">Title</Label>
                <Input
                  :id="`input-hotspot-title-${i}`"
                  type="text"
                  :placeholder="`New Hotspot #${i + 1}`"
                  v-model="hotspot.title"
                />
              </div>
              <div class="grid w-full items-center gap-1.5">
                <Label :for="`input-hotspot-id-${i}`">Hotspot ID</Label>
                <Input
                  :id="`input-hotspot-id-${i}`"
                  type="text"
                  placeholder="new_hotspot_id"
                  v-model="hotspot.id"
                />
              </div>
            </div>
            <div>
              <span class="text-sm font-medium">Position</span>
              <div class="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                <div class="border rounded p-1">X: {{ hotspot.position.x }}</div>
                <div class="border rounded p-1">Y: {{ hotspot.position.y }}</div>
                <div class="border rounded p-1">Z: {{ hotspot.position.z }}</div>
              </div>
            </div>
            <div>
              <span class="text-sm font-medium">Settings</span>
              <div class="flex flex-col gap-4 border rounded p-4">
                <label class="flex items-center gap-2 text-sm">
                  <Checkbox />
                  Occlude (hide when obscured from view)
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <Checkbox />
                  Frustum Culling (hide when not on screen)
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <CollapsibleTrigger>
                <Button size="sm" variant="ghost">Cancel</Button>
              </CollapsibleTrigger>
              <Button size="sm">Save</Button>
            </div>
          </div>
        </CollapsibleContent>
        <Separator class="my-4" />
      </Collapsible>
      <Button @click="handleAddHotspot">
        <IconPlus class="w-4 h-4 mr-2" />
        Add Hotspot
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
