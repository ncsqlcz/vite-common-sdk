import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import('@/views/AboutView.vue'),
  },
] as RouteRecordRaw[]
