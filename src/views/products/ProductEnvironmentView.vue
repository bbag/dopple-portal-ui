<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail

const environments = ref([
  'default',
  'indoor',
  'outdoor',
  'arrow_street',
  'arrow_studio',
  'paddleboard_demo'
])
const selectedEnvironment = ref('default')
</script>

<template>
  <div class="grid gap-8 grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center relative"
        :style="{ backgroundImage: `url(${thumbnail})` }"
      ></Card>
    </div>
    <div class="bg-white border-l p-8 space-y-4 overflow-y-auto">
      <h1 class="text-2xl font-bold">Environment Settings</h1>
      <div class="flex gap-4 flex-nowrap items-center">
        <Label for="environment-select">Environment:</Label>
        <Select id="environment-select" v-model="selectedEnvironment">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="environment in environments"
                :key="environment"
                :value="environment"
              >
                {{ environment }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
