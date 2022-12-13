import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('../views/dashboard/index.vue'),
    redirect: '/dashboard/area',
    children: [
      {
        name: 'area',
        path: 'area',
        component: () => import('../views/area/index.vue')
      },
      {
        name: 'room',
        path: 'room',
        component: () => import('../views/room/index.vue')
      },
      {
        name: 'equiplist',
        path: 'equiplist',
        component: () => import('../views/equipment/equiplist.vue')
      },
      {
        name: 'visual',
        path: 'visual',
        component: () => import('../views/visual/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
