import { h } from 'vue'

import { useProductsStore, type IProduct } from '@/stores/products'
const products = useProductsStore().products

import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircleCheck,
  IconCircle,
  IconCircleX,
  IconHelpCircle,
  IconClockHour4
} from '@tabler/icons-vue'

export const labels = [
  {
    value: 'client',
    label: 'Client'
  },
  {
    value: 'demo',
    label: 'Demo'
  }
]

export const statuses = [
  {
    value: 'published',
    label: 'Published',
    icon: h(IconCircleCheck, { class: 'text-emerald-600' })
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: h(IconCircle, { class: 'text-amber-500' })
  }
  // {
  //   value: 'backlog',
  //   label: 'Backlog',
  //   icon: h(IconHelpCircle)
  // },
  // {
  //   value: 'todo',
  //   label: 'Todo',
  //   icon: h(IconCircle)
  // },
  // {
  //   value: 'in progress',
  //   label: 'In Progress',
  //   icon: h(IconClockHour4)
  // },
  // {
  //   value: 'done',
  //   label: 'Done',
  //   icon: h(IconCircleCheck)
  // },
  // {
  //   value: 'canceled',
  //   label: 'Canceled',
  //   icon: h(IconCircleX)
  // }
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: h(IconArrowDown)
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: h(IconArrowRight)
  },
  {
    label: 'High',
    value: 'high',
    icon: h(IconArrowUp)
  }
]

// export const workspaces = [
//   { label: 'crate-barrel-assets', value: 'crate-barrel-assets' },
//   { label: 'demo-assets', value: 'demo-assets' },
//   { label: 'rh-assets', value: 'rh-assets' }
// ]

export const workspaces = products
  .reduce(
    (acc, obj) => {
      if (!acc.some((item) => item.value === obj.workspace)) {
        acc.push({
          label: obj.workspace,
          value: obj.workspace
        })
      }
      return acc
    },
    [] as { label: string; value: string }[]
  )
  .sort((a, b) => a.label.localeCompare(b.label))
