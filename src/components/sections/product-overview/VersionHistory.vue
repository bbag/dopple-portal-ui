<script lang="ts" setup>
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

const dummyVersionHistory = [
  {
    id: '877e1413-acde-47f5-96be-39924d41c9c6',
    isDefault: true,
    publishedVersion: 2,
    draftRevision: 3,
    createdBy: 'John Doe',
    savedAt: new Date('2024-04-12T01:41:29.000Z')
  },
  {
    id: '877e1413-acde-47f5-96be-39924d41c9c6',
    isDefault: false,
    publishedVersion: null,
    draftRevision: 2,
    createdBy: 'Jane Fonda',
    savedAt: new Date('2024-03-30T12:53:27.000Z')
  },
  {
    id: '877e1413-acde-47f5-96be-39924d41c9c6',
    isDefault: false,
    publishedVersion: 1,
    draftRevision: 1,
    createdBy: 'Smitty Werbenjägermanjensen (he was #1)',
    savedAt: new Date('2023-12-04T19:06:51.000Z')
  }
]

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
        <TableHead class="whitespace-nowrap">Draft Revision</TableHead>
        <TableHead class="whitespace-nowrap">Created By</TableHead>
        <TableHead class="whitespace-nowrap">Saved At</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="item in dummyVersionHistory" :key="item.id">
        <TableCell>
          <IconCircleCheck v-if="item.isDefault" class="w-6 h-6 text-green-500 mx-auto" />
        </TableCell>
        <TableCell class="text-center">{{ item.publishedVersion }}</TableCell>
        <TableCell class="text-center">{{ item.draftRevision }}</TableCell>
        <TableCell class="whitespace-nowrap truncate w-full max-w-1">{{
          item.createdBy
        }}</TableCell>
        <TableCell class="whitespace-nowrap">{{ dateFormatter.format(item.savedAt) }}</TableCell>
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
