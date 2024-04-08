<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const { name, workspace } = useRoute().params

const tabs = [
  {
    name: 'Overview',
    path: `/w/${workspace}/products/${name}`
  },
  {
    name: 'Hotspots',
    path: `/w/${workspace}/products/${name}/hotspots`
  },
  {
    name: 'Cameras',
    path: `/w/${workspace}/products/${name}/cameras`
  },
  {
    name: 'Environment',
    path: `/w/${workspace}/products/${name}/environment`
  },
  {
    name: 'Configuration',
    path: `/w/${workspace}/products/${name}/configuration`
  }
]
</script>

<template>
  <div class="h-full grid grid-rows-[auto_minmax(0,_1fr)]">
    <ul class="bg-white border-b flex align-end px-4">
      <li v-for="{ name, path } in tabs" :key="name">
        <RouterLink :to="path" class="tab-link text-sm">
          {{ name }}
        </RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<style scoped>
.tab-link {
  @apply py-3 px-4 block cursor-pointer relative overflow-hidden;
}

.tab-link::after {
  @apply content-[''] absolute left-0 bottom-0 h-1 bg-blue-500 rounded-t-lg w-full transition duration-500 translate-y-[calc(100%+1px)];
}

.tab-link.router-link-exact-active {
  @apply text-blue-500;
}

.tab-link.router-link-exact-active::after {
  @apply translate-y-0;
}
</style>
