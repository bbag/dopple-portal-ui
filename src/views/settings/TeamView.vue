<script setup lang="ts">
import { ref } from 'vue'

import LayoutMain from '@/components/layouts/LayoutMain.vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { IconCircleCheck, IconDots } from '@tabler/icons-vue'

const roles = [
  {
    title: 'Admin'
  },
  {
    title: 'Editor'
  },
  {
    title: 'Viewer'
  }
]

const permissions = [
  {
    text: 'View analytics for products',
    allowedRoles: ['Admin', 'Editor', 'Viewer']
  },
  {
    text: 'Add/edit/remove whitelisted domains',
    allowedRoles: ['Admin', 'Editor']
  },
  {
    text: 'Create/edit/delete products',
    allowedRoles: ['Admin', 'Editor']
  },
  {
    text: 'Add/remove team members',
    allowedRoles: ['Admin']
  }
]

const teamMembers = ref([
  {
    name: 'Amanda Admin',
    email: 'amanda@example.com',
    role: 'Admin'
  },
  {
    name: 'Adam Admin',
    email: 'adam@example.com',
    role: 'Admin'
  },
  {
    name: 'Webdev Wayne',
    email: 'wayne@example.com',
    role: 'Editor'
  },
  {
    name: 'Artie Artist',
    email: 'artie@example.com',
    role: 'Editor'
  },
  {
    name: 'Marketing Mary',
    email: 'mary@example.com',
    role: 'Viewer'
  },
  {
    name: 'Product Paul',
    email: 'paul@example.com',
    role: 'Editor'
  }
])

const inviteMember = ref({
  email: '',
  role: 'Viewer'
})
</script>

<template>
  <LayoutMain>
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Team</h1>
      <div class="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Members</CardTitle>
            <CardDescription>Add, edit, or remove members on your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead class="w-full">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="person in teamMembers" :key="person.email">
                  <TableCell class="font-medium whitespace-nowrap">
                    {{ person.name }}
                  </TableCell>
                  <TableCell class="whitespace-nowrap">
                    {{ person.email }}
                  </TableCell>
                  <TableCell>
                    <Select v-model="person.role">
                      <SelectTrigger class="w-32">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem v-for="role in roles" :key="role.title" :value="role.title">
                            {{ role.title }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell class="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon-sm">
                          <IconDots class="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem> Edit </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem class="text-red-600"> Delete </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Add Member</CardTitle>
            <CardDescription>
              Add members to your team. They will receive an invitation email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid w-full gap-4 grid-cols-[5fr,2fr]">
              <div class="grid w-full items-center gap-1.5">
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  v-model="inviteMember.email"
                  class="w-full"
                />
              </div>
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="role">Role</Label>
                <Select v-model="inviteMember.role">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="role in roles" :key="role.title" :value="role.title">
                        {{ role.title }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="mt-4">
              <Button>Send Invite</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Roles &amp; Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  <TableHead v-for="role in roles" :key="role.title" class="text-center">
                    {{ role.title }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="permission in permissions" :key="permission.text">
                  <TableCell>
                    {{ permission.text }}
                  </TableCell>
                  <TableCell v-for="role in roles" :key="role.title">
                    <IconCircleCheck
                      class="w-5 h-5 text-green-500 mx-auto"
                      v-if="permission.allowedRoles.includes(role.title)"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  </LayoutMain>
</template>

<style scoped></style>
