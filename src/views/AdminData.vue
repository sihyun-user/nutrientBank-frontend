<template>
  <section class="admin">
    <div class="admin-aside">
      <div class="admin-aside__header">營養日記後臺管理系統</div>
      <ul class="admin-aside__pagination">
        <li class="admin-aside__pagination--item admin-aside__pagination--item-active">
          <i class="fa-solid fa-utensils"></i>
          <span>食品資料</span>
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
      <div class="admin-info__header">
        <form class="admin-info__search" @submit.prevent="handelSearch">
          <div class="admin-info__search-text">
            <input type="text" placeholder="關鍵字搜尋..." v-model="entered">
            <button type="submit" class="admin-info__search-icon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
        <div class="admin-info__btn baseBtn" @click="setNewFoodWindow">
          <i class="fa-solid fa-plus"></i>
          <span>新增食品</span>
        </div>
      </div>
      <ul class="admin-info__list admin-info__list--food">
        <food-item v-for="food in pagingFoods" :key="food.id"
        :food="food"
        :selectFood="selectFood"
        :isEdit=true
        @select-food="trySelectFood"
        @delete-food="tryDeleteFood">
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
    <base-light-box v-if="selectFood&&showEditBox" @close="tryClose">
      <edit-food-detail
      title="編輯食品"
      :selectFood="selectFood"
      @handle-food="tryUpdateFood">
      </edit-food-detail>
    </base-light-box>
    <base-light-box v-if="showCreateBox" @close="tryClose">
      <edit-food-detail title="新增食品" @handle-food="tryCreateOneFood"></edit-food-detail>
    </base-light-box>
    <base-spinner v-if="isLoading"></base-spinner>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import FoodItem from '@/components/FoodItem.vue'
import EditFoodDetail from '@/components/EditFoodDetail.vue'
export default {
  components: {
    FoodItem,
    EditFoodDetail
  },
  setup() {
    const store = useStore()
    const foods = ref([])
    const count = ref(0)
    const curentPage = ref(1)
    const selectFood = ref(null)
    const entered = ref('')
    const showEditBox = ref(false)
    const showCreateBox = ref(false)

    const isLoading = computed(() => store.isLoading)
    
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
      start = Math.min(start, min + total_pages - page_length)
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
      showEditBox.value = true
    }
    // 關鍵字搜尋
    const handelSearch = () => {
      getFoods()
      entered.value = ''
    }
    // 設置新增食品彈窗
    const setNewFoodWindow = () => {
      store.$patch({ errorMsg: '' })
      showCreateBox.value = true
    }
    // 新增一筆食品 
    const tryCreateOneFood = async(payload) => {
      const results = await store.createOneFood(payload)
      if (!results) return

      tryClose()
    }
    // 編輯一筆食品
    const tryUpdateFood = async(payload) => {
      const results = await store.updateOneFood(payload)
      if (!results) return   

      tryClose()
      getFoods()
    }
    // 刪除一筆食品
    const tryDeleteFood = async(payload) => {
      const results = await store.deleteOneFood(payload)
      if (!results) return

      getFoods()
    }
    // 取得食品列表
    const getFoods = async() => {
      const data = await store.getAllFood({ search: entered.value })
      foods.value = data.list
      count.value = data.count
    }
    const tryClose = () => {
      showEditBox.value = false
      showCreateBox.value = false
    }

    getFoods()

    return {
      foods,
      count,
      curentPage,
      pagingFoods,
      pagingNumber,
      selectFood,
      entered,
      showEditBox,
      showCreateBox,
      isLoading,
      setPagination,
      handelSearch,
      setNewFoodWindow,
      trySelectFood,
      tryCreateOneFood,
      tryUpdateFood,
      tryDeleteFood,
      tryClose
    }
  }
}
</script>