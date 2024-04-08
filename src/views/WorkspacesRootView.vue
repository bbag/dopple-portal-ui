<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TopBar from '@/components/blocks/top-bar/TopBar.vue'

const workspaces = useProductsStore()
  .products.reduce(
    (acc, obj) => {
      if (!acc.some((item) => item.value === obj.workspace)) {
        acc.push({
          label: obj.workspace,
          value: obj.workspace
        })
      }
      return acc
    },
    [] as { label: string; value: string }[]
  )
  .sort((a, b) => a.label.localeCompare(b.label))
</script>

<template>
  <div class="h-screen bg-muted">
    <TopBar hide-breadcrumbs />
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8">Workspaces:</h1>
      <ul class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]">
        <li v-for="workspace in workspaces" :key="workspace.value">
          <RouterLink :to="`/w/${workspace.value}`">
            <Card id="product-details">
              <CardHeader>
                <CardTitle>{{ workspace.label }}</CardTitle>
                <CardDescription>{{ workspace.value }}</CardDescription>
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
  </div>
</template>

<style scoped></style>
