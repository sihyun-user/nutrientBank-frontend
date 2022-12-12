<template>
  <section class="auth">
    <div class="auth__container">
      <div class="user">
        <div class="user__logo">
          <img src="@/assets/img/logo-bg.svg">
        </div>
        <div class="user__form">
          <div class="user__form-title">{{switchModeCaption}}</div>
          <!-- 登入 -->
          <form v-if="mode=='login'" class="user__form-login" @submit.prevent="login">
            <div class="user__form-entered">
              <label for="login-email">信箱</label>
              <input id="login-email" class="inputMode" type="email" v-model="auth.email">
            </div>
            <div class="user__form-entered">
              <label for="login-password">密碼</label>
              <input id="login-password" class="inputMode" type="password" v-model="auth.password">
            </div>
            <p v-if="errorMsg" class="user__form-errorMsg errorMsg">{{errorMsg}}</p>
            <button type="submit" class="user__form-btn">登入</button>
            <div class="user__form-direct">還不是會員，<span @click="switchAuthMode">加入會員</span></div>
          </form>

          <!-- 註冊 -->
          <form v-else class="user__form-register" @submit.prevent="signup">
            <div class="user__form-entered">
              <label for="register-name">暱稱</label>
              <input id="register-name" class="inputMode" type="text" v-model="auth.name">
            </div>
            <div class="user__form-entered">
              <label for="email">信箱</label>
              <input id="register-email" class="inputMode" type="email" v-model="auth.email">
            </div>
            <div class="user__form-entered">
              <label for="register-password">密碼</label>
              <input id="register-password" class="inputMode" type="password" v-model="auth.password">
            </div>
            <div class="user__form-entered">
              <label for="register-confirmPassword">密碼確認</label>
              <input id="register-confirmPassword" class="inputMode" type="password" v-model="auth.confirmPassword">
            </div>
            <p v-if="errorMsg" class="user__form-errorMsg errorMsg">{{errorMsg}}</p>
            <button type="submit" class="user__form-btn">註冊</button>
            <div class="user__form-direct">已經是會員，<span @click="switchAuthMode">直接登入</span></div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/store'
export default {
  setup() {
    const store = useStore()
    const mode = ref('login')
    const authOriganil = () => {
      return {
        name: '',
        email: 'sihyun@gmail.com',
        password: 'sihyun123456',
        confirmPassword: ''
      }
    }
    const auth = reactive(authOriganil())

    const errorMsg = computed(() => store.errorMsg)
    const isLoading = computed(() => store.isLoading)
    const switchModeCaption = computed(() => mode.value === 'login' ? '會員登入' : '會員註冊')
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

    // 切換登入/註冊
    const switchAuthMode = () => {
      clearForm()
      mode.value === 'login' ? mode.value = 'signup' : mode.value = 'login'
    }
    // 登入
    const login = () => {
      store.$patch({ errorMsg: '' })

      if (!auth.email || !emailRule.test(auth.email)) {
        return store.$patch({ errorMsg: 'E-mail格式錯誤' })
      } else if (auth.password.length < 8) {
        return store.$patch({ errorMsg: '密碼字數低於8位' })
      }

      const payload = {
        email: auth.email,
        password: auth.password
      }
      store.login(payload)
    }
    // 註冊
    const signup = async() => {
      store.$patch({ errorMsg: '' })

      if (auth.name.length < 2) {
        return store.$patch({ errorMsg: '暱稱低於2個字元' })
      } else if (!auth.email || !emailRule.test(auth.email)) {
        return store.$patch({ errorMsg: 'E-mail格式錯誤' })
      } else if (auth.password.length < 8) {
        return  store.$patch({ errorMsg: '密碼字數低於8位' })
      } else if (auth.password !== auth.confirmPassword) {
        return  store.$patch({ errorMsg: '密碼不一致' })
      }
      
      const result = await store.signup(auth)
      if (result) switchAuthMode()
    }
    // 重置表單資料
    const clearForm = () => {
      store.$patch({ errorMsg: '' })
      Object.assign(auth, authOriganil())
    }

    return {
      mode,
      auth,
      errorMsg,
      isLoading,
      switchModeCaption,
      switchAuthMode,
      login,
      signup
    }
  }
}
</script>