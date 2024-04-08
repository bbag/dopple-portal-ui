<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

const isCollapsed = ref(false)

function toggleCollapsed() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <LayoutMain>
    <RouterView />
  </LayoutMain>
</template>

<style scoped></style>
