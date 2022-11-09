<template>
  <section class="userWall">
    <div class="userWall__calendar">
      <weekly-calendar 
      :selectedDate="selectedDate" 
      :selectedWeekly="selectedWeekly" 
      @change-weekly="tryChangeWeekly" 
      @update-diarys="tryUpdateDiarys"
      >
      </weekly-calendar>
    </div>
    <div class="userWall__wrap">
      <base-card class="amount">
        <div class="amount__title baseTitle">今日額度</div>
        <day-amount></day-amount>
      </base-card>
      <base-card class="nutrition">
        <div class="nutrition__wrap">
          <div class="nutrition__title baseTitle">今日紀錄</div>
          <button class="nutrition__btn baseBtn">
            <i class="fa-solid fa-plus"></i>新增營養紀錄
          </button>
        </div>
        <skill-bar :selectedDate="selectedDate" :dayDiarys="dayDiarys"></skill-bar>
      </base-card>
    </div>
    <div class="userWall__wrap">
    </div>
  </section>
</template>

<script>
import { ref, computed, reactive, onUpdated, onMounted } from 'vue'
import { apiGetDiarys } from '@/service/api'
import BaseCard from '@/components/ui/BaseCard.vue'
import DayAmount from '@/components/layout/DayAmount.vue'
import SkillBar from '@/components/layout/Skillbar.vue'
import WeeklyCalendar from '@/components/layout/WeeklyCalendar.vue'
import moment from 'moment'
export default {
  components: {
    BaseCard,
    DayAmount,
    SkillBar,
    WeeklyCalendar
  },
  setup() {
    const monthDiarys = ref([])
    const dayDiarys = ref([])
    const selectedDate = ref('2000-1-1')
    const selectedWeekly = ref('2000-1-1')

    // 取得選擇日期的日記
    const selectDateDiary = () => {
      const data = monthDiarys.value
      const newData = data.filter((item) => item.date == selectedDate.value)
      dayDiarys.value = newData
    }

    // 取得今月日記 API 
    const getDiarys = async() => {
      try {
        selectedDate.value = moment().format('YYYY-MM-DD')

        const res = await apiGetDiarys(selectedDate.value)
        monthDiarys.value = res.data.data
  
        selectDateDiary()
      } catch (error) {
        console.log(error)
      }
    }

    const tryChangeWeekly = (payload) => {
      console.log(payload)
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