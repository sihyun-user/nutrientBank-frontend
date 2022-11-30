<template>
  <section class="search-results">
    <form class="search" @submit.prevent="startSerach">
      <div class="search--select">
        <div class="search--select-text" @click="switchFoodMemu">
          <span>{{foodType}}</span>
          <div class="search--select-icon">
            <i v-if="isSelecte" class="fa-solid fa-angle-up"></i>
            <i v-else class="fa-solid fa-angle-down"></i>
          </div>
        </div>
        <ul v-if="isSelecte" class="search--select-list">
          <li v-for="(type, index) in ['全部食品', '自訂食品', '我的書籤']" :key="index"
          :class="{ 'search--select-selected': foodType==type }"
          @click="switchfoodType(type)"
          >
            <input v-model="foodType" id="type" type="radio">
            <label for="type">{{type}}</label>
          </li>
        </ul>
      </div>
      <div class="search--search">
        <div class="search--search-text" @click="switchMealMemu">
          <input type="text" placeholder="食品搜尋..." v-model="enteredKeyword">
          <button type="submit" class="search--search-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
    <div class="not-results " v-if="!isSearchFood">
      <p>想找什麼內容，首先搜索一下食品吧！</p>
    </div>
    <div class="results" v-else>
      <div class="results__header">
        <div class="results__header--text">
          <span v-if="curKeyword!==''">「{{curKeyword}}」</span>共有 {{count}} 筆搜尋結果
        </div>
        <div class="results__header--btn">
          <div class="baseWhiteBtn">
            <i class="fa-solid fa-plus"></i>
            <span>新增自訂食品</span>
          </div>
        </div>
      </div>
      <div class="results__content">
        <div class="results__list">
          <div class="results__list-error" v-if="foods.length==0">
            <p>找不到結果，請重新輸入不同關鍵字再試一次!</p>
          </div>
          <div class="results__list-items" v-else>
            <div v-for="food in foods" :key="food.id" 
            class="results__item"
            :class="{'results__item--select': selectFood&&selectFood.id==food.id}"
            @click="switchSelectFood(food)"
            >
              <div class="results__item--header">
                <div class="results__item--header-name">{{food.name}}</div>
                <div class="results__item--header-marks">
                  <div class="results__item--header-customMark">自訂</div>
                  <div class="results__item--header-bookmark">
                    <img src="@/assets/img/book-mark.svg">
                  </div>
                </div>
              </div>
              <div class="results__item--kcal">
                <div class="results__item--kcal-main">
                  <span>{{food.nutrition.calories}}</span> kcal
                </div>
                <div class="results__item--kcal-sub"><span>/</span>{{food.perUnitWeight}}g</div>
              </div>
              <div class="results__item--intakes">
                <div class="results__item--intakeItem">碳水化合物<span>{{food.nutrition.carbohydrates}}g</span></div>
                <div class="results__item--intakeItem">蛋白質<span>{{food.nutrition.protein}}g</span></div>
                <div class="results__item--intakeItem">脂肪<span>{{food.nutrition.fat}}g</span></div>
                <div class="results__item--intakeItem">糖<span>{{food.nutrition.sugar}}g</span></div>
                <div class="results__item--intakeItem">納<span>{{food.nutrition.sodium}}mg</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="results__food" v-if="selectFood">
          <div class="results__food--content">
            <food-detail :selectFood="selectFood"></food-detail>
          </div>
        </div>
      </div>
      <div class="results__pagination" v-if="foods.length!==0">
        <div class="results__pagination--container">
          <span
          v-if="curPage > 1"
          @click="switchPagination(curPage-1)"
          class="results__pagination--arrow results__pagination--arrow-left"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </span>
          <ul class="results__pagination--list">
            <li v-for="page in pagingNumber" :key="page" 
            class="results__pagination--item"
            :class="{'results__pagination--selectItem': curPage==page}"
            @click="switchPagination(page)"
            >
              {{page}}
            </li>
          </ul>
          <span
          v-if="curPage < Math.ceil(count/6)"
          @click="switchPagination(curPage+1)"
          class="results__pagination--arrow results__pagination--arrow-right"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        </div>
      </div>
    </div>
    <base-light-box v-if="padMode && showBox" @close="tryClose">
      <food-detail :selectFood="selectFood"></food-detail>
    </base-light-box>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { apiGetAllfFood } from '@/service/api'
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
import FoodDetail from '@/components/FoodDetail.vue'
export default {
  components: {
    FoodDetail,
    BaseLightBox
  },
  setup() {
    const enteredKeyword = ref('')
    const curKeyword = ref('')
    const foods = ref([])
    const count = ref(0)
    const foodType = ref('全部食品')
    const isSelecte = ref(false)
    const selectFood = ref(null)
    const curPage = ref(1)
    const isSearchFood = ref(false)
    const showBox = ref(false)
    const padMode = ref(false)

    const pagingNumber = computed(() => {
      let min = 1, 
          page_length = 4,
          total_pages = Math.ceil(count.value/6),
          current = curPage.value

      if (page_length > total_pages) page_length = total_pages
  
      let start = current - Math.floor(page_length / 2)
      start = Math.max(start, min)
      start = Math.min(start, min + total_pages - page_length)
      return Array.from({length: page_length}, (el, i) => start + i)
    }
)

    const switchFoodMemu = () => {
      isSelecte.value = !isSelecte.value
    }

    const switchfoodType = (type) => {
      isSelecte.value = false
      foodType.value = type
    }

    const switchSelectFood = (food) => {
      selectFood.value = food
      showBox.value = true
    }

    const switchPagination = (page) => {
      curPage.value = page
      enteredKeyword.value = curKeyword.value
      getAllFood()
    }

    const startSerach = () => {
      isSearchFood.value = true
      curKeyword.value = enteredKeyword.value
      curPage.value = 1
      getAllFood()
    }

    const resetSearch = () => {
      enteredKeyword.value = ''
      selectFood.value = null
      showBox.value = false
    }

    // 取得食品列表 API 
    const getAllFood = async() => {
      try {
        const res = await apiGetAllfFood({search: enteredKeyword.value, page: curPage.value})
        const data = res.data.data
        foods.value = data.list
        count.value = data.count

        resetSearch()

        if (foods.value.length==0 || window.innerWidth < 1023) return
        switchSelectFood(foods.value[0])
      } catch (error) {
        console.log(error)
      }
    }

    const tryClose = () => {
      showBox.value = false
    }

    const switchPadMode = (() => {
      const currentWidth = window.innerWidth
      padMode.value = currentWidth >= 1023 ? false : true
    })

    window.addEventListener('click',(e) => {
      const $select = e.target.closest('.search--select')
      if($select) return
      isSelecte.value = false
    })

    window.addEventListener('resize', () => switchPadMode())

    switchPadMode()

    return {
      enteredKeyword,
      curKeyword,
      foods,
      count,
      foodType,
      isSelecte,
      selectFood,
      isSearchFood,
      curPage,
      showBox,
      padMode,
      pagingNumber,
      switchFoodMemu,
      switchfoodType,
      switchSelectFood,
      switchPagination,
      startSerach,
      tryClose
    }
  }
}
</script>
