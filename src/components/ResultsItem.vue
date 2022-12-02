<template>
  <div class="results__item" 
  :class="{'results__item--select': selectFood&&selectFood.id==food.id}"
  @click="handleSelectFood(food)"
  >
    <div class="results__item--header">
      <div class="results__item--header-name">{{food.name}}</div>
      <div class="results__item--header-marks">
        <div class="results__item--header-customMark" v-if="food.type=='customFood'">自訂</div>
        <div class="results__item--header-bookmark" v-if="!isLikeFood" @click="addFoodLike(food)">
          <img src="@/assets/img/book-mark.svg">
        </div>
        <div class="results__item--header-bookmark" v-else @click="cancelFoodLike(food)">
          <img src="@/assets/img/book-mark-color.svg">
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
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from '@/store'
export default {
  emits: ['select-food', 'update-likes'],
  props: {
    food: {
      type: Object
    },
    selectFood: {
      type: Object
    }
  },
  setup(props,context) {
    const { food } = toRefs(props)
    const store = useStore()

    const isLikeFood = computed(() => food.value.likes.includes(store.userId))

    // 取得一筆食品書籤
    const getOneLike = async(payload) => {
      const result = await store.getOneLike(payload)
      if(!result) return

      context.emit('update-likes', result)
    }
    // 新增食品書籤
    const addFoodLike = async(food) => {
      let payload = {foodId: food.id, foodType: food.type}
      await store.addFoodLike(payload)
      getOneLike(payload)
    }
    // 取消食品書籤
    const cancelFoodLike = async(food) => {
      let payload = {foodId: food.id, foodType: food.type}
      await store.cancelFoodLike(payload)
      getOneLike(payload)
    }

    const handleSelectFood = (food) => {
      context.emit('select-food', food)
    }

    return {
      isLikeFood,
      addFoodLike,
      cancelFoodLike,
      handleSelectFood
    }
  }
}
</script>