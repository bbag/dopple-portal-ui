<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { Card } from '@/components/ui/card'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail
</script>

<template>
  <div class="grid gap-8 grid-cols-[minmax(0,_1fr)_32rem]">
    <div class="p-8">
      <Card
        class="w-full h-full bg-no-repeat bg-contain bg-center"
        :style="{ backgroundImage: `url(${thumbnail})` }"
      />
    </div>
    <div class="bg-white border-l p-8">
      <h1>Hotspot Settings</h1>
    </div>
  </div>
</template>

<style scoped></style>
