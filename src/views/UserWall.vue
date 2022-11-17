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
        <day-record
        :selectedDate="selectedDate"
        :caloriesRecord="nutrition.calories"
        >
        </day-record>
        <nutrition-record 
        :selectedDate="selectedDate"
        :nutrition="nutrition"
        :userHealthInfo="userHealthInfo"
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
import { reactive, ref } from 'vue'
import { apiGetDiarys } from '@/service/api'
import NUTRITION_DATA from '@/service/nutrition.json'
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
    const nutrition = reactive(NUTRITION_DATA)
    const selectedDate = ref('2022-12-12')
    const selectedWeekly = ref('2022-12-12')
    const userHealthInfo = reactive({
      height: null, 
      weight: null, 
      age: null, 
      sex: null, 
      sportType: null,
      fitness_goal: null
    })

    const setToday = () => {
      const today = moment()
      selectedDate.value = today.format('YYYY-MM-DD')
      selectedWeekly.value = today.startOf('week').format('YYYY-MM-DD')
    }

    // 取得使用者體態資訊
    const getUserHealth = () => {
      let data = {
        height: 154, 
        weight: 74, 
        age: 25, 
        sex: 0, 
        sportType: 'underSport',
        fitness_goal: 'gentleLoseFat'
      }
      Object.assign(userHealthInfo, data)
    }

    // 取得選擇日期的日記
    const selectDateDiary = () => {
      const data = monthDiarys.value
      const newData = data.filter((item) => item.date == selectedDate.value)
      dayDiarys.value = newData
    }

    // 計算營養目標、攝取量
    const calcNutrition = () => {
      // 計算每日營養攝取量
      const clacTodayIntakes = () => {
        const { height, weight, age, sex, sportType, fitness_goal } = userHealthInfo
        const dayIntakes = {}

        // 1) 基礎代謝率(BMR)
        const BMR = Math.round((10 * weight) + (6.25 * height) - (5 * age) + (166 * sex - 161))

        // 2) 每日總熱量消耗(TDEE)
        let TDEE
        if (sportType == 'underSport') {
          TDEE = BMR * 1.2
        } else if (sportType == 'normalSport') {
          TDEE = BMR * 1.375
        } else if (sportType == 'moderateSport') {
          TDEE = BMR * 1.55
        } else if (sportType == 'severeSport') {
          TDEE = BMR * 1.72
        } else if (sportType == 'overSport') {
          TDEE = BMR * 1.9
        }
        TDEE = Math.round(TDEE)

        // 3) 每日熱量建議攝入量
        let calories
        if (fitness_goal == 'loseFat') {
          calories = TDEE * 0.8
        } else if (fitness_goal == 'gentleLoseFat') {
          calories = TDEE * 0.9
        } else if (fitness_goal == 'keepWeight') {
          calories = TDEE * 1
        } else if (fitness_goal == 'gentleAddFat') {
          calories = TDEE * 1.1
        } else if (fitness_goal == 'addFat') {
          calories = TDEE * 1.2
        }
        dayIntakes['calories'] = Math.round(calories)

        // 4) 每日營養攝取量
        dayIntakes['protein'] = Math.round(calories * 0.3 / 4)
        dayIntakes['fat'] = Math.round(calories * 0.28 / 9)
        dayIntakes['carbohydrates'] = Math.round(calories * 0.42 / 4)
        dayIntakes['sugar'] = Math.round(calories * 0.05 / 4)
        dayIntakes['saturated_fat'] = Math.round(calories * 0.1 / 9)
        dayIntakes['trans_fat'] = 0
        dayIntakes['sodium'] = 2000

        for (let key in nutrition) {
          for (let name in dayIntakes) {
            if (nutrition[key].id == name) {
              nutrition[key].intake = dayIntakes[name]
            }
          }
        }
      }

      // 計算當前攝取百分比
      const clacIntakePercent = () => {
        for (let key in nutrition) {
          const {content, intake } = nutrition[key]
          const percent = Math.round(content / intake * 10000 / 100)
          nutrition[key].percent = percent >= 100 ? 100 : percent
        }
      }

      // 計算每筆食品營養累加值
      const calcNutrition = () => {
        if (dayDiarys.value == 0) {
          const type = ['calories','carbohydrates', 'fat', 'protein', 'saturated_fat', 'trans_fat', 'sodium', 'sugar']
    
          const toal = {}
          type.forEach(key => toal[key] = 0)
          return toal
        }

        let total = dayDiarys.value.reduce((acc, curr) => {
        Object.keys(curr.food.nutrition).forEach((key, index) => {
          if (!acc[key]) {
            acc[key] = 0
          }
          acc[key] += Math.round(curr.food.nutrition[key])
        })
          return acc
        }, {})

        return total
      }

      // 更新營養物件內容
      const updateNutrition = () => {
        const total = calcNutrition()
        const info = NUTRITION_DATA

        for (let key in total) {
          info[key].content = total[key]
        }
        Object.assign(nutrition, info)

        clacTodayIntakes()
        clacIntakePercent()

        console.log('當日紀錄:', nutrition)
      }

      updateNutrition()
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
      calcNutrition()
    }

    getDiarys()
    getUserHealth()
    calcNutrition()

    return {
      dayDiarys,
      nutrition,
      userHealthInfo,
      selectedDate,
      selectedWeekly,
      tryChangeWeekly,
      tryUpdateDiarys
    }
  }
}
</script>