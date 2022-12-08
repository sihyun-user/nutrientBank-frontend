import { defineStore } from 'pinia'
import router from '@/router'
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
        router.push('user-wall')
        alert('登入成功')
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
        const res = await appApi.apiGetProfile()

        this.$patch({ isLoading: false, userInfo: res.data.data })
        checkConsole('取得會員資成功', res.data)
      } catch (error) {
        appError(error, '取得會員資料失敗')
      }
    },
    // 編輯會員資料
    async updateProfile(payload) {
      try {
        this.$patch({ isLoading: true })

        const res = await appApi.apiUpdateProfile(payload)

        this.getUserInfo()

        this.$patch({ isLoading: false })
        checkConsole('編輯會員資料成功', res.data)
        alert('編輯會員資料成功')
      } catch (error) {
        appError(error, '編輯會員資料失敗')
      }
    },
    // 編輯會員密碼
    async updatePassword(payload) {
      try {
        this.$patch({ isLoading: true })

        const { password, confirmPassword } = payload

        const res = await appApi.apiUpdatePassword({ password, confirmPassword })
  
        this.$patch({ isLoading: false })
        checkConsole('編輯會員密碼成功', res.data)
        alert('編輯會員密碼成功')
      } catch (error) {
        appError(error, '編輯會員密碼失敗')
      }
    },
    // 取得營養日記列表
    async getDiarys(payload) {
      try {
        this.$patch({ isLoading: true })
        const res = await appApi.apiGetDiarys(payload)

        this.$patch({ isLoading: false })
        checkConsole('取得營養日記列表成功', res.data)
        return res.data.data
      } catch (error) {
        appError(error, '取得營養日記列表失敗')
      }
    },
    // 新增一筆營養日記
    async createOneDiary(payload) {
      try {
        this.$patch({ isLoading: true })
        const { foodId, paramData } = payload

        const res = await appApi.apiCreateOneDiary({ foodId, paramData })

        this.$patch({ isLoading: false })
        checkConsole('新增一筆營養日記成功', res.data)
        alert('新增營養日記成功')
      } catch (error) {
        appError(error, '新增一筆營養日記失敗')
        alert('新增營養日記失敗，請稍後再試')
      }
    },
    // 取得食品列表
    async getAllFood(payload) {
      try {
        this.$patch({ isLoading: true })

        const res = await appApi.apiGetAllfFood(payload)

        this.$patch({ isLoading: false })
        checkConsole('取得食品列表成功', res.data)
        return res.data.data
      } catch (error) {
        appError(error, '取得食品列表失敗')
      }
    },
    // 取得自訂食品列表
    async getAllCustomFood(payload={search: ''}) {
      try {
        this.$patch({ isLoading: true })

        const res = await appApi.apiGetAllCustomFood(payload)

        this.$patch({ isLoading: false })
        checkConsole('取得自訂食品列表成功', res.data)
        return res.data.data
      } catch (error) {
        appError(error, '取得自訂食品列表失敗')
      }
    },
    // 新增一筆自訂食品
    async createCustomFood(payload) {
      try {
        this.$patch({ isLoading: true })
        const { foodId, paramData } = payload

        const res = appApi.apiCreateCustomFood({foodId, paramData})
        this.$patch({ isLoading: false })
        checkConsole('新增一筆自訂食品成功', res.data)
        alert('新增一筆自訂食品成功')
      } catch (error) {
        appError(error, '新增一筆自訂食品失敗')
        alert('新增一筆自訂食品失敗，請稍後再試')
      }
    },
    // 編輯一筆自訂食品
    async updateCustomFood(payload) {
      try {
        this.$patch({ isLoading: true })
        const { foodId, paramData } = payload

        const res = await appApi.apiUpdateCustomFood({foodId, paramData})

        this.$patch({ isLoading: false })
        checkConsole('編輯一筆自訂食品成功', res.data)
        alert('編輯一筆自訂食品成功')
        return true
      } catch (error) {
        appError(error, '編輯一筆自訂食品失敗')
        alert('編輯一筆自訂食品失敗，請稍後再試')
      }
    },
    // 刪除一筆自訂食品
    async deleteCustomFood(payload) {
      try {
        this.$patch({ isLoading: true })

        const res = await appApi.apiDeleteCustomFood(payload)

        this.$patch({ isLoading: false })
        checkConsole('刪除一筆自訂食品成功', res.data)
        alert('刪除一筆自訂食品成功')
      } catch (error) {
        appError(error, '刪除一筆自訂食品失敗')
        alert('刪除一筆自訂食品失敗，請稍後再試')
      }
    },
    // 取得食品書籤列表
    async getAllLikes(payload) {
      try {
        this.$patch({ isLoading: true })

        const res = await appApi.apiGetAllLikes(payload)

        this.$patch({ isLoading: false })
        checkConsole('取得食品書籤列表成功', res.data)
        return res.data.data
      } catch (error) {
        appError(error, '取得食品書籤列表失敗')
      }
    },
    // 取得一筆食品書籤
    async getOneLike(payload) {
      try {
        this.$patch({ isLoading: true })
        const { foodId, foodType } = payload

        const res = await appApi.apiGetOneLike({foodId, foodType})

        this.$patch({ isLoading: false })
        checkConsole('取得一筆食品書籤成功', res.data)
        return res.data.data
      } catch (error) {
        appError(error, '取得一筆食品書籤失敗')
      }
    },
    // 新增一筆食品書籤
    async addFoodLike(payload) {
      try {
        this.$patch({ isLoading: true })
        const { foodId, foodType } = payload

        const res = await appApi.apiAddFoodLike({foodId, foodType})

        this.$patch({ isLoading: false })
        checkConsole('新增一筆食品書籤成功', res.data)
      } catch (error) {
        appError(error, '新增一筆食品書籤失敗')
      }
    },
    // 刪除一筆食品書籤
    async cancelFoodLike(payload) {
      try {
        this.$patch({ isLoading: true })
        const { foodId, foodType } = payload

        const res = await appApi.apiCancelFoodLike({foodId, foodType})

        this.$patch({ isLoading: false })
        checkConsole('刪除一筆食品書籤成功', res.data)
      } catch (error) {
        appError(error, '新增一筆食品書籤失敗')
      }
    }
  },
  getters: {
  },
  persist: true
})