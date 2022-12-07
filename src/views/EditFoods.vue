<template>
  <div class="edit-foods">
    <div class="edit-foods__nav">
      <span class="edit-foods__nav--item" @click="switchMode('自訂食品')"
      :class="{'edit-foods__nav--item-active': foodMode=='自訂食品'}"
      >自訂食品 ({{customFoods.count}})</span>
      <span class="edit-foods__nav--item" @click="switchMode('我的書籤')"
      :class="{'edit-foods__nav--item-active': foodMode=='我的書籤'}"
      >我的書籤 ({{likeFoods.count}})</span>
    </div>
    <form @submit.prevent="searchEntered">
      <div class="edit-foods__search">
        <div class="edit-foods__search-text">
          <input type="text" placeholder="食品搜尋..." v-model="enteredKeyword">
          <button type="submit" class="edit-foods__search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
    <ul class="edit-foods__list" v-if="foodMode=='自訂食品'">
      <food-item v-for="food in customData" :key="food.id"
      :food="food"
      :selectFood="selectFood"
      :isEdit=true
      @select-food="trySelectFood"
      @open-customFood="tryOpenCustomFood"
      >
      </food-item>
    </ul>
    <ul class="edit-foods__list" v-else>
      <food-item v-for="food in likeData" :key="food.id"
      :food="food"
      :selectFood="selectFood"
      @select-food="trySelectFood"
      @update-like="tryUpdateLike"
      >
      </food-item>
    </ul>
  </div>
  <base-light-box v-if="selectFood&&showEditBox" @close="tryClose">
    <edit-customFood
    title="編輯自訂食品"
    :selectFood="selectFood"
    @handle-customFood="tryUpdateCustomFood">
    </edit-customFood>
  </base-light-box>
  <base-light-box v-if="selectFood&&showSelectBox" @close="tryClose">
    <food-detail :selectFood="selectFood"></food-detail>
  </base-light-box>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store'
import FoodItem from '@/components/FoodItem.vue'
import EditCustomFood from '@/components/EditCustomFood.vue'
import FoodDetail from '@/components/FoodDetail.vue'
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
export default {
  components: {
    FoodItem,
    EditCustomFood,
    FoodDetail,
    BaseLightBox
  },
  setup() {
    const store = useStore()
    const foodMode = ref('自訂食品')
    const enteredKeyword = ref('')
    const customFoods = reactive({ list: [], count: 0 })
    const likeFoods = reactive({ list: [], count: 0 })
    const customData = ref([])
    const likeData = ref([])
    const selectFood = ref(null)
    const showSelectBox = ref(false)
    const showEditBox = ref(false)

    const isLoading = computed(() => store.isLoading)

    // 切換自訂食品、書籤列表
    const switchMode = (type) => {
      foodMode.value = type
      enteredKeyword.value = ''
      searchEntered()
    }
    // 關鍵字篩選
    const searchEntered = (type) => {
      if (!enteredKeyword.value) {
        customData.value = customFoods.list
        likeData.value = likeFoods.list
      }

      if (type == '自訂食品') {
        customData.value = customFoods.list.filter(item => {
          if (item.name.includes(enteredKeyword.value)) return item
        })
      } else {
        likeData.value = likeFoods.list.filter(item => {
          if (item.name.includes(enteredKeyword.value)) return item
        })
      }
    }
    // 取得自訂食品列表
    const getCustomFoods = async() => {
      const payload = { search: enteredKeyword.value }
      const data = await store.getAllCustomFood(payload)
      Object.assign(customFoods, data)
      searchEntered()
    }
    // 取得書籤列表
    const getLikeFoods = async() => {
      const payload = { search: enteredKeyword.value }
      const data = await store.getAllLikes(payload)
      Object.assign(likeFoods, data)
      searchEntered()
    }
    // 更新食品書籤(同步更新DOM)
    const tryUpdateLike = (newFood) => {
      likeFoods.list.find(food => {
        if (food.id == newFood.id) food.likes = newFood.likes
      })

      if (foodMode.value == '我的書籤') getLikeFoods()
    }
    // 設置選擇的食品
    const trySelectFood = (food, event) => {
      document.querySelector
      selectFood.value = food
      if (!event) return
    
      const $edit = event.target.closest('.food__item--header-icons--edit')
      const $book = event.target.closest('.food__item--header-icons--book')
      if ($edit || $book) return
      showSelectBox.value = true
    }
    // 設置編輯自訂食品彈窗
    const tryOpenCustomFood = () => {
      showEditBox.value = true
      showSelectBox.value = false
    }
    // 編輯自訂食品
    const tryUpdateCustomFood = () => {
      tryClose()
      getCustomFoods()
    }
    const tryClose = () => {
      showSelectBox.value = false
      showEditBox.value = false
    }

    getCustomFoods()
    getLikeFoods()

    return {
      foodMode,
      enteredKeyword,
      customFoods,
      likeFoods,
      customData,
      likeData,
      selectFood,
      showSelectBox,
      showEditBox,
      isLoading,
      switchMode,
      searchEntered,
      trySelectFood,
      tryUpdateLike,
      tryOpenCustomFood,
      tryUpdateCustomFood,
      tryClose
    }
  }
}
</script>