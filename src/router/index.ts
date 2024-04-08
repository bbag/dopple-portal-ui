import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import WorkspacesRootView from '../views/WorkspacesRootView.vue'
import WorkspaceView from '../views/WorkspaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Workspaces',
      component: WorkspacesRootView,
      alias: '/w'
    },
    {
      path: '/w/:workspace',
      name: 'Workspace',
      component: WorkspaceView,
      children: [
        {
          path: '',
          name: 'Overview',
          component: () => import('@/views/HomeView.vue')
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
                }
              ]
            }
          ]
        },
        {
          path: 'models',
          name: 'Models',
          component: () => import('@/views/models/ModelsRootView.vue')
        },
        {
          path: 'materials',
          name: 'Materials',
          component: () => import('@/views/materials/MaterialsRootView.vue')
        },
        {
          path: 'textures',
          name: 'Textures',
          component: () => import('@/views/textures/TexturesRootView.vue')
        },
        {
          path: 'analytics',
          name: 'Analytics',
          component: () => import('@/views/analytics/AnalyticsRootView.vue')
        },

        {
          path: 'editor',
          name: 'glTF Editor',
          component: () => import('@/views/tools/GltfEditorView.vue')
        },
        {
          path: 'studio',
          name: 'Virtual Studio',
          component: () => import('@/views/tools/VirtualStudioView.vue')
        },
        {
          path: 'ui-builder',
          name: 'UI Builder',
          component: () => import('@/views/tools/UiBuilderView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
