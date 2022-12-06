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
      <div class="edit-foods__entered">
        <div class="edit-foods__entered-text">
          <input type="text" placeholder="食品搜尋..." v-model="enteredKeyword">
          <button type="submit" class="edit-foods__entered-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
    <ul class="edit-foods__list" v-if="foodMode=='自訂食品'">
      <food-item v-for="food in customData" :key="food.id"
      :food="food"
      :is-edit=true
      @update-like="tryUpdateLike"
      >
      </food-item>
    </ul>
    <ul class="edit-foods__list" v-else>
      <food-item v-for="food in likeData" :key="food.id"
      :food="food"
      @update-like="tryUpdateLike"
      >
      </food-item>
    </ul>
  </div>
  <edit-customFood></edit-customFood>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store'
import FoodItem from '@/components/FoodItem.vue'
import EditCustomFood from '@/components/EditCustomFood.vue'
export default {
  components: {
    FoodItem,
    EditCustomFood
  },
  setup() {
    const store = useStore()
    const foodMode = ref('自訂食品')
    const enteredKeyword = ref('')
    const customFoods = reactive({ list: [], count: 0 })
    const likeFoods = reactive({ list: [], count: 0 })
    const customData = ref([])
    const likeData = ref([])

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

    getCustomFoods()
    getLikeFoods()

    return {
      foodMode,
      enteredKeyword,
      customFoods,
      likeFoods,
      customData,
      likeData,
      isLoading,
      switchMode,
      searchEntered,
      tryUpdateLike,
    }
  }
}
</script>