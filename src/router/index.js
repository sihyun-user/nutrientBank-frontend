import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '../store'

import UserAuth from '../views/UserAuth.vue'
import UserCenter from '../views/UserCenter.vue'
import UserWall from '../views/UserWall.vue'

const routes = [
  { path: '/', redirect: '/userAuth' },
  { path: '/userAuth', component: UserAuth, meta: { requiresUnauth: true } },
  {
    path: '/userWall',
    redirect: '/userWall',
    component: UserCenter,
    children: [
      { path: '/userWall', component: UserWall, meta: { requiresAuth: true } },
    ]
  },
  { path: '/:notFound(.*)', redirect: '/userAuth' }
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
    next('/userAuth')
  } else if (to.meta.requiresUnauth && isLiginCall) {
    next('/userWall')
  } else {
    next()
  }
})

export default router