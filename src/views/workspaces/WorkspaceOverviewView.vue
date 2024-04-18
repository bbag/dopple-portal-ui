<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Products
import { useProductsStore } from '@/stores/products'
const products = computed(() =>
  useProductsStore().products.filter((product) => product.workspace === useRoute().params.workspace)
)
const productsDisplayCount = 3
const recentProducts = products.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, productsDisplayCount)

// Models
import { useModelsStore } from '@/stores/models'
const models = computed(() =>
  useModelsStore().models.filter((model) => model.workspace === useRoute().params.workspace)
)
const modelsDisplayCount = 3
const recentModels = models.value
  .sort((a, b) => b.dateModified.getTime() - a.dateModified.getTime())
  .slice(0, modelsDisplayCount)

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import DummyAnalytics from '@/components/blocks/dummy-analytics/DummyAnalytics.vue'

import { IconArrowNarrowRight, IconBox, IconChartDots } from '@tabler/icons-vue'
import IconGltfEditor from '@/assets/icons/gltf-editor.svg'
// import IconMaterial from '@/assets/icons/material.svg'
import IconShoppingBag from '@/assets/icons/shopping-bag.svg'
// import IconTexture from '@/assets/icons/texture.svg'

// const sections = [
//   {
//     title: 'For Managers',
//     description: 'The Marketing Marys and Product Pauls.',
//     content:
//       'Will primarily show Analytics, and some Product links (maybe link to Virtual Studio, hotspots editor, or other tools Marys/Pauls would use).'
//   },
//   {
//     title: 'For Artists',
//     description: 'The awesome Artie Artists.',
//     content:
//       'Will link to glTF Editor tool, most recent models/materials/textures uploaded or worked with.'
//   },
//   {
//     title: 'For Developers',
//     description: 'The Webdev Waynes of the world (party on, Garth).',
//     content: 'Will link to UI Builder, developer docs, etc.'
//   }
// ]
</script>

<template>
  <div class="p-8 max-w-[104rem] mx-auto">
    <h1 class="text-3xl font-bold mb-8">
      Workspace:
      <span class="font-mono bg-slate-500/10 px-3 py-1 rounded-lg ml-1 text-foreground/80">{{
        $route.params.workspace
      }}</span>
    </h1>
    <div
      class="grid gap-4 auto-rows-auto grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[minmax(0,3fr),minmax(0,2fr)] grid-flow-row-dense"
    >
      <Card class="flex flex-col col-span-1 xl:row-span-2 xl:col-span-2 2xl:col-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Products
            <IconShoppingBag class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>{{ products.length }} total</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="whitespace-nowrap">Product Title</TableHead>
                <TableHead class="w-full">Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="product in recentProducts" :key="product.name">
                <TableCell class="whitespace-nowrap">{{ product.title }}</TableCell>
                <TableCell class="font-mono w-full">{{ product.name }}</TableCell>
                <TableCell>
                  <RouterLink
                    :to="`/w/${product.workspace}/products/${product.name}`"
                    :class="buttonVariants({ variant: 'outline', size: 'xs' })"
                  >
                    View
                  </RouterLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p
            v-if="products.length > productsDisplayCount"
            class="text-sm text-slate-500 italic pt-2 px-4 border-t border-slate-200"
          >
            + {{ products.length - productsDisplayCount }} more
          </p>
        </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/products`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View All Products
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Assets
            <IconBox class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          Will show info and links to models, materials, and textures soon...
        </CardContent>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Tools
            <IconGltfEditor class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          Will show links to glTF Editor, Virtual Studio, and UI Builder soon...
        </CardContent>
      </Card>
      <Card class="flex flex-col col-span-1 row-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Analytics
            <IconChartDots class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-grow">
          <DummyAnalytics />
        </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/analytics`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View Analytics
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>

      <!-- <Card class="flex flex-col">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Models
            <IconBox class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Description here.</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="model in recentModels" :key="model.name">
                <TableCell class="w-full whitespace-nowrap">{{ model.name }}</TableCell>
                <TableCell>
                  <RouterLink
                    :to="`/w/${$route.params.workspace}/models`"
                    :class="buttonVariants({ variant: 'outline', size: 'xs' })"
                  >
                    View
                  </RouterLink>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p
            v-if="models.length > modelsDisplayCount"
            class="text-sm text-slate-500 italic pt-2 px-4 border-t border-slate-200"
          >
            + {{ models.length - modelsDisplayCount }} more
          </p>
        </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/models`"
            :class="buttonVariants({ variant: 'default' })"
          >
            View All Models
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Materials
            <IconMaterial class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Description here.</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow"> Content coming soon... </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/models`"
            :class="buttonVariants({ variant: 'default' })"
          >
            Call To Action
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Textures
            <IconTexture class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Description here.</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow"> Content coming soon... </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/models`"
            :class="buttonVariants({ variant: 'default' })"
          >
            Call To Action
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Analytics
            <IconChartDots class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Description here.</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow"> Content coming soon... </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/models`"
            :class="buttonVariants({ variant: 'default' })"
          >
            Call To Action
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card>
      <Card class="flex flex-col">
        <CardHeader>
          <CardTitle class="relative pr-8">
            Tools
            <IconGltfEditor class="w-5 h-5 absolute right-0 top-0 text-muted-foreground" />
          </CardTitle>
          <CardDescription>Description here.</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow"> Content coming soon... </CardContent>
        <CardFooter class="justify-end">
          <RouterLink
            :to="`/w/${$route.params.workspace}/models`"
            :class="buttonVariants({ variant: 'default' })"
          >
            Call To Action
            <IconArrowNarrowRight class="w-6 h-6 ml-2" />
          </RouterLink>
        </CardFooter>
      </Card> -->
    </div>

    <!-- <Alert variant="warning" class="mb-8 w-max">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This entire screen is just a placeholder for now. It'll eventually be the workspace
        overview.
      </AlertDescription>
    </Alert>
    <div class="mb-4">
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="I am a..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple"> Manager </SelectItem>
            <SelectItem value="blueberry"> Artist </SelectItem>
            <SelectItem value="banana"> Developer </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="grid gap-4 grid-cols-3">
      <Card v-for="(card, i) in sections" :key="i">
        <CardHeader>
          <CardTitle>{{ card.title }}</CardTitle>
          <CardDescription>{{ card.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          {{ card.content }}
        </CardContent>
      </Card>
    </div>
    <div class="mt-8">
      <span class="font-bold text-lg">To-do:</span>
      <ul>
        <li>Don't have any teams setup? CTA to invite folks.</li>
        <li>Don't have any domains authorized? CTA to add one.</li>
        <li>Don't have products yet? CTA to create one (and link to how-to guide).</li>
        <li>Don't have models/assets yet? CTA to upload some.</li>
        <li>Show "analytics at a glance" box with link to Analyitcs page.</li>
        <li>Show your client ID.</li>
        <li>
          Could show link to most recently edited product or most recently viewed screen, to pick up
          where you left off.
        </li>
      </ul>
    </div> -->
  </div>
</template>

<style scoped></style>
