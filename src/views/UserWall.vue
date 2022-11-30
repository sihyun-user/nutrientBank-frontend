<template>
  <section class="user-wall">
    <week-calendar
    :weekNutrition="weekNutrition"
    :selectedDate="selectedDate" 
    :selectedWeekly="selectedWeekly" 
    @update-weekly="tryChangeWeekly" 
    @update-date="tryUpdateDate"
    >
    </week-calendar>
    <div class="user-wall__content">
      <div class="user-wall__row">
        <day-record
        :monthDiarys="monthDiarys"
        :selectedDate="selectedDate"
        :weekNutrition="weekNutrition"
        >
        </day-record>
        <nutrition-record 
        :selectedDate="selectedDate"
        :weekNutrition="weekNutrition"
        >
        </nutrition-record>
      </div>
      <div class="user-wall__row">
        <sport-record></sport-record>
        <week-record :weekNutrition="weekNutrition"></week-record>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { apiGetDiarys } from '@/service/api'
import { useCalcNutrition } from '@/hooks/calcNutrition'
import WeekCalendar from '@/components/WeekCalendar.vue'
import DayRecord from '@/components/DayRecord.vue'
import NutritionRecord from '@/components/NutritionRecord.vue'
import SportRecord from '@/components/SportRecord.vue'
import WeekRecord from '@/components/WeekRecord.vue'
import moment from 'moment'
export default {
  components: {
    WeekCalendar,
    DayRecord,
    NutritionRecord,
    SportRecord,
    WeekRecord
  },
  setup() {
    const monthDiarys = ref([])
    const selectedDate = ref(null)
    const selectedWeekly = ref(null)
    const { updateNutrition, weekNutrition } = useCalcNutrition(monthDiarys, selectedWeekly)

    watch(monthDiarys, () => updateNutrition())

    onMounted(() => getMonthDiarys())

    // 設置今日日期
    const setTodayDate = () => {
      const today = moment().format('YYYY-MM-DD')
      selectedDate.value = today
      selectedWeekly.value = today
    }

    // 取得今月日記 API 
    const getMonthDiarys = async() => {
      try {
        const res = await apiGetDiarys(selectedDate.value)
        monthDiarys.value = res.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const tryChangeWeekly = (payload) => {
      selectedWeekly.value = payload
      updateNutrition()
    }

    const tryUpdateDate = (payload) => {
      selectedDate.value = payload
    }

    setTodayDate()

    return {
      monthDiarys,
      weekNutrition,
      selectedDate,
      selectedWeekly,
      tryChangeWeekly,
      tryUpdateDate
    }
  }
}
</script>