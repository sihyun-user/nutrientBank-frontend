<template>
  <section class="user-diarys">
    <div class="user-diarys__container">
      <week-calendar
      :weekNutrition="weekNutrition"
      :selectedDate="selectedDate"
      :selectedWeekly="selectedWeekly"
      @update-weekly="tryChangeWeekly"
      @update-date="tryUpdateDate">
      </week-calendar>
      <div class="user-diarys__wrapper">
        <diary-record
        :selectedDate="selectedDate" 
        :diaryRecords="diaryRecords"
        @update-diary="tryUpdateDiary">
        </diary-record>
      </div>
      <div class="user-diarys__wrapper">
        <day-record
        :monthDiarys="monthDiarys"
        :selectedDate="selectedDate"
        :weekNutrition="weekNutrition">
        </day-record>
        <nutrition-record 
        :selectedDate="selectedDate"
        :weekNutrition="weekNutrition">
        </nutrition-record>
      </div>
    </div>
  </section>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/store'
import useSetMonthNutrition from '@/hooks/setMonthNutrition'
import WeekCalendar from '@/components/WeekCalendar.vue'
import DayRecord from '@/components/DayRecord.vue'
import NutritionRecord from '@/components/NutritionRecord.vue'
import DiaryRecord from '@/components/DiaryRecord.vue'
export default {
  components: {
    WeekCalendar,
    DayRecord,
    NutritionRecord,
    DiaryRecord
  },
  setup() {
    const store = useStore()
    const { 
      selectedDate, selectedWeekly, monthDiarys, weekNutrition,
      diaryRecords, getMonthDiarys, tryChangeWeekly, tryUpdateDate
    } = useSetMonthNutrition()

    const isLoading = computed(() => store.isLoading)

    // 重新撈取營養日記
    const tryUpdateDiary = (() => {
      getMonthDiarys()
    })

    return {
      isLoading,
      selectedDate, 
      selectedWeekly, 
      monthDiarys, 
      weekNutrition,
      diaryRecords,
      tryChangeWeekly, 
      tryUpdateDate,
      tryUpdateDiary
    }
  }
}
</script>