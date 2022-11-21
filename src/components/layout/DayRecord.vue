<template>
  <base-card class="amount">
    <div class="amount__title baseTitle">{{date}}額度</div>
    <div class="amount__content">
      <div class="amount__circle">
        <div class="amount__circle-text">
          <span class="amount__circle-text--word">尚可攝取</span>
          <span class="amount__circle-text--value">{{intake - content}}</span>
          <span class="amount__circle-text--kcal">kcal</span>

        </div>
        <circle-progress
        :is-gradient="true"
        :gradient="{
          angle: 90,
          startColor: '#FBA06E',
          stopColor: '#FFD65B'
        }"
        :size="195"
        :percent="percent >= 100 ? 100 : percent"
        empty-color="#F2F2F2"
        />
      </div>
      <div class="amount__quota">
        <div class="amount__quota-item">
          <img class="amount__quota-icon" src="img/icon-goal-bg.svg">
          <div class="amount__quota-wrap">
            <span class="amount__quota-word">目標</span>
            <p class="amount__quota-value amount__quota-value--yellow">
              {{intake}}<span>kacl</span>
            </p>
          </div>
        </div>
        <div class="amount__quota-block"></div>
        <div class="amount__quota-item">
          <img class="amount__quota-icon" src="img/icon-eat-bg.svg">
          <div class="amount__quota-wrap">
            <span class="amount__quota-word">已攝取</span>
            <p class="amount__quota-value amount__quota-value--blue">
              {{content}}<span>kacl</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import { computed, toRefs } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import moment from 'moment'
import CircleProgress from 'vue3-circle-progress'
import 'vue3-circle-progress/dist/circle-progress.css'
export default {
  props: {
    caloriesRecord: {
      type: Object
    },
    selectedDate: {
      type: String
    }
  },
  components: {
    BaseCard,
    CircleProgress
  },
  setup(props) {
    const { selectedDate } = toRefs(props)
    const { content , intake, percent } = toRefs(props.caloriesRecord)

    const date = computed(() => {
      return dateFormat() == dateFormat(selectedDate.value) 
      ? '今日' : dateFormat(selectedDate.value) + ' '
    })

    const dateFormat = (date) => moment(date).format('YYYY/MM/DD')

    return {
      content,
      intake,
      percent,
      date
    }
  }
}
</script>