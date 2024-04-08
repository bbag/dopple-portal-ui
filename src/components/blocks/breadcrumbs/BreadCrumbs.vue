<script setup lang="ts">
import { computed } from 'vue'
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

interface BreadcrumbOutputItem {
  path: string
  name?: RouteRecordName | string[]
}

const breadcrumbs = computed<BreadcrumbOutputItem[]>(() => {
  return route.matched.reduce<BreadcrumbOutputItem[]>((acc, curr) => {
    const formattedPath = replaceDynamicSegments(curr.path, route.params)
    const existingItem = acc.find((item) => item.path === formattedPath)
    if (!existingItem) {
      acc.push({
        path: formattedPath,
        name: getDynamicName(curr.name || 'N/A', route.params)
      })
    }
    return acc
  }, [])
})

// function replaceDynamicSegments(path: string, params: RouteParams): string {
//   return path.replace(/:(\w+)/g, (_, paramName) => params[paramName] || '')
// }

function replaceDynamicSegments(path: string, params: RouteParams): string {
  return path.replace(/:(\\w+)/g, (_, paramName) => {
    const value = params[paramName]
    if (Array.isArray(value)) {
      return value.map((v) => encodeURIComponent(v)).join('/')
    }
    return value ? encodeURIComponent(value) : 'N/A'
  })
}

function getDynamicName(name: string[] | RouteRecordName, params: RouteParams) {
  if (name === 'Workspace') {
    return params.workspace
  }

  if (name === 'Product') {
    const { workspace, name: productName } = params
    const productTitle = useProductsStore().getProductTitle(productName, workspace)
    return `${productTitle || 'N/A'}`
  }

  return name || 'N/A'
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
</template>

<style scoped></style>
