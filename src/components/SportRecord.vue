<template>
  <base-card class="sport-record">
    <div class="sport-record__header">
      <div class="sport-record__wrap">
        <div class="sport-record__title">建議運動量</div>
        <div class="sport-record__consume">已消耗 200/1560 kcal</div>
      </div>
      <div class="baseGreenBtn">
        <i class="fa-solid fa-plus"></i>
        <span>新增運動紀錄</span>
      </div>
    </div>
    <div class="sport-record__list">
      <div class="sport-record__list-row">
        <div v-for="sport in sports.slice(0, 4)" :key="sport.sportType" class="sport-record__item">
          <div class="sport-record__item-icon">
            <i :class="`fa-solid ${sport.iconName}`"></i>
          </div>
          <div class="sport-record__item-type">
            <div class="sport-record__item-type--name">{{sport.sportName}}</div>
            <div class="sport-record__item-type--time">0<span>hrs</span></div>
          </div>
        </div>
      </div>
      <div class="sport-record__list-row">
        <div v-for="sport in sports.slice(4, 8)" :key="sport.sportType" class="sport-record__item">
          <div class="sport-record__item-icon">
            <i :class="`fa-solid ${sport.iconName}`"></i>
          </div>
          <div class="sport-record__item-type">
            <div class="sport-record__item-type--name">{{sport.sportName}}</div>
            <div class="sport-record__item-type--time">0<span>hrs</span></div>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import { ref } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import SPORTS_DATA from '@/service/sports.json'
export default {
  components: {
    BaseCard
  },
  setup() {
    const sports = ref(SPORTS_DATA)

    return {
      sports
    }
  }
}
</script>