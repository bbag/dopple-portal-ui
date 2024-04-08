<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import IconPlusSmall from '@/assets/icons/plus-small.svg'

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
    <div class="p-8 max-w-[104rem] mx-auto">
      <header class="flex justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">Workspaces</h1>
        <Button>
          <IconPlusSmall class="mr-2 w-5 h-5" />
          Add Workspace
        </Button>
      </header>
      <ul class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]">
        <li v-for="workspace in workspaces" :key="workspace.value">
          <RouterLink :to="`/w/${workspace.value}`">
            <Card id="product-details">
              <CardHeader>
                <CardTitle>{{ workspace.value }}</CardTitle>
                <CardDescription>
                  {{ workspace.productCount }} product{{ workspace.productCount === 1 ? '' : 's' }}
                </CardDescription>
              </CardHeader>
              <CardContent class="grid gap-4">
                <RouterLink
                  :to="`/w/${workspace.value}`"
                  :class="buttonVariants({ variant: 'outline' })"
                >
                  Open Workspace
                </RouterLink>
              </CardContent>
            </Card>
          </RouterLink>
        </li>
      </ul>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
