<template>
  <base-light-box v-if="showBox" @close="tryClose">
    <div class="add-food">
      <header class="add-food__header">
        <h1>燕麥</h1>
        <span>桂格</span>
        <i class="fa-solid fa-pen"></i>
      </header>
      <form class="add-food__content">
        <div class="add-food__details">
          <div class="add-food__detail-item">
            <div class="add-food__detail-item--name">熱量</div>
            <div class="add-food__detail-item--description">689 kcal / 1份</div>
          </div>
          <div class="add-food__detail-item">
            <div class="add-food__detail-item--name">攝取份數</div>
            <div class="add-food__detail-item--quantity">
              <i class="fa-solid fa-minus" @click="switchQuantity('sub')"></i>
              <input type="number" v-model="quantity" oninput="if(value.length>2)value=value.slice(0,2)">
              <i class="fa-solid fa-plus" @click="switchQuantity('add')"></i>
            </div>
          </div>
          <div class="add-food__detail-item">
            <div class="add-food__detail-item--name">分類</div>
            <div class="add-food__detail-item--select">
              <div class="add-food__detail-item--select-text" @click="switchMealMemu">
                <span>{{mealType}}</span>
                <div class="add-food__detail-item--select-icon">
                  <i v-if="isSelecte" class="fa-solid fa-angle-up"></i>
                  <i v-else class="fa-solid fa-angle-down"></i>
                </div>
              </div>
              <ul v-if="isSelecte" class="add-food__detail-item--select-list">
                <li v-for="(type, index) in ['早餐', '午餐', '晚餐', '點心']" :key="index"
                :class="{ 'add-food__detail-item--select-selected': mealType==type }"
                @click="switchMealType(type)"
                >
                  <input v-model="mealType" id="type" type="radio">
                  <label for="type">{{type}}</label>
                </li>
              </ul>
            </div>
          </div>
          <div class="add-food__detail-item">
            <div class="add-food__detail-item--name">日期</div>
            <div class="add-food__detail-item--date">
              <div class="add-food__detail-item--date-icon">
                <i  class="fa-regular fa-calendar"></i>
              </div>
              <datepicker 
              v-model="meatlDate" 
              inputFormat="yyyy/MM/dd"
              class="add-food__detail-item--date-picker"
              >
              </datepicker>
            </div>
          </div>
        </div>
        <div class="add-food__btn">
          <button type="submit" class="orangeBigBtn">
            <i class="fa-solid fa-plus"></i>加入日記
          </button>
        </div>
      </form>
      <div class="add-food__nutrition">
        <div class="add-food__nutrition--content">每 195.0g 含</div>
      </div>
    </div>
  </base-light-box>
</template>

<script>
import { onMounted, ref } from 'vue'
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
import Datepicker from 'vue3-datepicker'
export default {
  components: {
    BaseLightBox,
    Datepicker
  },
  setup() {
    const showBox = ref(true)
    const quantity = ref(1)
    const mealType = ref('早餐')
    const isSelecte = ref(false)
    const meatlDate = ref(new Date())

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

    const tryClose = () => {
      showBox.value = false
    }

    onMounted(() => {

      document.addEventListener('click',(e) => {
        const $select = e.target.closest('.add-food__detail-item--select')
        if($select) return
        isSelecte.value = false
      })
    })

    
    return {
      showBox,
      quantity,
      mealType,
      meatlDate,
      isSelecte,
      switchQuantity,
      switchMealMemu,
      switchMealType,
      tryClose
    }
  }
}
</script>