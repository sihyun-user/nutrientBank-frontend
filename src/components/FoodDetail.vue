<template>
  <div class="food-detail" v-if="selectFood">
    <header class="food-detail__header">
      <h1>{{selectFood.name}}</h1>
      <span>{{selectFood.brand}}</span>
    </header>
    <form class="food-detail__form" @submit.prevent="createOneDiary">
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">熱量</div>
        <div class="food-detail__form-item--description" v-if="totalNutrition">{{totalNutrition.calories.content}} kcal / 1份</div>
      </div>
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">攝取份數</div>
        <div class="food-detail__form-item--quantity">
          <i class="fa-solid fa-minus" @click="setQuantity('sub')"></i>
          <input type="number" v-model="quantity" oninput="if(value.length>2)value=value.slice(0,2)">
          <i class="fa-solid fa-plus" @click="setQuantity('add')"></i>
        </div>
      </div>
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">分類</div>
        <div class="food-detail__form-item--select">
          <div class="food-detail__form-item--select-text" @click="setMealMemu">
            <span>{{mealType}}</span>
            <div class="food-detail__form-item--select-icon">
              <i v-if="isOpenMeal" class="fa-solid fa-angle-up"></i>
              <i v-else class="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <ul v-if="isOpenMeal" class="food-detail__form-item--select-list">
            <li v-for="(type, index) in ['早餐', '午餐', '晚餐', '點心']" :key="index"
            :class="{ 'food-detail__form-item--select-selected': mealType==type }"
            @click="setMealType(type)"
            >
              <input v-model="mealType" id="type" type="radio">
              <span>{{type}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">日期</div>
        <div class="food-detail__form-item--date">
          <base-datePicker :date="mealDate" @pick-time="tryPickTime"></base-datePicker>
        </div>
      </div>
      <div class="food-detail__form-btn">
      <button type="submit" class="orangeBigBtn">
        <i class="fa-solid fa-plus"></i><span>加入日記</span>
      </button>
    </div>
    </form>
    <div class="food-detail__nutrition">
      <div class="food-detail__nutrition--content">
        <span>營養素</span>{{totalPerUnitWeight}} g 含
      </div>
      <ul class="food-detail__nutrition--list" v-if="totalNutrition">
        <li v-for="(type, index) in totalNutrition" :key="index" class="food-detail__nutrition--item">
          <div class="food-detail__nutrition--item-wrap">
            <div 
            class="food-detail__nutrition--item-percent"
            :class="'food-detail__nutrition--item-percent--' + index"
            >
              {{type.percent}}%
            </div>
            <div class="food-detail__nutrition--item-content"
            :class="'food-detail__nutrition--item-content--' + index"
            >
              {{type.content}}<span>{{type.unit}}</span>
            </div>
          </div>
          <div class="food-detail__nutrition--item-name"
          :class="{'food-detail__nutrition--item-name--overly':type.name=='碳水化合物'||type.name=='飽和脂肪'||type.name=='反式脂肪'}"
          >
            {{type.name}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import useCalcNutrition from '@/hooks/calcNutrition'
import Datepicker from 'vue3-datepicker'
import BaseDatePicker from '@/components/ui/BaseDatePicker.vue'
export default {
  props: {
    selectFood: {
      type: Object
    }
  },
  components: {
    Datepicker,
    BaseDatePicker
  },
  setup(props) {
    const store = useStore()
    const quantity = ref(1)
    const mealType = ref('早餐')
    const isOpenMeal = ref(false)
    const mealDate = ref(Date.now())
    const { selectFood } = toRefs(props)
    const { clacIntakes, clacIntakePercent } = useCalcNutrition()

    watch(selectFood, () => quantity.value=1)

    const totalNutrition = computed(() => calcItemNutrition())
    const totalPerUnitWeight = computed(() => +selectFood.perUnitWeight * quantity.value.toFixed(1))
    
    // 設置份數
    const setQuantity = (type) => {
      let total = quantity.value
      if(type == 'add') {
        total +=1
        total = total >=99 ? 99 : total
      }else {
        total -=1
        total = total <=1 ? 1 : total
      }
      quantity.value = total
    }
    // 設置餐別下拉選單
    const setMealMemu = () => {
      isOpenMeal.value = !isOpenMeal.value
    }
    // 設置餐別
    const setMealType = (type) => {
      isOpenMeal.value = false
      mealType.value = type
    }
    // 計算食品營養成分
    const calcItemNutrition = () => {
      let data = selectFood.value.nutrition
      let array = ['calories', 'carbohydrates', 'protein', 'fat', 'saturated_fat', 'trans_fat', 'sodium', 'sugar']

      // 1) 每日營養攝取量
      const calc_data = clacIntakes()

      // 2) 計算當前攝取百分比
      for(let key of array) {
        calc_data[key].content = data[key]
        calc_data[key].percent = clacIntakePercent(calc_data[key])
      }

      // 3) 計算份數含量
      for(let key in calc_data) {
        let value = calc_data[key].content * quantity.value
        calc_data[key].content = +value.toFixed(1)
      }

      return calc_data
    }
    // 新增一筆營養日記
    //TODO 暫不能選擇時間
    const createOneDiary = () => {
      let meal
      if(mealType.value=='早餐') {
        meal = 'breakfast'
      }else if(mealType.value=='午餐') {
        meal = 'lunch'
      }else if(mealType.value=='晚餐') {
        meal = 'dinner'
      } else {
        meal = 'dessert'
      }
      const foodId = selectFood.value.id
      const paramData = { 
        meal, 
        type: selectFood.value.type, 
        quantity: quantity.value,
        dateTime: mealDate.value
      }
      store.createOneDiary({foodId, paramData})
    }

    const tryPickTime = (payload) => {
      mealDate.value = payload
    }

    document.addEventListener('click',(e) => {
      const $select = e.target.closest('.food-detail__form-item--select')
      if($select) return
      isOpenMeal.value = false
    })

    calcItemNutrition()
    
    return {
      quantity,
      mealType,
      mealDate,
      isOpenMeal,
      totalNutrition,
      totalPerUnitWeight,
      setQuantity,
      setMealMemu,
      setMealType,
      createOneDiary,
      tryPickTime,
      ...toRefs(props.selectFood),
    }
  }
}
</script>