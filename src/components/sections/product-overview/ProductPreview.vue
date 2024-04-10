<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const product = useProductsStore().products.find(
  (product) => product.name === useRoute().params.name
)
const thumbnail = product?.thumbnail
</script>

<template>
  <div
    class="aspect-[4/3] bg-no-repeat bg-contain bg-center"
    :style="{ backgroundImage: `url(${thumbnail})` }"
  ></div>
</template>
