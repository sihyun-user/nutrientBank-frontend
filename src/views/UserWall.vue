<template>
  <section class="userWall">
    <week-calendar 
    :selectedDate="selectedDate" 
    :selectedWeekly="selectedWeekly" 
    @change-weekly="tryChangeWeekly" 
    @update-diarys="tryUpdateDiarys"
    >
    </week-calendar>
    <div class="userWall__content">
      <div class="userWall__row">
        <day-record></day-record>
        <nutrition-record 
        :selectedDate="selectedDate" :dayDiarys="dayDiarys"
        >
        </nutrition-record>
      </div>
      <div class="userWall__row">
        <sport-record></sport-record>
        <week-record></week-record>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { apiGetDiarys } from '@/service/api'
import WeekCalendar from '@/components/layout/WeekCalendar.vue'
import DayRecord from '@/components/layout/DayRecord.vue'
import NutritionRecord from '@/components/layout/NutritionRecord.vue'
import SportRecord from '@/components/layout/SportRecord.vue'
import WeekRecord from '@/components/layout/WeekRecord.vue'
import moment from 'moment'
export default {
  components: {
    WeekCalendar,
    DayRecord,
    NutritionRecord,
    SportRecord,
    WeekRecord,
  },
  setup() {
    const monthDiarys = ref([])
    const dayDiarys = ref([])
    const selectedDate = ref('2022-12-12')
    const selectedWeekly = ref('2022-12-12')

    const setToday = () => {
      const today = moment()
      selectedDate.value = today.format('YYYY-MM-DD')
      selectedWeekly.value = today.startOf('week').format('YYYY-MM-DD')
    }

    // 取得選擇日期的日記
    const selectDateDiary = () => {
      const data = monthDiarys.value
      const newData = data.filter((item) => item.date == selectedDate.value)
      dayDiarys.value = newData
    }

    // 取得今月日記 API 
    const getDiarys = async() => {
      try {
        setToday()

        const res = await apiGetDiarys(selectedDate.value)
        monthDiarys.value = res.data.data
  
        selectDateDiary()
      } catch (error) {
        console.log(error)
      }
    }

    const tryChangeWeekly = (payload) => {
      selectedWeekly.value = payload
    }

    const tryUpdateDiarys = (payload) => {
      selectedDate.value = payload
      selectDateDiary()
    }

    getDiarys()

    return {
      dayDiarys,
      selectedDate,
      selectedWeekly,
      tryChangeWeekly,
      tryUpdateDiarys
    }
  }
}
</script>