import {
  IconBox,
  IconChartDots,
  IconExternalLink,
  IconFileCode,
  IconSettings,
  IconSlideshow,
  IconUsers,
  IconWorld
} from '@tabler/icons-vue'

import WorkspacesIcon from '@/assets/icons/workspaces.svg'

import GltfEditor from '@/assets/icons/gltf-editor.svg'
import HomeIcon from '@/assets/icons/home.svg'
import ShoppingBagIcon from '@/assets/icons/shopping-bag.svg'
import MaterialIcon from '@/assets/icons/material.svg'
import TextureIcon from '@/assets/icons/texture.svg'
import UiBuilder from '@/assets/icons/ui-builder.svg'

interface RouteCategory {
  title: string
  routes: Route[]
}

interface Route {
  name: string
  path: string
  icon?: any
  subroutes?: Route[]
}

export const routes: RouteCategory[] = [
  {
    title: '',
    routes: [
      {
        name: 'Overview',
        icon: HomeIcon,
        path: ''
      }
    ]
  },
  {
    title: 'Asset Library',
    routes: [
      {
        name: 'Products',
        icon: ShoppingBagIcon,
        path: 'products'
      },
      {
        name: 'Models',
        icon: IconBox,
        path: 'models'
      },
      {
        name: 'Materials',
        icon: MaterialIcon,
        path: 'materials'
      },
      {
        name: 'Textures',
        icon: TextureIcon,
        path: 'textures'
      }
    ]
  },
  {
    title: 'Tools & Insights',
    routes: [
      {
        name: 'Analytics',
        icon: IconChartDots,
        path: 'analytics',
        subroutes: [
          {
            name: 'Sessions',
            path: 'analytics/sessions'
          },
          {
            name: 'Conversions',
            path: 'analytics/conversions'
          },
          {
            name: 'Products',
            path: 'analytics/products'
          },
          {
            name: 'Configurations',
            path: 'analytics/configurations'
          },
          {
            name: 'Preferences',
            path: 'analytics/preferences'
          },
          {
            name: 'Hotspots',
            path: 'analytics/hotspots'
          },
          {
            name: 'All Events',
            path: 'analytics/all-events'
          }
        ]
      },
      {
        name: 'glTF Editor',
        icon: GltfEditor,
        path: 'editor'
      },
      {
        name: 'Virtual Studio',
        icon: IconSlideshow,
        path: 'studio'
      },
      {
        name: 'UI Builder',
        icon: UiBuilder,
        path: 'ui-builder'
      }
    ]
  },
  {
    title: 'Settings',
    routes: [
      {
        name: 'Workspaces',
        icon: WorkspacesIcon,
        path: '/workspaces'
      },
      {
        name: 'Domains',
        icon: IconWorld,
        path: '/domains'
      },
      {
        name: 'Team',
        icon: IconUsers,
        path: '/team'
      },
      {
        name: 'Account Settings',
        icon: IconSettings,
        path: '/settings'
      }
    ]
  },
  {
    title: 'Resources',
    routes: [
      { name: 'Documentation', icon: IconFileCode, path: 'https://docs.dopple.io' },
      { name: 'Dopple.io', icon: IconExternalLink, path: 'https://www.dopple.io' }
    ]
  }
]
