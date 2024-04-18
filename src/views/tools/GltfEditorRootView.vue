<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const workspace = useRoute().params.workspace
// const product = useRoute().params.name
const products = useProductsStore().products.filter((p) => p.workspace === workspace)
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-[104rem] mx-auto">
      <header class="flex justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">glTF Editor</h1>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>This is still super placeholdery. More coming soon...</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-0">
            <li v-for="product in products" :key="product.id">
              <RouterLink
                :to="`/w/${workspace}/studio/${product.name}`"
                :class="buttonVariants({ variant: 'link', size: 'sm' })"
              >
                {{ product.title }}
              </RouterLink>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
