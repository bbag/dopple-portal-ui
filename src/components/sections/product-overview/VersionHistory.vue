<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
const product = useProductsStore().products.find((p) => p.name === useRoute().params.name)

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IconCircleCheck, IconDots } from '@tabler/icons-vue'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Default</TableHead>
        <TableHead class="whitespace-nowrap">Published Version</TableHead>
        <TableHead class="whitespace-nowrap">Draft Version</TableHead>
        <TableHead class="whitespace-nowrap">Created By</TableHead>
        <TableHead class="whitespace-nowrap">Saved At</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(item, i) in product?.versions"
        :key="item.draftVersion?.toString() + i.toString()"
      >
        <TableCell>
          <IconCircleCheck v-if="item.isDefault" class="w-6 h-6 text-green-500 mx-auto" />
        </TableCell>
        <TableCell class="text-center">{{ item.publishedVersion }}</TableCell>
        <TableCell class="text-center">{{ item.draftVersion }}</TableCell>
        <TableCell class="whitespace-nowrap truncate w-full max-w-1">
          {{ item.createdBy }}
        </TableCell>
        <TableCell class="whitespace-nowrap">{{
          dateFormatter.format(item.dateCreated)
        }}</TableCell>
        <TableCell class="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon-sm">
                <IconDots class="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem :disabled="item.publishedVersion !== null">
                  Publish
                </DropdownMenuItem>
                <DropdownMenuItem :disabled="item.isDefault"> Make Default </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
