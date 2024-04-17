<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <h1 class="text-3xl font-bold mb-8">Analytics</h1>
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center"> Session Analytics </CardTitle>
      </CardHeader>
      <CardContent class="flex-grow">
        <DummyAnalytics />
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
