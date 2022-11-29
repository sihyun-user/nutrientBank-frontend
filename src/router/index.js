import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'

import UserAuth from '@/views/UserAuth.vue'
import UserCenter from '@/views/UserCenter.vue'
import UserWall from '@/views/userWall.vue'
import UserSearch from '@/views/UserSearch.vue'

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
  {
    path: '/user-wall',
    redirect: '/user-wall',
    component: UserCenter,
    children: [
      { path: '/user-wall', component: UserWall, meta: { requiresAuth: true } },
      { path: '/user-search', component: UserSearch, meta: { requiresAuth: true } }
    ]
  },
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
    next('/user-wall')
  } else {
    next()
  }
})

export default router