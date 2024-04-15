<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'
</script>

<template>
  <div class="p-8">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center"> Sessions Overview </CardTitle>
      </CardHeader>
      <CardContent class="flex-grow">
        <DummyAnalytics />
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
