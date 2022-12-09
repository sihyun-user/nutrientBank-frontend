<template>
  <section class="admin">
    <div class="admin-aside">
      <div class="admin-aside__header">營養日記後臺管理系統</div>
      <ul class="admin-aside__pagination">
        <router-link to="edit-personal">
          <li class="admin-aside__pagination--item admin-aside__pagination--item-active">
            <i class="fa-regular fa-user"></i>
            <span>會員資料</span>
          </li>
        </router-link>
        <li class="admin-aside__pagination--item">
          <router-link to="edit-password">
            <i class="fa-solid fa-utensils"></i>
            <span>食品資料</span>
          </router-link>
        </li>
        <li class="admin-aside__pagination--item">
          <router-link to="user-wall">
            <i class="fa-solid fa-house"></i>
            <span>回首頁</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="admin-info">
      <form class="admin-info__search" @submit.prevent="">
        <div class="admin-info__search-text">
          <input type="text" placeholder="食品搜尋...">
          <button type="submit" class="admin-info__search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      <ul class="admin-info__list">
        <food-item v-for="food in pagingFoods" :key="food.id"
        :food="food"
        :selectFood="selectFood"
        :isEdit=true
        @select-food="trySelectFood"
        >
        </food-item>
      </ul>
      <div class="admin-info__pagination" v-if="foods.length!==0">
        <div class="admin-info__pagination--container">
          <span
          v-if="curentPage > 1"
          @click="setPagination(curentPage-1)"
          class="admin-info__pagination--arrow admin-info__pagination--arrow-left"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </span>
          <ul class="admin-info__pagination--list">
            <li v-for="page in pagingNumber" :key="page" 
            class="admin-info__pagination--item"
            :class="{'admin-info__pagination--selectItem': curentPage==page}"
            @click="setPagination(page)"
            >
              {{page}}
            </li>
          </ul>
          <span
          v-if="curentPage < Math.ceil(count/5)"
          @click="setPagination(curentPage+1)"
          class="admin-info__pagination--arrow admin-info__pagination--arrow-right"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </div>
    <base-light-box v-if="selectFood&&showBox" @close="tryClose">
      <edit-food-detail
      title="編輯食品"
      :selectFood="selectFood">
      </edit-food-detail>
    </base-light-box>
  </section>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store'
import FoodItem from '@/components/FoodItem.vue'
import EditFoodDetail from '@/components/EditFoodDetail.vue'
import FoodDetail from '@/components/FoodDetail.vue'
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
export default {
  components: {
    FoodItem,
    EditFoodDetail,
    BaseLightBox
  },
  setup() {
    const store = useStore()
    const foods = ref([])
    const count = ref(0)
    const curentPage = ref(1)
    const selectFood = ref(null)
    const showBox = ref(false)

    // 各分頁食品結果
    const pagingFoods = computed(() => {
      const page = curentPage.value
      const results_per_foods = 5
      const start = (page - 1) * results_per_foods //0
      const end = page * results_per_foods //4
      return foods.value.slice(start, end)
    })
    // 分頁數
    const pagingNumber = computed(() => {
      let min = 1, 
          page_length = 4,
          total_pages = Math.ceil(count.value/5),
          current = curentPage.value

      if (page_length > total_pages) page_length = total_pages
  
      let start = current - Math.floor(page_length / 2)
      start = Math.max(start, min)
      return Array.from({length: page_length}, (el, i) => start + i)
    })
    // 設置分頁
    const setPagination = (page=1) => {
      curentPage.value = page
    }
    // 設置選擇的食品
    const trySelectFood = (food, event) => {
      selectFood.value = food
      if (!event) return
    
      const $edit = event.target.closest('.food__item--header-icons--edit')
      if (!$edit) return
      showBox.value = true
    }
    // 取得食品列表
    const getFoods = async() => {
      const data = await store.getAllFood()
      foods.value = data.list
      count.value = data.count
    }

    const tryClose = () => {
      showBox.value = false
    }

    getFoods()

    return {
      foods,
      count,
      curentPage,
      pagingFoods,
      pagingNumber,
      selectFood,
      showBox,
      trySelectFood,
      setPagination,
      tryClose
    }
  }
}
</script>