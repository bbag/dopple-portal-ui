<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { routes } from './navRoutes'

import DoppleLogoStacked from '@/assets/img/dopple-logo-stacked.svg'
import DoppleLogoIcon from '@/assets/img/dopple-logo-icon.svg'

defineProps<{
  isCollapsed: boolean
}>()

const route = useRoute()
</script>

<template>
  <aside
    class="inset-y fixed left-0 z-2 flex h-full flex-col border-r"
    :class="[$props.isCollapsed ? 'w-16' : 'w-64']"
  >
    <!-- <pre>{{ routes }}</pre> -->
    <RouterLink to="/">
      <component
        :is="DoppleLogoStacked"
        v-show="!isCollapsed"
        class="max-w-32 mx-auto my-8 h-auto"
      />
      <component :is="DoppleLogoIcon" v-show="isCollapsed" class="w-8 mx-auto my-4 h-auto" />
    </RouterLink>
    <button
      @click="$emit('toggle-collapsed')"
      class="w-6 h-6 absolute top-3 -right-3 border bg-white rounded-lg p-1"
    >
      <svg viewBox="0 0 16 16" class="line-icon" :class="$props.isCollapsed ? 'rotate-180' : ''">
        <path d="M10 3l-5 5 5 5" />
      </svg>
    </button>
    <nav :class="[$props.isCollapsed ? 'px-3' : 'px-4']">
      <TooltipProvider>
        <div v-for="(category, categoryIndex) in routes" :key="categoryIndex" class="grid gap-1">
          <h2
            v-if="category.title && !isCollapsed"
            class="mt-4 px-2 py-2 text-xs text-slate-500 font-bold uppercase"
          >
            {{ category.title }}
          </h2>
          <hr
            v-if="category.title && isCollapsed"
            class="bg-slate-200 w-8 h-1 mx-auto my-4 rounded-lg"
          />
          <template v-for="(item, itemIndex) in category.routes" :key="itemIndex">
            <Tooltip>
              <TooltipTrigger as-child v-show="!$props.isCollapsed">
                <RouterLink
                  :to="`/w/${$route.params.workspace}/${item.path}`"
                  v-show="$props.isCollapsed"
                  class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full whitespace-nowrap transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 after:-left-3"
                  :class="[item.name.toLowerCase() === 'overview' ? 'workspace-overview-link' : '']"
                >
                  <component :is="item.icon" class="size-6" />
                </RouterLink>
              </TooltipTrigger>
              <TooltipContent side="right" :side-offset="5">
                {{ item.name }}
              </TooltipContent>
              <RouterLink
                :to="`/w/${$route.params.workspace}/${item.path}`"
                v-show="!$props.isCollapsed"
                class="inline-flex items-center justify-start gap-2 h-10 px-2 w-full whitespace-nowrap transition-colors relative rounded-lg bg-blue-500 bg-opacity-0 hover:text-blue-500 select-none after:-left-4"
                :class="[item.name.toLowerCase() === 'overview' ? 'workspace-overview-link' : '']"
              >
                <component :is="item.icon" class="size-6" />
                {{ item.name }}
              </RouterLink>
            </Tooltip>
          </template>
        </div>
      </TooltipProvider>
    </nav>
  </aside>
</template>

<style scoped>
a::after {
  @apply content-[''] absolute top-0 h-full bg-blue-500 rounded-r-lg w-1 transition duration-500 -translate-x-[calc(100%+1px)];
}
a.router-link-exact-active,
a.router-link-active:not(.workspace-overview-link) {
  @apply text-blue-500 bg-opacity-5;
}
a.router-link-exact-active::after,
a.router-link-active:not(.workspace-overview-link)::after {
  @apply translate-x-0;
}
</style>
