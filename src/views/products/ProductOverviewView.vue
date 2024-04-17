<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import SectionPreview from '@/components/sections/product-overview/ProductPreview.vue'
import SectionDetails from '@/components/sections/product-overview/ProductDetails.vue'
import SectionAnalytics from '@/components/sections/product-overview/ProductAnalytics.vue'
import SectionVersionHistory from '@/components/sections/product-overview/VersionHistory.vue'
import SectionAssets from '@/components/sections/product-overview/ProductAssets.vue'
import SectionEmbedCode from '@/components/sections/product-overview/EmbedCode.vue'
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

import { IconEyeCode, IconSlideshow } from '@tabler/icons-vue'
import IconUiBuilder from '@/assets/icons/ui-builder.svg'

import { useProductsStore } from '@/stores/products'
const { name, workspace } = useRoute().params

const productData = useProductsStore().products.find(
  (p) => p.name === name && p.workspace === workspace
)

const product = ref({
  prodName: productData?.name,
  prodWorkspace: productData?.workspace
})

const productVersions = ref(productData?.versions.reverse() || [])
const currentProductVersion = ref(
  productVersions.value
    .find((v) => v.draftRevision !== null && v.publishedVersion)
    ?.draftRevision?.toString() || 'Unknown'
)

interface SectionData {
  title?: string
  linkId: string
  component: any
  description?: string
}

const productOverviewSections: SectionData[] = [
  {
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
    component: SectionAnalytics
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
    description: 'Any assets (models, materias, textures) that are associated with this product.'
  },
  {
    title: 'Embed Code',
    linkId: 'embed-code',
    component: SectionEmbedCode,
    description:
      'Copy/paste the code below into your page’s HTML/JavaScript to display this product.'
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
    <div class="max-w-5xl mx-auto grid gap-8 grid-cols-[minmax(0,_1fr)_auto]">
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
        </header>
        <div class="flex flex-wrap gap-4 justify-between">
          <Select id="product-status" v-model="currentProductVersion">
            <SelectTrigger class="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(version, i) in productVersions"
                  :key="(version.draftRevision || '') + i.toString()"
                  :value="version.draftRevision?.toString() || 'Unknown'"
                >
                  {{
                    `Version ${version.draftRevision}${version.isDefault ? ' (default)' : ''}` ||
                    'Unknown Version'
                  }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div class="flex flex-wrap gap-4">
            <Button variant="outline">
              <IconEyeCode class="w-6 h-6 mr-2" />
              Live Preview
            </Button>
            <Button variant="outline">
              <IconSlideshow class="w-6 h-6 mr-2" />
              Open in Virtual Studio
            </Button>
            <Button variant="outline">
              <IconUiBuilder class="w-6 h-6 mr-2" />
              Open in UI Builder
            </Button>
          </div>
        </div>
        <Card
          v-for="section in productOverviewSections"
          :key="section.linkId"
          :id="section.linkId"
          class="overflow-hidden"
        >
          <CardHeader v-if="section.title">
            <CardTitle>{{ section.title }}</CardTitle>
            <CardDescription v-if="section.description">{{ section.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <component
              :is="section.component"
              :draft-version="currentProductVersion"
              :published-version="
                productVersions.find((v) => v.draftRevision === +currentProductVersion)
                  ?.publishedVersion
              "
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
