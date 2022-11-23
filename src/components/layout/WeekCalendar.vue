<template>
  <div class="calendar">
    <div class="calendar__date">{{month}} {{year}}</div>
    <div class="calendar__weekly">
      <span class="calendar__weekly-arrow calendar__weekly-arrow--left" @click="updateWeekly('prev')">
        <i class="fa-solid fa-chevron-left"></i>
      </span>
      <div v-for="item in weeklyDays" :key="item.date"  @click="updateDate(item.date)"
      class="calendar__weekly-item" 
      :class="{'todayDate': todayDate == item.date, 'selectedDat': selectedDate == item.date}"
      >
        <span class="calendar__weekly-item--week">{{item.week}}</span>
        <span class="calendar__weekly-item--date">{{item.day}}</span>
        <span class="calendar__weekly-item--record" v-if="weekRecord && weekRecord[item.date]"></span>
      </div>
      <span class="calendar__weekly-arrow calendar__weekly-arrow--right" @click="updateWeekly('next')">
        <i class="fa-solid fa-chevron-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, watch, onMounted } from 'vue'
import moment from 'moment'
export default {
  emits: ['update-weekly', 'update-date'],
  props: {
    weekNutrition: {
      type: Object
    },
    selectedDate: {
      type: String
    },
    selectedWeekly: {
      type: String
    },
  },
  setup(props, context) {
    const { weekNutrition, selectedWeekly, selectedDate } = toRefs(props)
    const weeklyDays = ref(null)
    const year = ref(2022)
    const month = ref('January')
    const todayDate = moment().format('YYYY-MM-DD')
    const weekRecord = ref(null)

    onMounted(() => setWeekly(selectedDate.value))

    watch(weekNutrition, () => setWeekRecord())

    watch(selectedWeekly, () => {
      setYearMonth()
      setWeekly(selectedWeekly.value)
    })

    // 設置年月
    const setYearMonth = () => {
      year.value = moment(selectedWeekly.value).format('YYYY')
      month.value = moment(selectedWeekly.value).format('MMMM')
    }

    // 設置週日期
    const setWeekly = (curDate) => {
      const start_date = moment(curDate).startOf('week').format('YYYY-MM-DD')
      const weekDay = moment(start_date).add(7, 'days')
      const daysArray = Array(7).fill().map(() => weekDay.subtract(1, 'd').format('YYYY-MM-DD'))

      const weekly = []
      daysArray.reverse().forEach(item => {
        const date = item
        const week = moment(item).format('ddd')
        const day = moment(item).format('DD')
        
        weekly.push({date, week, day})
      })
      weeklyDays.value = weekly
    }

    // 設置週日期是否有紀錄
    const setWeekRecord = () => {
      const week_data = weekNutrition.value
      let record = {}
      for(let date in week_data) {
        const item  = week_data[date]
        for(let key in item) {
          if (item[key].content !== 0) {
            record[date] = 1
            break
          }
          record[date] = 0
        }
      }

      weekRecord.value = record
    }

    // 更新選擇上/下星期
    const updateWeekly = (type) => {
      let date
      if (type == 'prev') {
        date = moment(selectedWeekly.value).subtract(1, 'weeks').format('YYYY-MM-DD')
      } else {
        date = moment(selectedWeekly.value).add(1, 'weeks').format('YYYY-MM-DD')
      }

      context.emit('update-weekly', date)
    }

    // 更新選擇日期
    const updateDate = (date) => {
      context.emit('update-date', date)
    }

    return {
      year,
      month,
      todayDate,
      weekRecord,
      weekNutrition,
      selectedDate,
      weeklyDays,
      updateDate,
      updateWeekly
    }
  }
}
</script>
