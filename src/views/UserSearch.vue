<template>
  <section class="userSearch">
    <div class="search-food">
      <div class="search-food--select">
        <div class="search-food--select-text" @click="switchFoodMemu">
          <span>{{foodType}}</span>
          <div class="search-food--select-icon">
            <i v-if="isSelecte" class="fa-solid fa-angle-up"></i>
            <i v-else class="fa-solid fa-angle-down"></i>
          </div>
        </div>
        <ul v-if="isSelecte" class="search-food--select-list">
          <li v-for="(type, index) in ['全部食品', '自訂食品', '我的書籤']" :key="index"
          :class="{ 'search-food--select-selected': foodType==type }"
          @click="switchfoodType(type)"
          >
            <input v-model="foodType" id="type" type="radio">
            <label for="type">{{type}}</label>
          </li>
        </ul>
      </div>
      <div class="search-food--search">
        <div class="search-food--search-text" @click="switchMealMemu">
          <input type="text" placeholder="食品搜尋...">
          <div class="search-food--search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="search-reault" v-if="!isLoading">
      <div class="search-reault__header">
        <span class="search-reault__header--text"><span v-if="search!==''">「燕麥」</span>共有 {{foods.length}} 筆搜尋結果</span>
        <div class="search-reault__header--btn baseWhiteBtn">
          <i class="fa-solid fa-plus"></i>
          <span>新增自訂食品</span>
        </div>
      </div>
      <div class="search-reault__content">
        <div class="search-reault__list">
          <div v-for="food in foods" :key="food._id" 
          class="search-reault__item"
          :class="{'search-reault__item--select': selectFood&&selectFood._id==food._id}"
          @click="switchSelectFood(food)"
          >
            <div class="search-reault__item--header">
              <div class="search-reault__item--header-name">{{food.name}}</div>
              <div class="search-reault__item--header-marks">
                <div class="search-reault__item--header-customMark">自訂</div>
                <div class="search-reault__item--header-bookmark">
                  <img src="/img/book-mark.svg">
                </div>
              </div>
            </div>
            <div class="search-reault__item--kcal">
              <div class="search-reault__item--kcal-main">
                <span>{{food.nutrition.calories}}</span> kcal
              </div>
              <div class="search-reault__item--kcal-sub"><span>/</span>{{food.perUnitWeight}}g</div>
            </div>
            <div class="search-reault__item--intakes">
              <div class="search-reault__item--intakeItem">碳水化合物<span>{{food.nutrition.carbohydrates}}g</span></div>
              <div class="search-reault__item--intakeItem">蛋白質<span>{{food.nutrition.protein}}g</span></div>
              <div class="search-reault__item--intakeItem">脂肪<span>{{food.nutrition.fat}}g</span></div>
              <div class="search-reault__item--intakeItem">糖<span>{{food.nutrition.sugar}}g</span></div>
              <div class="search-reault__item--intakeItem">納<span>{{food.nutrition.sodium}}mg</span></div>
            </div>
          </div>
        </div>
        <div class="search-reault__food">
          <div class="search-reault__food--content">
            <food-detail :selectFood="selectFood"></food-detail>
          </div>
        </div>
      </div>
      <div class="search-reault__pages">
        <span class="search-reault__pages--arrow search-reault__pages--arrow-left">
          <i class="fa-solid fa-chevron-left"></i>
        </span>
        <ul class="search-reault__pages--list">
          <li class="search-reault__pages--item">1</li>
          <li class="search-reault__pages--item">2</li>
          <li class="search-reault__pages--item">3</li>
          <li class="search-reault__pages--item">4</li>
        </ul>
        <span class="search-reault__pages--arrow search-reault__pages--arrow-right">
          <i class="fa-solid fa-chevron-right"></i>
        </span>
      </div>
    </div>
  </section>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { ref, computed, reactive } from '@vue/reactivity'
import { useStore } from '@/store'
import { apiGetAllfFood } from '@/service/api'
import FoodDetail from '@/components/layout/FoodDetail.vue'
export default {
  components: {
    FoodDetail
  },
  setup() {
    const store = useStore()
    const search = ref('')
    const foods = ref([])
    const foodType = ref('全部食品')
    const isSelecte = ref(false)
    const selectFood = reactive({})

    const isLoading = computed(() => store.isLoading)

    const switchFoodMemu = () => {
      isSelecte.value = !isSelecte.value
    }

    const switchfoodType = (type) => {
      isSelecte.value = false
      foodType.value = type
    }

    const switchSelectFood = (food) => {
      Object.assign(selectFood, food)
      console.log(selectFood)
    }

    // 取得食品列表 API 
    const getAllFood = async() => {
      try {
        store.$patch({ isLoading: true })

        const res = await apiGetAllfFood(`${search.value}`)
        foods.value = res.data.data
        store.$patch({ isLoading: false })
      } catch (error) {
        console.log(error)
      }
    }

    document.addEventListener('click',(e) => {
      const $select = e.target.closest('.search-food--select')
      if($select) return
      isSelecte.value = false
    })

    getAllFood()

    return {
      search,
      foods,
      foodType,
      isSelecte,
      selectFood,
      isLoading,
      switchFoodMemu,
      switchfoodType,
      switchSelectFood
    }
  }
}
</script>
