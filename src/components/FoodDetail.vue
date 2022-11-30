<template>
  <div class="food-detail" v-if="selectFood">
    <header class="food-detail__header">
      <h1>{{selectFood.name}}</h1>
      <span>{{selectFood.brand}}</span>
    </header>
    <form class="food-detail__form" @submit.prevent="createOneDiary">
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">熱量</div>
        <div class="food-detail__form-item--description" v-if="itemNutrition">{{itemNutrition.calories.content}} kcal / 1份</div>
      </div>
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">攝取份數</div>
        <div class="food-detail__form-item--quantity">
          <i class="fa-solid fa-minus" @click="switchQuantity('sub')"></i>
          <input type="number" v-model="quantity" oninput="if(value.length>2)value=value.slice(0,2)">
          <i class="fa-solid fa-plus" @click="switchQuantity('add')"></i>
        </div>
      </div>
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">分類</div>
        <div class="food-detail__form-item--select">
          <div class="food-detail__form-item--select-text" @click="switchMealMemu">
            <span>{{mealType}}</span>
            <div class="food-detail__form-item--select-icon">
              <i v-if="isSelecte" class="fa-solid fa-angle-up"></i>
              <i v-else class="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <ul v-if="isSelecte" class="food-detail__form-item--select-list">
            <li v-for="(type, index) in ['早餐', '午餐', '晚餐', '點心']" :key="index"
            :class="{ 'food-detail__form-item--select-selected': mealType==type }"
            @click="switchMealType(type)"
            >
              <input v-model="mealType" id="type" type="radio">
              <label for="type">{{type}}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="food-detail__form-item">
        <div class="food-detail__form-item--name">日期</div>
        <div class="food-detail__form-item--date">
          <div class="food-detail__form-item--date-icon">
            <i  class="fa-regular fa-calendar"></i>
          </div>
          <datepicker 
          v-model="meatlDate" 
          inputFormat="yyyy/MM/dd"
          class="food-detail__form-item--date-picker"
          >
          </datepicker>
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
        <span>營養素</span>{{selectFood.perUnitWeight}}g 含
      </div>
      <ul class="food-detail__nutrition--list" v-if="itemNutrition">
        <li v-for="(type, index) in itemNutrition" :key="index" class="food-detail__nutrition--item">
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
import { ref, toRefs, computed, watch } from 'vue'
import { clacIntakes, clacIntakePercent } from '@/hooks/calcNutrition'
import Datepicker from 'vue3-datepicker'
export default {
  props: {
    selectFood: {
      type: Object
    }
  },
  components: {
    Datepicker
  },
  setup(props) {
    const quantity = ref(1)
    const mealType = ref('早餐')
    const isSelecte = ref(false)
    const meatlDate = ref(new Date())

    const itemNutrition = computed(() => calcItemNutrition())
      
    const switchQuantity = (type) => {
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

    const switchMealMemu = () => {
      isSelecte.value = !isSelecte.value
    }

    const switchMealType = (type) => {
      isSelecte.value = false
      mealType.value = type
    }

    // 計算食品營養成分
    const calcItemNutrition = () => {
      let data = props.selectFood.nutrition
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
          calc_data[key].content = Math.round(value).toFixed(1)
        }

      console.log(calc_data)

      return calc_data
    }

    // 新增一筆營養日記 API
    const createOneDiary = async() => {
      store.createOneDiary()
    }

    document.addEventListener('click',(e) => {
      const $select = e.target.closest('.food-detail__form-item--select')
      if($select) return
      isSelecte.value = false
    })

    calcItemNutrition()
    
    return {
      quantity,
      mealType,
      meatlDate,
      isSelecte,
      switchQuantity,
      switchMealMemu,
      switchMealType,
      createOneDiary,
      ...toRefs(props.selectFood),
      itemNutrition
    }
  }
}
</script>