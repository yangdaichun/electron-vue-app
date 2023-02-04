import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/layout'),
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          keepAlive: true,
        },
        component: () => import('@/views/home'),
      },
      {
        path: '/search',
        name: 'Search',
        meta: {
          keepAlive: true,
        },
        component: () => import('@/views/search'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
