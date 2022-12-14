import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'

const routes = [
  { path: '/', redirect: '/user-wall' },
  { path: '/auth', meta: { requiresUnauth: true }, component: () => import('@/views/UserAuth.vue') },
  { path: '/admin', meta: { requiresAuth: true }, component: () => import('@/views/AdminData.vue') },
  {
    path: '/user-wall',
    redirect: '/user-wall',
    component: () => import('@/views/UserCenter.vue'),
    children: [
      { path: '/user-wall', meta: { requiresAuth: true }, component: () => import('@/views/UserWall.vue') },
      { path: '/user-search', meta: { requiresAuth: true }, component: () => import('@/views/UserSearch.vue') },
      { path: '/user-diarys', meta: { requiresAuth: true }, component: () => import('@/views/UserDiarys.vue') }
    ]
  },
  {
    path: '/edit-personal',
    redirect: '/edit-personal',
    component: () => import('@/views/InfoCenter.vue'),
    children: [
      { path: '/edit-personal', meta: { requiresAuth: true }, component: () => import('@/views/EditPersonal.vue') },
      { path: '/edit-password', meta: { requiresAuth: true }, component: () => import('@/views/EditPassword.vue') },
      { path: '/edit-foods', meta: { requiresAuth: true }, component: () => import('@/views/EditFoods.vue') },
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

router.beforeEach((to, _, next) => {
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