import router from '@/router'
import { defineStore } from 'pinia'
import { checkConsole, appError } from '@/service/helper'
import * as appApi from '@/service/api'

export const useStore = defineStore('main', {
  state: () => ({
    userId: '',
    errorMsg: '',
    isLogin: false,
    isLoading: false,
    userInfo: {}
  }),
  actions: {
    tryLogin() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const tokenExpiration = localStorage.getItem('tokenExpiration')

      const expiresIn = +tokenExpiration - new Date().getTime()

      if (expiresIn < 0) {
        return this.$patch({ isLogin: false })
      }

      if (token && userId) {
        this.$patch({ isLogin: true, userId })
      }
    },
    tryAuth(payload) {
      // const expiresIn = 1000 * 60 * 1 // 分鐘
      const expiresIn = 1000 * 3600 * 24 * 7 // 7day
      const expirationDate = new Date().getTime() + expiresIn
      const { token, userId } = payload

      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      localStorage.setItem('tokenExpiration', expirationDate)

      this.$patch({ userId })
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiration')
      this.$reset()
      router.replace('/auth')
    },
    // 登入
    async login(payload) {
      try {
        this.$patch({ isLoading: true })
        const { email, password } = payload

        const res = await appApi.apiUserLogin({ email, password })
        const data = res.data.data

        this.tryAuth({ token: data.token, userId: data.user.id })
        this.getUserInfo()
        
        this.$patch({ isLoading: false, isLogin: true })
        checkConsole('登入成功', res.data)
        alert('登入成功')
        router.push('user-wall')
      } catch (error) {
        appError(error, '登入失敗')
      }
    },
    // 註冊
    async signup(payload) {
      try {
        this.$patch({ isLoading: true })
        const { name, email, password, confirmPassword } = payload

        const res = await appApi.apiUserSignup({ name, email, password, confirmPassword })

        this.$patch({ isLoading: false })
        checkConsole('註冊成功', res.data)
        alert('註冊成功，請重新登入')
        return true
      } catch (error) {
        appError(error, '註冊失敗')
      }
    },
    // 取得會員資料
    async getUserInfo() {
      try {
        this.$patch({ isLoading: true })

        const res = await appApi.apiGetUserInfo()

        this.$patch({ isLoading: false, userInfo: res.data.data })
        checkConsole('取得會員資成功', res.data)
      } catch (error) {
        appError(error, '取得會員資料失敗')
      }
    },
    // 新增一筆營養日記
    async createOneDiary(payload) {
      try {
        const { foodId, paramData } = payload
        this.$patch({ isLoading: true })
        const res = await appApi.apiCreateOneDiary({ foodId, paramData })

        this.$patch({ isLoading: false })
        checkConsole('新增一筆營養日記成功', res.data)
      } catch (error) {
        appError(error, '新增一筆營養日記失敗')
      }
    }
  },
  getters: {
  },
  persist: true
})