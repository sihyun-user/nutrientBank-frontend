import { createRouter, createWebHistory } from 'vue-router'

import UserAuth from '../views/UserAuth.vue'
import UserDiary from '../views/UserDiary.vue'

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: UserAuth },
  { path: '/diary', component: UserDiary },
  { path: '/:notFound(.*)', redirect: '/auth' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
})

export default router