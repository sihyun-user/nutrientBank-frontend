<template>
  <section class="userWall">
    <div class="userWall__calendar">
      <weekly-calendar :selectedDate="selectedDate" @change-date="tryChaneDate"></weekly-calendar>
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
        <skill-bar :diarys="diarys"></skill-bar>
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
    const diarys = ref([])
    const selectedDate = ref('2000-1-1')

    onMounted(() => {
      selectedDate.value = moment().format('YYYY-MM-DD')
    })

    // 取得選擇日期的日記 (無法更新)
    const selectDateDiary = () => {
      const data = diarys.value
      const newData = data.filter((item) => item.date == selectedDate.value)

      diarys.value = newData
    }
    // 取得今月日記 API 
    const getDiarys = async() => {
      try {
        const res = await apiGetDiarys()
        diarys.value = res.data.data

        // console.log('今月日記:', diarys)
        selectDateDiary()
      } catch (error) {
        console.log(error)
      }
    }
  
    getDiarys()

    const tryChaneDate = (payload) => {
      selectedDate.value = payload
      selectDateDiary()
    }

    return {
      diarys,
      selectedDate,
      tryChaneDate
    }
  }
}
</script>