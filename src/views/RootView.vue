<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const workspaces = useProductsStore()
  .products.reduce(
    (acc, obj) => {
      if (!acc.some((item) => item.value === obj.workspace)) {
        acc.push({
          productCount: 0,
          value: obj.workspace
        })
      }
      return acc
    },
    [] as { productCount: number; value: string }[]
  )
  .sort((a, b) => a.value.localeCompare(b.value))

// Update the product count for each workspace
workspaces.forEach((workspace) => {
  workspace.productCount = useProductsStore().products.filter(
    (product) => product.workspace === workspace.value
  ).length
})
</script>

<template>
  <LayoutMain>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8">Dopple Platform</h1>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
