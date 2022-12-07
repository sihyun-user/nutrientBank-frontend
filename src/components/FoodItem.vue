<template>
  <li class="food__item"
  :class="{'food__item--select': selectFood&&selectFood.id==food.id}"
  @click="handleSelectFood"
  >
    <div class="food__item--header">
      <div class="food__item--header-name">{{food.name}}</div>
      <div class="food__item--header-icons">
        <div class="food__item--header-icons--custom" v-if="food.type=='customFood'&&!isEdit">自訂</div>
        <div class="food__item--header-icons--books" v-if="!isEdit">
          <div class="food__item--header-icons--book" v-if="!isLikeFood" @click="setFoodLike('add')">
            <img src="@/assets/img/book-mark.svg">
          </div>
          <div class="food__item--header-icons--book" v-else @click="setFoodLike('cancel')">
            <img src="@/assets/img/book-mark-color.svg">
          </div>
        </div>
        <div class="food__item--header-icons--edits" v-else>
          <div class="food__item--header-icons--edit" @click="handleCustomFood">
            <i class="fa-solid fa-pen"></i>
          </div>
          <div class="food__item--header-icons--cancel">
            <i class="fa-solid fa-x"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="food__item--kcal">
      <div class="food__item--kcal-main">
        <span>{{food.nutrition.calories}}</span> kcal
      </div>
      <div class="food__item--kcal-sub"><span>/</span>{{food.perUnitWeight}}g</div>
    </div>
    <div class="food__item--intakes">
      <div class="food__item--intakeItem">碳水化合物<span>{{food.nutrition.carbohydrates}}g</span></div>
      <div class="food__item--intakeItem">蛋白質<span>{{food.nutrition.protein}}g</span></div>
      <div class="food__item--intakeItem">脂肪<span>{{food.nutrition.fat}}g</span></div>
      <div class="food__item--intakeItem">糖<span>{{food.nutrition.sugar}}g</span></div>
      <div class="food__item--intakeItem">納<span>{{food.nutrition.sodium}}mg</span></div>
    </div>
  </li>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from '@/store'
export default {
  emits: ['select-food', 'update-like', 'open-customFood'],
  props: {
    food: {
      type: Object
    },
    selectFood: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { food } = toRefs(props)
    const store = useStore()

    const isLikeFood = computed(() => food.value.likes.includes(store.userId))

    // 取得一筆食品書籤
    const getOneLike = async(payload) => {
      const result = await store.getOneLike(payload)
      if(!result) return

      context.emit('update-like', result)
    }
    // 設置食品書籤
    const setFoodLike = async(type) => {
      const payload = { foodId: food.value.id, foodType: food.value.type }
      if (type == 'add') {
        await store.addFoodLike(payload)
      } else {
        await store.cancelFoodLike(payload)
      }
      getOneLike(payload)
    }
    const handleSelectFood = (event) => {
      context.emit('select-food', food.value, event)
    }
    const handleCustomFood = async () => {
      context.emit('open-customFood', food.value)
      context.emit('select-food', food.value)
    }

    return {
      isLikeFood,
      setFoodLike,
      handleSelectFood,
      handleCustomFood
    }
  }  
}
</script>