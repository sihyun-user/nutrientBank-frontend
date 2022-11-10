<template>
  <section class="userWall">
    <weekly-calendar 
    :selectedDate="selectedDate" 
    :selectedWeekly="selectedWeekly" 
    @change-weekly="tryChangeWeekly" 
    @update-diarys="tryUpdateDiarys"
    >
    </weekly-calendar>
    <div class="userWall__wrapper">
      <div class="userWall__row">
        <base-card class="amount">
          <div class="amount__title baseTitle">今日額度</div>
          <day-amount></day-amount>
        </base-card>
        <base-card class="nutrition">
          <div class="nutrition__header">
            <div class="nutrition__title baseTitle">今日紀錄</div>
            <button class="nutrition__btn baseBtn">
              <i class="fa-solid fa-plus"></i>新增營養紀錄
            </button>
          </div>
          <skill-bar :selectedDate="selectedDate" :dayDiarys="dayDiarys"></skill-bar>
        </base-card>
      </div>
      <div class="userWall__row">
        <base-card class="sports">
          <div class="sports__header">
            <div class="sports__wrap">
              <div class="sports__title baseTitle">建議運動量</div>
              <div class="sports__consume">已消耗 200/1560 kcal</div>
            </div>
            <button class="sports__btn baseGreenBtn">
              <i class="fa-solid fa-plus"></i>新增運動紀錄
            </button>
          </div>
          <div class="sports__list">
            <div class="sports__list-row">
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
            </div>
            <div class="sports__list-row">
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
              <div class="sports__item">
                <div class="sports__item-icon">
                  <i class="fa-solid fa-person-running"></i>
                </div>
                <div class="sports__item-type">
                  <div class="sports__item-type--name">跑步</div>
                  <div class="sports__item-type--time">1.1<span>hrs</span></div>
                </div>
              </div>
            </div>
          </div>
        </base-card>
        <base-card class="week-record">
          <div class="week-record__title baseTitle">建議運動量</div>
          <day-amount></day-amount>
        </base-card>
      </div>
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