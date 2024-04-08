<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute, type RouteParams, type RouteRecordName } from 'vue-router'

import { useProductsStore } from '@/stores/products'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import WorkspacesIcon from '@/assets/icons/workspaces.svg'

defineProps<{
  pageTitle?: string
}>()

const route = useRoute()
console.log('------------------------------------')
// console.log(route.matched)

interface BreadcrumbOutputItem {
  path: string
  name?: RouteRecordName
}

const breadcrumbs = computed<BreadcrumbOutputItem[]>(() => {
  const arr = [] as BreadcrumbOutputItem[]
  route.matched.forEach((match) => {
    const formattedPath = replaceDynamicPathSegments(match.path)
    const hasExistingPath = arr.find((crumb) => crumb.path === formattedPath)
    if (!hasExistingPath) {
      let itemName = match.name as RouteRecordName
      if (itemName === 'Product') {
        itemName =
          useProductsStore().products.find(
            (product) =>
              product.name === route.params.name && product.workspace === route.params.workspace
          )?.title || 'N/A'
      } else if (itemName === 'Workspace') {
        itemName = route.params.workspace.toString()
      }
      arr.push({
        name: itemName,
        path: formattedPath
      })
    }
  })
  return arr
})

function replaceDynamicPathSegments(path: string) {
  const params = route.params as RouteParams
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value as string)
  })
  return path
}
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <TooltipProvider>
        <BreadcrumbItem>
          <Tooltip>
            <TooltipTrigger as-child>
              <BreadcrumbLink href="/"><WorkspacesIcon class="w-5 h-5" /></BreadcrumbLink>
            </TooltipTrigger>
            <TooltipContent>Workspaces</TooltipContent>
          </Tooltip>
        </BreadcrumbItem>
      </TooltipProvider>
      <BreadcrumbSeparator />
      <template v-for="(crumb, i) in breadcrumbs" :key="i">
        <BreadcrumbItem>
          <BreadcrumbLink :href="crumb.path" v-if="i < breadcrumbs.length - 1">
            {{ crumb.name }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ crumb.name }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="i < breadcrumbs.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
  <!-- <pre>{{ breadcrumbs }}</pre> -->
</template>

<style scoped></style>
