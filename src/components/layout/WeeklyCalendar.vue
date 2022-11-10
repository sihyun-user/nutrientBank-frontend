<template>
  <div class="calendar">
    <div class="calendar__date">{{month}} {{year}}</div>
    <div class="calendar__weekly">
      <span class="calendar__weekly-arrow calendar__weekly-arrow--left" @click="chanegeWeekly('prev')">
        <i class="fa-solid fa-chevron-left"></i>
      </span>
      <div v-for="wd in weeklyDays" :key="wd.mothDate"  @click="updateDiarys(wd.mothDate)"
      class="calendar__weekly-item" 
      :class="{'todayDate': today == wd.mothDate, 'selectedDat': selectedDate == wd.mothDate}"
      >
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
  emits: ['change-weekly', 'update-diarys'],
  props: {
    selectedDate: {
      type: String
    },
    selectedWeekly: {
      type: String
    },
  },
  setup(props, context) {
    const { selectedWeekly, selectedDate } = toRefs(props)
    const weeklyDays = reactive({})
    const year = ref(2022)
    const month = ref('January')
    const today = moment().format('YYYY-MM-DD')

    onMounted(() =>  getWeekly(selectedDate.value))

    watch(selectedWeekly, () => {
      getYearMonth()
      getWeekly(selectedWeekly.value)
    })

    const getYearMonth = () => {
      year.value = moment(selectedWeekly.value).format('YYYY')
      month.value = moment(selectedWeekly.value).format('MMMM')
    }

    const getWeekly = (curDate) => {
      const from_date = moment(curDate).startOf('week').format('YYYY-MM-DD')
      const weekDay = moment(from_date).add(7, 'days')
      const daysArray = Array(7).fill().map(() => weekDay.subtract(1, 'd').format('YYYY-MM-DD'))

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
        date = moment(selectedWeekly.value).subtract(1, 'weeks').format('YYYY-MM-DD')
      } else {
        date = moment(selectedWeekly.value).add(1, 'weeks').format('YYYY-MM-DD')
      }

      console.log(date)

      context.emit('change-weekly', date)
    }

    const updateDiarys = (date) => {
      context.emit('update-diarys', date)
    }

    return {
      year,
      month,
      today,
      selectedDate,
      selectedWeekly,
      weeklyDays,
      updateDiarys,
      chanegeWeekly
    }
  }
}
</script>
