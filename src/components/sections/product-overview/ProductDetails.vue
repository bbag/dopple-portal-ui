<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { IconCopy, IconDeviceFloppy, IconPencil } from '@tabler/icons-vue'

import { useProductsStore } from '@/stores/products'
const { name, workspace } = useRoute().params

const productData = useProductsStore().products.find(
  (p) => p.name === name && p.workspace === workspace
)

const product = ref({
  prodTitle: productData?.title || '',
  prodName: productData?.name || '',
  prodWorkspace: productData?.workspace || ''
})

const isEditingProduct = ref(false)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="product-title">Title</Label>
      <div class="relative">
        <Input
          id="product-title"
          type="text"
          placeholder="My Product"
          v-model="product.prodTitle"
          :disabled="!isEditingProduct"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingProduct"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="product-name">Name</Label>
      <div class="relative">
        <Input
          id="product-name"
          type="text"
          placeholder="product_name"
          v-model="product.prodName"
          :disabled="!isEditingProduct"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingProduct"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="product-workspace">Workspace</Label>
      <div class="relative">
        <Input
          id="product-workspace"
          type="text"
          placeholder="workspace"
          v-model="product.prodWorkspace"
          :disabled="!isEditingProduct"
        />
        <Button
          size="icon-sm"
          variant="ghost"
          class="absolute right-1 top-1"
          v-if="!isEditingProduct"
        >
          <IconCopy class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
  <div class="flex justify-end">
    <Button variant="secondary" v-if="!isEditingProduct" @click="isEditingProduct = true">
      <IconPencil class="w-6 h-6 mr-2" />
      Edit
    </Button>
    <Button v-if="isEditingProduct" @click="isEditingProduct = false">
      <IconDeviceFloppy class="w-6 h-6 mr-2" />
      Save
    </Button>
  </div>
</template>
