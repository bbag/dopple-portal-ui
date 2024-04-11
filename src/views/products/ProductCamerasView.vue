<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { IconVideo } from '@tabler/icons-vue'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail
const cameras = product?.cameras || []

const activeCameraIndex = ref(0)
</script>

<template>
  <div class="grid gap-8 grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center"
        :style="{ backgroundImage: `url(${thumbnail})` }"
      />
    </div>
    <div class="bg-white border-l p-8 space-y-4">
      <h1 class="text-2xl font-bold">Cameras</h1>
      <Table>
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
      </Table>
      <Separator />
      <h2 class="text-lg font-bold">{{ cameras[activeCameraIndex]?.name }}:</h2>
      <div>
        <h3 class="font-bold">Zoom</h3>
        <div class="flex gap-2">
          <div class="relative">
            <Input type="number" />
            <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
          </div>
          <div class="relative">
            <Input type="number" />
          </div>
          <div class="relative">
            <Input type="number" />
            <Button size="xs" variant="outline" class="absolute right-2 top-2"> Set </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
