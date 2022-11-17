import { defineStore } from 'pinia'
import router from '../router'
import { checkConsole } from '../service/helper'
import * as appApi from '../service/api'

export const useStore = defineStore('main', {
  state: () => ({
    userId: '',
    errorMsg: '',
    isLogin: false,
    isLoading: false
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
    async login(payload) {
      try {
        this.$patch({ isLoading: true })
        const { email, password } = payload

        const res = await appApi.apiUserLogin({ email, password })
        const data = res.data.data

        this.tryAuth({ token: data.token, userId: data.user._id })

        this.$patch({ isLoading: false, isLogin: true })
        checkConsole('登入成功', res.data)
        alert('登入成功')
        router.push('userWall')
      } catch (error) {
        console.log(error)
        const message = error.response.data.message
        this.$patch({ isLoading: false, errorMsg: `登入失敗，${message}` })
        checkConsole('登入失敗', error.response)
      }
    },
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
        console.log(error)
        const message = error.response.data.message
        this.$patch({ isLoading: false, errorMsg: `註冊失敗，${message}` })
        checkConsole('註冊失敗', error.response)
      }
    }
  },
  getters: {
  },
  persist: true
})