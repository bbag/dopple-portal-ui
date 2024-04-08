<script setup lang="ts">
import { Button } from '@/components/ui/button'
import BreadCrumbs from '@/components/blocks/breadcrumbs/BreadCrumbs.vue'
import UserDropdown from './UserDropdown.vue'

import { IconCloudUp } from '@tabler/icons-vue'

defineProps<{
  hideBreadcrumbs?: boolean
}>()
</script>

<template>
  <div class="h-12 bg-white border-b flex items-center gap-4 px-8">
    <!-- <div class="bg-white border-b gap-4 px-8"> -->
    <BreadCrumbs v-if="!hideBreadcrumbs" />
    <div class="flex gap-4 ml-auto">
      <Button variant="outline" size="sm">
        <IconCloudUp size="20" class="mr-2" />
        Upload
      </Button>
      <UserDropdown />
    </div>
  </div>
  <!-- <pre>{{ breadcrumbs }}</pre> -->
</template>

<style scoped></style>
