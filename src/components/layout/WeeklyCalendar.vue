<template>
  <div class="calendar">
    <div class="calendar__date">{{month}} {{year}}</div>
    <div class="calendar__weekly">
      <span class="calendar__weekly-arrow calendar__weekly-arrow--left" @click="chanegeWeekly('prev')">
        <i class="fa-solid fa-chevron-left"></i>
      </span>
      <div v-for="wd in weeklyDays" :key="wd.date" 
      class="calendar__weekly-item" :class="{'selectedDate': selectedDate == wd.mothDate}">
        <span class="calendar__weekly-item--week">{{wd.day}}</span>
        <span class="calendar__weekly-item--date">{{wd.date}}</span>
      </div>
      <span class="calendar__weekly-arrow calendar__weekly-arrow--right" @click="chanegeWeekly('next')">
        <i class="fa-solid fa-chevron-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, toRefs, watch, reactive, ref, onUpdated, onMounted } from 'vue'
import moment from 'moment'
export default {
  emits: ['change-date'],
  props: {
    selectedDate: {
      type: String
    }
  },
  setup(props, context) {
    const { selectedDate } = toRefs(props)
    const weeklyDays = reactive({})
    const year = ref(2022)
    const month = ref('January')

    watch(selectedDate, () => {
      getYearMonth()
      getWeekly(selectedDate.value)
    })

    const getYearMonth = () => {
      year.value = moment(selectedDate.value).format('YYYY')
      month.value = moment(selectedDate.value).format('MMMM')
    }

    const getWeekly = (curDate) => {
      const today = moment(curDate).add(4, 'days')
      const daysArray = Array(7).fill().map(() => today.subtract(1, 'd').format('YYYY-MM-DD'))

      const weekly = []
      daysArray.reverse().forEach(item => {
        const mothDate = item
        const day = moment(item).format('ddd')
        const date = moment(item).format('DD')
  
        weekly.push({mothDate, day, date})
      })

      Object.assign(weeklyDays, weekly)
    }

    const chanegeWeekly = (type) => {
      let date
      if (type == 'prev') {
        date = moment(selectedDate.value).subtract(1, 'days').format('YYYY-MM-DD')
      } else {
        date = moment(selectedDate.value).add(1, 'days').format('YYYY-MM-DD')
      }

      context.emit('change-date', date)
      getYearMonth()
    }

    return {
      year,
      month,
      selectedDate,
      weeklyDays,
      chanegeWeekly
    }
  }
}
</script>
