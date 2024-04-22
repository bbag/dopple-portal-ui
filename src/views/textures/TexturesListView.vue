<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useTexturesStore } from '@/stores/textures'

const { workspace } = useRoute().params

import Button from '@/components/ui/button/Button.vue'
import { Card } from '@/components/ui/card'

import IconPlusSmall from '@/assets/icons/plus-small.svg'
</script>

<template>
  <div class="p-8">
    <header class="flex justify-between mb-2">
      <h1 class="text-3xl mb-4 font-bold">Textures</h1>
      <Button>
        <IconPlusSmall class="mr-2 w-5 h-5" />
        Upload Texture
      </Button>
    </header>
    <p class="mb-8 text-slate-500">(Still super placeholder-y... more coming soon.)</p>
    <div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
      <Card v-for="texture in useTexturesStore().textures" :key="texture.id" class="p-4">
        <img :src="texture.thumbnail" class="w-full aspect-square" />
        <p>{{ texture.name }}</p>
        <p>{{ texture.type }}</p>
        <p>{{ texture.resolution.w }} x {{ texture.resolution.h }}</p>
        <p>Latest version: {{ texture.versions[texture.versions.length - 1].draftVersion }}</p>
      </Card>
    </div>
  </div>
  <RouterView />
</template>

<style scoped></style>
