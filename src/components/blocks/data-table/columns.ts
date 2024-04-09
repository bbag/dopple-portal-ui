import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { RouterLink } from 'vue-router'

import { labels, statuses } from './data'
import { type IProduct, type IVersion } from '@/stores/products'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
// import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import IconInfo from '@/assets/icons/info.svg'

import MotorcycleThumbnail from '@/assets/img/motorcycle.jpg'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})

export const columns: ColumnDef<IProduct>[] = [
  {
    id: 'info',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: '' }),
    cell: () =>
      h(Popover, {}, [
        h(
          PopoverTrigger,
          { class: 'font-medium flex items-center w-8' },
          h(IconInfo, { class: 'text-slate-400 h-4 w-4 mx-auto' })
        ),
        h(
          PopoverContent,
          { class: 'w-48' },
          h('img', { src: MotorcycleThumbnail, class: 'w-full h-auto' })
        )
      ]),
    enableSorting: false,
    enableHiding: false
  },
  // {
  //   id: 'select',
  //   header: ({ table }) =>
  //     h(Checkbox, {
  //       checked:
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate'),
  //       'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
  //       ariaLabel: 'Select all',
  //       class: 'translate-y-0.5'
  //     }),
  //   cell: ({ row }) =>
  //     h(Checkbox, {
  //       checked: row.getIsSelected(),
  //       'onUpdate:checked': (value) => row.toggleSelected(!!value),
  //       ariaLabel: 'Select row',
  //       class: 'translate-y-0.5'
  //     }),
  //   enableSorting: false
  // },
  {
    accessorKey: 'title',
    meta: { displayName: 'Title' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Title' }),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)
      return h(RouterLink, { to: `products/${row.original.name}`, class: 'flex space-x-2' }, [
        h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
        label ? h(Badge, { variant: 'outline', class: 'bg-background' }, () => label.label) : null
      ])
    },
    enableHiding: false
  },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Product ID' }),
  //   cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'name',
    meta: { displayName: 'Name' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
    cell: ({ row }) => h('div', { class: 'w-30 font-mono' }, row.getValue('name')),
    enableSorting: true
  },
  {
    accessorKey: 'workspace',
    meta: { displayName: 'Workspace' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Workspace' }),
    cell: ({ row }) => h('div', { class: 'w-30 font-mono' }, row.getValue('workspace')),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true
  },
  {
    accessorKey: 'versions',
    meta: { displayName: 'Version' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Version' }),
    // cell: ({ row }) => {
    //   const label = labels.find((label) => label.value === row.original.label)
    //   return h(RouterLink, { to: `products/${row.original.name}`, class: 'flex space-x-2' }, [
    //     h('span', { class: 'max-w-[500px] truncate font-medium' }, row.getValue('title')),
    //     label ? h(Badge, { variant: 'outline', class: 'bg-background' }, () => label.label) : null
    //   ])
    // },
    cell: ({ row }) => {
      const currentVersion = row
        .getValue<Array<IVersion>>('versions')
        .find((version) => version.isDefault)
      return h('div', { class: 'w-10 text-right' }, currentVersion?.draftRevision)
    },
    enableSorting: false
  },
  {
    accessorKey: 'status',
    meta: { displayName: 'Status' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue('status'))
      if (!status) return null
      return h('div', { class: 'flex w-[6rem] items-center' }, [
        status.icon && h(status.icon, { class: 'mr-2 h-4 w-4' }),
        h('span', status.label)
      ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    accessorKey: 'dateCreated',
    meta: { displayName: 'Date Created' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Date Created' }),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'whitespace-nowrap' },
        dateFormatter.format(row.getValue<Date>('dateCreated'))
      ),
    enableSorting: true
  },
  {
    accessorKey: 'dateModified',
    meta: { displayName: 'Date Modified' },
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Date Modified' }),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'whitespace-nowrap' },
        dateFormatter.format(row.getValue<Date>('dateModified'))
      ),
    enableSorting: true
  },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Priority' }),
  //   cell: ({ row }) => {
  //     const priority = priorities.find((priority) => priority.value === row.getValue('priority'))

  //     if (!priority) return null

  //     return h('div', { class: 'flex items-center' }, [
  //       priority.icon && h(priority.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground' }),
  //       h('span', {}, priority.label)
  //     ])
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   }
  // },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row })
  }
]
