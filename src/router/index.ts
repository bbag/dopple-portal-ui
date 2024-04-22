import { createRouter, createWebHistory } from 'vue-router'
import { useNavHistoryStore } from '@/stores/navHistory'

import RootView from '../views/RootView.vue'
import NotFound from '../views/NotFound.vue'
import WorkspacesRootView from '../views/workspaces/WorkspacesRootView.vue'
import WorkspaceView from '../views/workspaces/WorkspaceView.vue'

import { useWorkspacesStore } from '@/stores/workspaces'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: RootView
    },
    {
      path: '/w/:workspace',
      name: 'Workspace',
      component: WorkspaceView,
      children: [
        {
          path: '',
          name: 'Overview',
          component: () => import('@/views/workspaces/WorkspaceOverviewView.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/products/ProductsRootView.vue'),
          children: [
            {
              path: '',
              name: 'ProductsList',
              component: () => import('@/views/products/ProductsListView.vue')
            },
            {
              path: ':name',
              name: 'Product',
              component: () => import('@/views/products/ProductView.vue'),
              children: [
                {
                  path: '',
                  name: 'Product Overview',
                  component: () => import('@/views/products/ProductOverviewView.vue')
                },
                {
                  path: 'hotspots',
                  name: 'Hotspots',
                  component: () => import('@/views/products/ProductHotspotsView.vue')
                },
                {
                  path: 'cameras',
                  name: 'Cameras',
                  component: () => import('@/views/products/ProductCamerasView.vue')
                },
                {
                  path: 'environment',
                  name: 'Environment',
                  component: () => import('@/views/products/ProductEnvironmentView.vue')
                },
                {
                  path: 'configuration',
                  name: 'Configuration',
                  component: () => import('@/views/products/ProductConfigurationView.vue')
                },
                {
                  path: 'preview',
                  name: 'Live Preview',
                  component: () => import('@/views/products/ProductLivePreviewView.vue')
                }
              ]
            }
          ]
        },
        {
          path: 'models',
          name: 'Models',
          component: () => import('@/views/models/ModelsRootView.vue'),
          children: [
            {
              path: '',
              name: 'ModelsList',
              component: () => import('@/views/models/ModelsListView.vue')
            }
          ]
        },
        {
          path: 'materials',
          name: 'Materials',
          component: () => import('@/views/materials/MaterialsRootView.vue'),
          children: [
            {
              path: '',
              name: 'MaterialsList',
              component: () => import('@/views/materials/MaterialsListView.vue')
            }
          ]
        },
        {
          path: 'textures',
          name: 'Textures',
          component: () => import('@/views/textures/TexturesRootView.vue'),
          children: [
            {
              path: '',
              name: 'TexturesList',
              component: () => import('@/views/textures/TexturesListView.vue')
            }
          ]
        },
        {
          path: 'analytics',
          name: 'Analytics',
          component: () => import('@/views/analytics/AnalyticsRootView.vue')
        },
        {
          path: 'editor',
          name: 'glTF Editor',
          component: () => import('@/views/tools/GltfEditorView.vue'),
          children: [
            {
              path: '',
              name: 'glTF Editor Home',
              component: () => import('@/views/tools/GltfEditorRootView.vue')
            },
            {
              path: ':name',
              name: 'Product (glTF Editor)',
              component: () => import('@/views/tools/GltfEditorProductView.vue')
            }
          ]
        },
        {
          path: 'studio',
          name: 'Virtual Studio',
          component: () => import('@/views/tools/VirtualStudioView.vue'),
          children: [
            {
              path: '',
              name: 'Virtual Studio Home',
              component: () => import('@/views/tools/VirtualStudioRootView.vue')
            },
            {
              path: ':name',
              name: 'Product (Virtual Studio)',
              component: () => import('@/views/tools/VirtualStudioProductView.vue')
            }
          ]
        },
        {
          path: 'ui-builder',
          name: 'UI Builder',
          component: () => import('@/views/tools/UiBuilderView.vue'),
          children: [
            {
              path: '',
              name: 'UI Builder Home',
              component: () => import('@/views/tools/UiBuilderRootView.vue')
            },
            {
              path: ':name',
              name: 'Product (UI Builder)',
              component: () => import('@/views/tools/UiBuilderProductView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/settings/AccountSettingsView.vue')
    },
    {
      path: '/domains',
      name: 'Domains',
      component: () => import('@/views/settings/DomainsView.vue')
    },
    {
      path: '/team',
      name: 'Team',
      component: () => import('@/views/settings/TeamView.vue')
    },
    {
      path: '/workspaces',
      name: 'Workspaces',
      component: WorkspacesRootView,
      alias: '/w'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

// Used for updating the currently-selected workspace in the side-nav
router.beforeEach((to, from, next) => {
  const workspacesStore = useWorkspacesStore()
  if (to.params.workspace) {
    if (typeof to.params.workspace === 'string') {
      workspacesStore.currentWorkspace = to.params.workspace
    } else {
      workspacesStore.currentWorkspace = to.params.workspace[0]
    }
  } else {
    workspacesStore.currentWorkspace = ''
  }
  next()
})

router.afterEach(() => {
  useNavHistoryStore().canGoBack = router.options.history.state.back ? true : false
  useNavHistoryStore().canGoForward = router.options.history.state.forward ? true : false
})

export default router
