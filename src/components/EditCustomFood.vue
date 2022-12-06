<template>
  <base-lightBox class="lightBox__">
    <form class="edit-custom" @click.prevent="">
      <div class="edit-custom__header">修改自訂食品</div>
      <div class="edit-custom__row">
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">食品名稱</label>
          <input class="edit-custom__ented-text" type="text"
          placeholder="請輸入食品名稱">
        </div>
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">品牌名稱</label>
          <input class="edit-custom__ented-text" type="text" 
          placeholder="請輸入品牌名稱">
        </div>
      </div>
      <div class="edit-custom__header2">份數</div>
      <div class="edit-custom__row">
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">每一份量含</label>
          <input class="edit-custom__ented-text" type="number"
          placeholder="請輸入每一份量數值">
        </div>
        <div class="edit-custom__units">
          <label class="edit-custom__units-label">單位</label>
          <ul class="edit-custom__units-list">
            <li class="edit-custom__units-item edit-custom__units-item--active">
              <input id="type" type="radio">
              <label for="type">g</label>
            </li>
            <li class="edit-custom__units-item">
              <input id="type" type="radio">
              <label for="type">ml</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="edit-custom__header2">營養成分</div>
      <div class="edit-custom__row">
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">熱量</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入熱量">
            <span class="edit-custom__ented-unit">kcal</span>
          </div>
        </div>
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">碳水化合物</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入體重">
            <span class="edit-custom__ented-unit">g</span>
          </div>
        </div>
      </div>
      <div class="edit-custom__row">
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">蛋白質</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入蛋白質">
            <span class="edit-custom__ented-unit">g</span>
          </div>
        </div>
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">脂肪</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入脂肪">
            <span class="edit-custom__ented-unit">g</span>
          </div>
        </div>
      </div>
      <div class="edit-custom__row">
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">飽和脂肪</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入飽和脂肪">
            <span class="edit-custom__ented-unit">g</span>
          </div>
        </div>
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">反式脂肪</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入反式脂肪">
            <span class="edit-custom__ented-unit">g</span>
          </div>
        </div>
      </div>
      <div class="edit-custom__row">
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">糖</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入糖">
            <span class="edit-custom__ented-unit">g</span>
          </div>
        </div>
        <div class="edit-custom__ented">
          <label class="edit-custom__ented-label">納</label>
          <div class="edit-custom__ented-wrap">
            <input class="edit-custom__ented-text"
            type="number" placeholder="請輸入納">
            <span class="edit-custom__ented-unit">mg</span>
          </div>
        </div>
      </div>
      <!-- <div v-if="errorMsg" class="errorMsg edit-custom__errorMsg">{{errorMsg}}</div> -->
      <div class="edit-custom__btn">
        <button type="submit" class="orangeBigBtn">修改自訂食品</button>
      </div>
    </form>
  </base-lightBox>
</template>

<script>
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
export default {
  components: {
    BaseLightBox
  },
  setup() {
  } 
}
</script>