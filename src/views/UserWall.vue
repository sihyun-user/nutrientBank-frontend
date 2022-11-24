<template>
  <section class="userWall">
    <week-calendar
    :weekNutrition="weekNutrition"
    :selectedDate="selectedDate" 
    :selectedWeekly="selectedWeekly" 
    @update-weekly="tryChangeWeekly" 
    @update-date="tryUpdateDate"
    >
    </week-calendar>
    <div class="userWall__content">
      <div class="userWall__row">
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
      <div class="userWall__row">
        <sport-record></sport-record>
        <week-record :weekNutrition="weekNutrition"></week-record>
      </div>
    </div>
    <add-food></add-food>
  </section>
</template>

<script>
import { ref, watch } from 'vue'
import { apiGetDiarys } from '@/service/api'
import useCalcNutrition from '@/hooks/calcNutrition'
import WeekCalendar from '@/components/layout/WeekCalendar.vue'
import DayRecord from '@/components/layout/DayRecord.vue'
import NutritionRecord from '@/components/layout/NutritionRecord.vue'
import SportRecord from '@/components/layout/SportRecord.vue'
import WeekRecord from '@/components/layout/WeekRecord.vue'
import AddFood from '@/components/lightBoxs/AddFood.vue'
import moment from 'moment'
export default {
  components: {
    WeekCalendar,
    DayRecord,
    NutritionRecord,
    SportRecord,
    WeekRecord,
    AddFood
  },
  setup() {
    const monthDiarys = ref([])
    const selectedDate = ref(null)
    const selectedWeekly = ref(null)
    const { updateNutrition, weekNutrition } = useCalcNutrition(monthDiarys, selectedWeekly)

    watch(monthDiarys, () => updateNutrition())

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
    getMonthDiarys()

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