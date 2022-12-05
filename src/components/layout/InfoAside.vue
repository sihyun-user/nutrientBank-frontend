<template>
  <div class="info-aside">
    <div class="info-aside__photo">
      <div class="info-aside__photo--img">
        <img v-if="userInfo.photo" :src="userInfo.photo" referrerpolicy="no-referrer">
        <i v-else class="fa-solid fa-circle-user"></i>
      </div>
      <div class="info-aside__photo--icon">
        <i class="fa-solid fa-camera"></i>
      </div>
    </div>
    <div class="info-aside__name">{{userInfo.name}}</div>
    <div class="info-aside__email">{{userInfo.email}}</div>
    <ul class="info-aside__pagination">
      <router-link to="info-personal">
        <li class="info-aside__pagination--item" 
        :class="{'info-aside__pagination--item-active':route.path=='/info-personal'}"
        >
          <i class="fa-regular fa-user"></i>
          <span>個人檔案</span>
        </li>
      </router-link>
      <li class="info-aside__pagination--item"
      :class="{'info-aside__pagination--item-active':route.path=='/edit-password'}"
      >
        <router-link to="edit-password">
          <i class="fa-solid fa-gear"></i>
          <span>修改密碼</span>
        </router-link>
      </li>
      <li class="info-aside__pagination--item"
      :class="{'info-aside__pagination--item-active':route.path=='/'}"
      >
        <router-link to="">
          <i class="fa-solid fa-list-ul"></i>
          <span>我的食品</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
export default {
  setup() {
    const route = useRoute()
    const stroe = useStore()

    const userInfo = computed(() => stroe.userInfo)

    return {
      route,
      userInfo
    }
  }
}
</script>