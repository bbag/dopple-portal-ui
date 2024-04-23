<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Row } from '@tanstack/vue-table'
import { labels } from './data'
import { type IModel } from '@/stores/models'

import { IconDots } from '@tabler/icons-vue'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ModelTableRowActionsProps {
  row: Row<IModel>
}
const props = defineProps<ModelTableRowActionsProps>()

const model = computed(() => props.row.original)
const activeLabel = ref('')
onMounted(() => {
  activeLabel.value = model.value.label
})

const inputDeleteName = ref('')
const inputDeleteWorkspace = ref('')
</script>

<template>
  <AlertDialog>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <IconDots class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem>Manage</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup :value="model.label" v-model="activeLabel">
              <DropdownMenuRadioItem
                v-for="label in labels"
                :key="label.value"
                :value="label.value"
              >
                {{ label.label }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-red-600">
          <AlertDialogTrigger class="w-full flex items-start">Delete</AlertDialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          <p>
            You are about to delete the
            <strong class="text-slate-900">{{ model.name }}</strong> model. This action cannot be
            undone.
          </p>
          <p class="mt-4">To continue, type the name and the workspace for this model below:</p>
          <div class="text-slate-900 grid w-full items-center gap-1.5 mt-4">
            <Label for="delete-model-name"
              >Name:
              <span
                class="text-slate-600 text-xs bg-muted font-mono px-[0.25em] py-[0.125em] rounded"
                >{{ model.name }}</span
              ></Label
            >
            <Input
              id="delete-model-name"
              type="text"
              :placeholder="model.name"
              v-model="inputDeleteName"
            />
          </div>
          <div class="text-slate-900 grid w-full items-center gap-1.5 mt-4">
            <Label for="delete-model-workspace"
              >Workspace:
              <span
                class="text-slate-600 text-xs bg-muted font-mono px-[0.25em] py-[0.1875em] rounded"
                >{{ model.workspace }}</span
              ></Label
            >
            <Input
              id="delete-model-workspace"
              type="text"
              :placeholder="model.workspace"
              v-model="inputDeleteWorkspace"
            />
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          class="bg-rose-600 hover:bg-rose-700"
          :disabled="inputDeleteName !== model.name || inputDeleteWorkspace !== model.workspace"
          >Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
