<template>
  <section class="user-wall">
    <div class="user-wall__container">
      <week-calendar
      :weekNutrition="weekNutrition"
      :selectedDate="selectedDate"
      :selectedWeekly="selectedWeekly"
      @update-weekly="tryChangeWeekly"
      @update-date="tryUpdateDate"
      >
      </week-calendar>
      <div class="user-wall__wrapper">
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
      <div class="user-wall__wrapper">
        <sport-record></sport-record>
        <week-record :weekNutrition="weekNutrition"></week-record>
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
import SportRecord from '@/components/SportRecord.vue'
import WeekRecord from '@/components/WeekRecord.vue'
export default {
  components: {
    WeekCalendar,
    DayRecord,
    NutritionRecord,
    SportRecord,
    WeekRecord
  },
  setup() {
    const store = useStore()
    const { 
      selectedDate, selectedWeekly, monthDiarys, weekNutrition, 
      tryChangeWeekly, tryUpdateDate
    } = useSetMonthNutrition()

    const isLoading = computed(() => store.isLoading)

    return {
      isLoading,
      selectedDate, 
      selectedWeekly, 
      monthDiarys, 
      weekNutrition, 
      tryChangeWeekly, 
      tryUpdateDate,
    }
  }
}
</script>