<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useTestRolesStore } from '@/stores/testRoles'
const currentTestRole = useTestRolesStore().currentTestRole

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import WorkspaceSelect from './WorkspaceSelect.vue'

import { routes, type IRouteCategory } from './navRoutes'

import DoppleLogoStacked from '@/assets/img/dopple-logo-stacked.svg'
import DoppleLogoIcon from '@/assets/img/dopple-logo-icon.svg'
import IconTreeBranch from '@/assets/icons/tree-branch.svg'
import IconTreeCorner from '@/assets/icons/tree-corner.svg'
import IconTreeSplit from '@/assets/icons/tree-split.svg'

defineProps<{
  isCollapsed: boolean
}>()

const route = useRoute()

function itemPath(path: string) {
  if (path.startsWith('/')) {
    return path
  } else {
    return `/w/${route.params.workspace}/${path}`
  }
}

const filteredSidenavItems = computed(() => {
  // let arr = routes
  // if (!route.params.workspace) {
  //   arr = routes.filter((item) => ['Settings', 'Resources'].includes(item.title))
  // }
  // return arr

  return routes.reduce((acc, curr) => {
    let updatedRoutes = curr.routes.map(r => {
      if (r.name !== 'Workspaces') {
        return r
      }

      if (route.params.workspace && r.name === 'Workspaces') {
        return {
          ...r,
          subroutes: [
            {
              name: route.params.workspace,
              path: ''
            }
          ]
          // path: r.path === '' ? '/workspace2' : r.path
        }
      }
      
      else {
        return r
      }
    })

    if (!route.params.workspace && curr.title === '') {
      updatedRoutes = updatedRoutes.filter(r => r.name !== 'Workspace Overview')
    }

    acc.push({ ...curr, routes: updatedRoutes })
    return acc
  }, [])
})

console.log(filteredSidenavItems.value)
</script>

<template>
  <aside
    class="inset-y fixed left-0 z-2 flex h-full flex-col border-r"
    :class="[$props.isCollapsed ? 'w-16' : 'w-64']">
    <TooltipProvider>
      <RouterLink to="/">
        <component
          :is="DoppleLogoStacked"
          v-show="!isCollapsed"
          class="max-w-24 mx-auto my-4 h-auto" />
        <component :is="DoppleLogoIcon" v-show="isCollapsed" class="w-6 mx-auto my-4 h-auto" />
      </RouterLink>
      <Tooltip>
        <TooltipTrigger as-child>
          <button
            @click="$emit('toggle-collapsed')"
            class="w-6 h-6 absolute top-3 -right-3 border bg-white rounded-lg p-1">
            <svg
              viewBox="0 0 16 16"
              class="line-icon"
              :class="$props.isCollapsed ? 'rotate-180' : ''">
              <path d="M10 3l-5 5 5 5" />
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p class="text-sm">{{ $props.isCollapsed ? 'Expand' : 'Collapse' }} Sidebar</p>
        </TooltipContent>
      </Tooltip>
      <div v-show="!isCollapsed" class="px-4 mb-4">
        <WorkspaceSelect />
      </div>
      <div class="w-max text-xs text-amber-700 bg-amber-600/10 px-3 mx-auto py-2 mt-1 mb-4 rounded">
        <em>***Nav is under reconstruction***</em>
      </div>
      <nav class="overflow-y-auto" :class="[$props.isCollapsed ? 'px-3' : 'px-4']">
        <div
          v-for="(category, categoryIndex) in filteredSidenavItems"
          :key="categoryIndex"
          class="grid grid-cols-1">
          <h2
            v-if="category.title !== '' && !isCollapsed"
            class="mt-4 px-2 py-2 text-xs text-slate-500 font-bold uppercase">
            {{ category.title }}
          </h2>
          <hr
            v-if="category.title && isCollapsed"
            class="bg-slate-200 w-8 h-1 mx-auto my-4 rounded-lg" />
          <template v-for="(item, itemIndex) in category.routes" :key="itemIndex">
            <Tooltip>
              <TooltipTrigger as-child v-show="!$props.isCollapsed">
                <a
                  v-if="item.path.startsWith('http')"
                  :href="item.path"
                  target="_blank"
                  v-show="$props.isCollapsed"
                  class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 after:-left-3"
                  :class="[item.name.toLowerCase() === 'overview' ? 'workspace-overview-link' : '']">
                  <component :is="item.icon" class="size-6 shrink-0" />
                </a>
                <RouterLink
                  v-else
                  :to="itemPath(item.path)"
                  v-show="$props.isCollapsed"
                  class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 after:-left-3"
                  :class="[item.name.toLowerCase() === 'overview' ? 'workspace-overview-link' : '']">
                  <component :is="item.icon" class="size-6 shrink-0" />
                </RouterLink>
              </TooltipTrigger>
              <TooltipContent side="right" :side-offset="5">
                {{ item.name }}
              </TooltipContent>
              <a
                v-if="item.path.startsWith('http')"
                :href="item.path"
                target="_blank"
                v-show="!$props.isCollapsed"
                class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 select-none after:-left-4"
                :class="[item.name.toLowerCase() === 'overview' ? 'workspace-overview-link' : '']">
                <component :is="item.icon" class="size-6 shrink-0" />
                <span class="truncate">{{ item.name }}</span>
              </a>
              <RouterLink
                v-else
                :to="itemPath(item.path)"
                v-show="!$props.isCollapsed"
                class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 select-none after:-left-4"
                :class="[item.name.toLowerCase() === 'overview' ? 'workspace-overview-link' : '']">
                <component :is="item.icon" class="size-6 shrink-0" />
                <span class="truncate">{{ item.name }}</span>
              </RouterLink>
            </Tooltip>
            <ul v-if="item.subroutes && !$props.isCollapsed" class="mb-4">
              <li v-for="(subroute, subrouteIndex) in item.subroutes" :key="subrouteIndex" class="h-6">
                <RouterLink
                  :to="itemPath(subroute.path)"
                  class="text-sm inline-flex items-center justify-start gap-2 px-2 w-full h-6 transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 select-none after:-left-4">
                  <component :is="subrouteIndex === item.subroutes.length - 1 ? IconTreeCorner : IconTreeSplit" class="size-6 shrink-0 text-slate-300" />
                  <span class="truncate">{{ subroute.name }}</span>
                </RouterLink>
              </li>
            </ul>
          </template>
        </div>
      </nav>
    </TooltipProvider>
  </aside>
</template>

<style scoped>
nav a::after {
  @apply content-[''] absolute top-0 h-full bg-blue-500 rounded-r-lg w-1 transition duration-500 -translate-x-[calc(100%+1px)];
}
nav a.router-link-exact-active,
nav a.router-link-active:not(.workspace-overview-link) {
  @apply text-blue-500 bg-opacity-5;
}
nav a.router-link-exact-active::after,
nav a.router-link-active:not(.workspace-overview-link)::after {
  @apply translate-x-0;
}
</style>
