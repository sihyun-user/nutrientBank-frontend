<template>
  <div class="theHeader">
    <div class="theHeader__container">
      <div class="theHeader__logo">
        <router-link to="user-wall">
          <img src="@/assets/img/logo-bg.svg">
        </router-link>
      </div>
      <div class="theHeader__nav theHeader__nav--web">
        <div class="theHeader__nav--item">我的紀錄</div>
        <div class="theHeader__nav--item">
          <router-link to="user-search">食品搜尋</router-link>
        </div>
        <div class="theHeader__nav--item theHeader__nav--user theHeader__nav--dropdown" @click="switchOpenMenu">
          <div class="theHeader__nav--user-photo">
            <img v-if="userInfo.photo" :src="userInfo.photo">
            <i v-else class="fa-solid fa-circle-user"></i>
          </div>
          <span>{{userInfo.name}}</span>
        </div>
        <ul class="theHeader__nav--user-list" v-if="isOpenMenu">
          <li><router-link to="edit-personal">個人檔案</router-link></li>
          <li><router-link to="edit-password">修改密碼</router-link></li>
          <li><router-link to="edit-foods">我的食品</router-link></li>
          <li @click="logout">登出</li>
        </ul>
      </div>
      <div class="theHeader__nav theHeader__nav--pad theHeader__nav--dropdown">
        <div class="theHeader__nav--hamburger" @click="switchOpenMenu">
          <i class="fa-solid fa-bars"></i>
        </div>
        <ul class="theHeader__nav--user-list" v-if="isOpenMenu">
          <li><router-link to="">我的紀錄</router-link></li>
          <li><router-link to="user-search">食品搜尋</router-link></li>
          <li><router-link to="edit-personal">個人檔案</router-link></li>
          <li><router-link to="edit-password">修改密碼</router-link></li>
          <li><router-link to="edit-foods">我的食品</router-link></li>
          <li @click="logout">登出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
export default {
  setup() {
    const store = useStore()
    const isOpenMenu = ref(false)

    const userInfo = computed(() => store.userInfo)

    const switchOpenMenu = () => {
      isOpenMenu.value = !isOpenMenu.value
    }

    const logout = () => {
      store.logout()
    }

    window.addEventListener('click',(e) => {
      const $dropdown = e.target.closest('.theHeader__nav--dropdown')
      if($dropdown) return
      isOpenMenu.value = false
    })

    return {
      isOpenMenu,
      userInfo,
      switchOpenMenu,
      logout
    }
  }
}
</script>