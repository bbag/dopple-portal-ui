<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import SectionPreview from '@/components/sections/product-overview/ProductPreview.vue'
import SectionDetails from '@/components/sections/product-overview/ProductDetails.vue'
import SectionAnalytics from '@/components/sections/product-overview/ProductAnalytics.vue'
import SectionVersionHistory from '@/components/sections/product-overview/VersionHistory.vue'
import SectionAssets from '@/components/sections/product-overview/ProductAssets.vue'
import SectionEmbedCode from '@/components/sections/product-overview/EmbedCode.vue'
import SectionDomains from '@/components/sections/product-overview/ProductDomains.vue'
import SectionManage from '@/components/sections/product-overview/ManageProduct.vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { useProductsStore } from '@/stores/products'
const { name, workspace } = useRoute().params

const productData = useProductsStore().products.find(
  (p) => p.name === name && p.workspace === workspace
)

const product = ref({
  prodName: productData?.name,
  prodWorkspace: productData?.workspace
})

const productStatus = ref('published')
const isEditingProduct = ref(false)

interface SectionData {
  title: string
  linkId: string
  component: any
  description?: string
}

const productOverviewSections: SectionData[] = [
  {
    title: 'Preview',
    linkId: 'preview',
    component: SectionPreview
  },
  {
    title: 'Product Details',
    linkId: 'product-details',
    component: SectionDetails,
    description: `ID: ${productData?.id}`
  },
  {
    title: 'Analytics',
    linkId: 'analytics',
    component: SectionAnalytics,
    description:
      'Will show how many times this product has been viewed over the last 24 hours, 7 days, month, etc.'
  },
  {
    title: 'Version History',
    linkId: 'version-history',
    component: SectionVersionHistory
  },
  {
    title: 'Assets',
    linkId: 'assets',
    component: SectionAssets,
    description:
      'Will list any assets (models, materias, textures) that are associated with this product.'
  },
  {
    title: 'Embed Code',
    linkId: 'embed-code',
    component: SectionEmbedCode,
    description: 'Will display the embed code for this product.'
  },
  {
    title: 'Domains',
    linkId: 'domains',
    component: SectionDomains,
    description: 'Will list out domains that this product is authorized to be used on.'
  },
  {
    title: 'Manage',
    linkId: 'manage',
    component: SectionManage
  }
]

function scrollToSection(linkId: string) {
  const sectionElement = document.getElementById(linkId)

  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div id="product-overview" class="p-8 overflow-x-hidden overflow-y-auto">
    <div class="max-w-4xl mx-auto grid gap-8 grid-cols-[minmax(0,_1fr)_auto]">
      <div class="text-sm order-last">
        <ul class="sticky top-0">
          <li class="mb-2 font-bold border-b pb-2">Sections:</li>
          <li v-for="button in productOverviewSections" :key="button.linkId">
            <button @click="scrollToSection(button.linkId)">{{ button.title }}</button>
            <!-- <button>{{ button.title }}</button> -->
          </li>
        </ul>
      </div>
      <div class="order-first grid gap-4">
        <header class="flex gap-4 justify-between">
          <h1 class="text-3xl font-bold">{{ productData?.title }}</h1>
          <div class="flex gap-4 items-center">
            <Label for="product-status">Status:</Label>
            <Select id="product-status" v-model="productStatus">
              <SelectTrigger class="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="draft"> Draft </SelectItem>
                  <SelectItem value="published"> Published </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <Card
          v-for="section in productOverviewSections"
          :key="section.linkId"
          :id="section.linkId"
          class="overflow-hidden"
        >
          <CardHeader>
            <CardTitle>{{ section.title }}</CardTitle>
            <CardDescription v-if="section.description">{{ section.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <component :is="section.component" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
