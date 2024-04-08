<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import SideNav from '@/components/blocks/side-nav/SideNav.vue'
import TopBar from '@/components/blocks/top-bar/TopBar.vue'

const isCollapsed = ref(false)

function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="grid h-screen w-full" :class="[isCollapsed ? 'pl-16' : 'pl-64']">
    <SideNav @toggle-collapsed="toggleCollapsed" :is-collapsed="isCollapsed" />
    <!-- <main class="bg-muted grid grid-rows-[auto_minmax(0,_1fr)] overflow-y-auto"> -->
    <main class="bg-muted grid grid-rows-[3rem_minmax(0,_1fr)]">
      <TopBar />
      <div class="h-[calc(100vh-3rem)] overflow-x-hidden overflow-y-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
