<script setup lang="ts">
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger
// } from '@/components/ui/dialog'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const sections = [
  {
    title: 'For Managers',
    description: 'The Marketing Marys and Product Pauls.',
    content:
      'Will primarily show Analytics, and some Product links (maybe link to Virtual Studio, hotspots editor, or other tools Marys/Pauls would use).'
  },
  {
    title: 'For Artists',
    description: 'The awesome Artie Artists.',
    content:
      'Will link to glTF Editor tool, most recent models/materials/textures uploaded or worked with.'
  },
  {
    title: 'For Developers',
    description: 'The Webdev Waynes of the world (party on, Garth).',
    content: 'Will link to UI Builder, developer docs, etc.'
  }
]
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Welcome!</h1>
    <!-- <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline"> Edit Profile </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Name </Label>
            <Input id="name" value="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Username </Label>
            <Input id="username" value="@peduarte" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"> Save changes </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> -->
    <div class="mb-4">
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="I am a..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <!-- <SelectLabel>I am a...</SelectLabel> -->
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
        <!-- <CardFooter> Card Footer </CardFooter> -->
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
    </div>
  </div>
</template>

<style scoped></style>
