<template>
  <form class="edit-custom" @click.prevent="">
    <div class="edit-custom__header">修改自訂食品</div>
    <div class="edit-custom__row">
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">食品名稱</label>
        <input class="edit-custom__ented-text" type="text"
        placeholder="請輸入食品名稱(必填)" v-model="editFoodData.name">
      </div>
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">食品英文名稱</label>
        <input class="edit-custom__ented-text" type="text" 
        placeholder="請輸入食品英文名稱" v-model="editFoodData.subName">
      </div>
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">品牌名稱</label>
        <input class="edit-custom__ented-text" type="text" 
        placeholder="請輸入品牌名稱" v-model="editFoodData.brand">
      </div>
    </div>
    <div class="edit-custom__subHeader">份數</div>
    <div class="edit-custom__row">
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">每一份量含</label>
        <input class="edit-custom__ented-text" type="number"
        placeholder="請輸入每一份量含(必填)" v-model="editFoodData.perUnitWeight">
      </div>
      <div class="edit-custom__ented edit-custom__units">
        <label class="edit-custom__ented-label">單位</label>
        <ul class="edit-custom__units-list">
          <li class="edit-custom__units-item"
          :class="{'edit-custom__units-item--active': editFoodData.unit == 'g'}"
          @click="switchUiitType('g')"
          >
            <input id="type" type="radio" v-model="editFoodData.unit">
            <span>g</span>
          </li>
          <li class="edit-custom__units-item"
          :class="{'edit-custom__units-item--active': editFoodData.unit == 'ml'}"
          @click="switchUiitType('ml')"
          >
            <input id="type" type="radio" v-model="editFoodData.unit">
            <span>ml</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="edit-custom__subHeader">營養成分</div>
    <div class="edit-custom__row">
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">熱量</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入熱量(必填)">
          <span class="edit-custom__ented-unit">kcal</span>
        </div>
      </div>
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">碳水化合物</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入碳水化合物(必填)">
          <span class="edit-custom__ented-unit">g</span>
        </div>
      </div>
    </div>
    <div class="edit-custom__row">
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">蛋白質</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入蛋白質(必填)">
          <span class="edit-custom__ented-unit">g</span>
        </div>
      </div>
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">脂肪</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入脂肪(必填)">
          <span class="edit-custom__ented-unit">g</span>
        </div>
      </div>
    </div>
    <div class="edit-custom__row">
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">飽和脂肪</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入飽和脂肪(必填)">
          <span class="edit-custom__ented-unit">g</span>
        </div>
      </div>
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">反式脂肪</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入反式脂肪(必填)">
          <span class="edit-custom__ented-unit">g</span>
        </div>
      </div>
    </div>
    <div class="edit-custom__row">
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">糖</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入糖(必填)">
          <span class="edit-custom__ented-unit">g</span>
        </div>
      </div>
      <div class="edit-custom__ented">
        <label class="edit-custom__ented-label">納</label>
        <div class="edit-custom__ented-wrap">
          <input class="edit-custom__ented-text"
          type="number" placeholder="請輸入納(必填)">
          <span class="edit-custom__ented-unit">mg</span>
        </div>
      </div>
    </div>
    <!-- <div v-if="errorMsg" class="errorMsg edit-custom__errorMsg">{{errorMsg}}</div> -->
    <div class="edit-custom__btn">
      <button type="submit" class="orangeBigBtn">修改自訂食品</button>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue'
export default {
  props: {
    selectFood: {
      type: Object
    }
  },
  setup(props) {
    const editFoodData = reactive({})

    // 切換單位
    const switchUiitType = (type) => {
      editFoodData.unit = type
    }
    
    const setEditData = () => {
      Object.assign(editFoodData, props.selectFood)
      console.log(editFoodData)
    }

    setEditData()

    return {
      editFoodData,
      switchUiitType
    }
  } 
}
</script>