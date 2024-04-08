<script setup lang="ts">
import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Account Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
