<template>
  <base-card class="sports">
    <div class="sports__header">
      <div class="sports__wrap">
        <div class="sports__title baseTitle">建議運動量</div>
        <div class="sports__consume">已消耗 200/1560 kcal</div>
      </div>
      <button class="sports__btn baseGreenBtn">
        <i class="fa-solid fa-plus"></i>新增運動紀錄
      </button>
    </div>
    <div class="sports__list">
      <div class="sports__list-row">
        <div v-for="sport in sports.slice(0, 4)" :key="sport.sportType" class="sports__item">
          <div class="sports__item-icon">
            <i :class="`fa-solid ${sport.iconName}`"></i>
          </div>
          <div class="sports__item-type">
            <div class="sports__item-type--name">{{sport.sportName}}</div>
            <div class="sports__item-type--time">0<span>hrs</span></div>
          </div>
        </div>
      </div>
      <div class="sports__list-row">
        <div v-for="sport in sports.slice(4, 8)" :key="sport.sportType" class="sports__item">
          <div class="sports__item-icon">
            <i :class="`fa-solid ${sport.iconName}`"></i>
          </div>
          <div class="sports__item-type">
            <div class="sports__item-type--name">{{sport.sportName}}</div>
            <div class="sports__item-type--time">0<span>hrs</span></div>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import { reactive } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import SPORTS_DATA from '@/service/sports.json'
export default {
  components: {
    BaseCard
  },
  setup() {
    const sports = reactive(SPORTS_DATA)

    return {
      sports
    }
  }
}
</script>