<template>
  <div class="edit-password">
    <div class="edit-password__header">修改密碼</div>
    <form @submit.prevent="updatePassword">
      <div class="edit-password__ented">
        <label class="edit-password__ented-label">新密碼</label>
        <input class="edit-password__ented-text" type="password"
        placeholder="請輸入新密碼" v-model="pwd.password">
      </div>
      <div class="edit-password__ented">
        <label class="edit-password__ented-label">確認新密碼</label>
        <input class="edit-password__ented-text" type="password" 
        placeholder="請再次輸入新密碼" v-model="pwd.confirmPassword">
      </div>
      <div v-if="errorMsg" class="errorMsg edit-password__errorMsg">{{errorMsg}}</div>
      <div class="edit-password__btn">
        <button type="submit" class="orangeBigBtn">更新個人檔案</button>
      </div>
    </form>
  </div>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from '@/store'
export default {
  setup() {
    const store = useStore()
    const pwdOriganil = () => {
      return {
        password: '',
        confirmPassword: ''
      }
    }
    const pwd = reactive(pwdOriganil())

    const errorMsg = computed(() => store.errorMsg)
    const isLoading = computed(() => store.isLoading)

    // 編輯會員密碼
    const updatePassword = () => {
      store.$patch({ errorMsg: '' })
      if(pwd.password !== pwd.confirmPassword) {
        return store.$patch({ errorMsg: '密碼不一致' })
      }else if(pwd.password.length < 8) {
        return store.$patch({ errorMsg: '密碼字數低於8碼' })
      }
      store.updatePassword(pwd)
      Object.assign(pwd, pwdOriganil())
    }

    return {
      pwd,
      errorMsg,
      isLoading,
      updatePassword
    }
  }
}
</script>