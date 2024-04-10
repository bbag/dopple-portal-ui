<script setup lang="ts">
import { h, ref } from 'vue'

import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useProductsStore } from '@/stores/products'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

import { IconDots } from '@tabler/icons-vue'
import IconPlusSmall from '@/assets/icons/plus-small.svg'

const workspaces = useProductsStore()
  .products.reduce(
    (acc, obj) => {
      if (!acc.some((item) => item.value === obj.workspace)) {
        acc.push({
          productCount: 0,
          value: obj.workspace
        })
      }
      return acc
    },
    [] as { productCount: number; value: string }[]
  )
  .sort((a, b) => a.value.localeCompare(b.value))

// Update the product count for each workspace
workspaces.forEach((workspace) => {
  workspace.productCount = useProductsStore().products.filter(
    (product) => product.workspace === workspace.value
  ).length
})

const newWorkspaceName = ref('')

const formSchema = toTypedSchema(
  z.object({
    'new-workspace': z.string().regex(/^(?![-_])(?!.*[-_]$)[a-z\d-_]+$/)
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  console.log('values')
  console.log(values)
  toast({
    title: 'Workspace created:',
    description: h('code', { class: 'text-white' }, 'my-workspace-name')
  })
})
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-[104rem] mx-auto">
      <header class="flex justify-between gap-4 mb-8">
        <h1 class="text-3xl font-bold">Workspaces</h1>
        <Dialog>
          <DialogTrigger>
            <Button>
              <IconPlusSmall class="mr-2 w-5 h-5" />
              Add Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Workspace</DialogTitle>
              <DialogDescription>
                <form class="space-y-4 my-4 text-slate-900" @submit="onSubmit">
                  <FormField v-slot="{ componentField }" name="new-workspace">
                    <FormItem>
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="my-workspace-name"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormDescription>
                        Must contain only lowercase letters, numbers, hyphens, and underscores, and
                        must not start or end with a hyphen or underscore.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <div class="flex justify-end">
                    <DialogClose as-child>
                      <Button type="submit"> Create </Button>
                    </DialogClose>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>
      <ul class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]">
        <li v-for="workspace in workspaces" :key="workspace.value">
          <Card id="product-details">
            <CardHeader>
              <CardTitle class="relative pr-10">
                {{ workspace.value }}
                <div class="absolute -right-2 -top-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon-sm">
                        <IconDots class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem> View </DropdownMenuItem>
                        <DropdownMenuItem> Rename </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-red-600"> Delete </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardTitle>
              <CardDescription>
                {{ workspace.productCount }} product{{ workspace.productCount === 1 ? '' : 's' }}
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
              <RouterLink
                :to="`/w/${workspace.value}`"
                :class="buttonVariants({ variant: 'outline' })"
              >
                Open Workspace
              </RouterLink>
            </CardContent>
          </Card>
        </li>
      </ul>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
