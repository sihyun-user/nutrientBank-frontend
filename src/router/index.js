import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '../store'

import UserAuth from '../views/UserAuth.vue'
import UserDiary from '../views/UserDiary.vue'

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  { path: '/diary', component: UserDiary, meta: { requiresAuth: true } },
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

router.beforeEach(function(to, _, next){
  const store = useStore()
  store.tryLogin()

  const isLiginCall = store.isLogin
  if (to.meta.requiresAuth && !isLiginCall) {
    alert('尚未登入')
    next('/auth')
  } else if (to.meta.requiresUnauth && isLiginCall) {
    next('/diary')
  } else {
    next()
  }
})

export default router