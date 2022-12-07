import { ref, computed } from 'vue'
import { useStore } from '@/store'
import NUTRITION_DATA from '@/service/nutrition.json'
import moment from 'moment'
const store = useStore()

const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

// 計算每日營養攝取量
export const clacIntakes = () => {
  const userInfo = computed(() => store.userInfo)
  const { sex, height, weight, birthday, sportType, fitnessType } = userInfo.value
  const age = calculateAge(birthday)
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
  if (fitnessType == 'loseFat') {
    calories = TDEE * 0.8
  } else if (fitnessType == 'gentleLoseFat') {
    calories = TDEE * 0.9
  } else if (fitnessType == 'keepWeight') {
    calories = TDEE * 1
  } else if (fitnessType == 'gentleAddFat') {
    calories = TDEE * 1.1
  } else if (fitnessType == 'addFat') {
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

  let calc_data = NUTRITION_DATA
  for (let key in calc_data) {
    for (let name in dayIntakes) {
      if (calc_data[key].id == name) {
        calc_data[key].intake = dayIntakes[name]
      }
    }
  }
  return calc_data
}

// 計算當前攝取百分比
export const clacIntakePercent = (data) => {
  const { content, intake } = data
  let percent
  if(content == 0 && intake == 0) {
    percent = 0
  }else {
    percent = Math.round(content / intake * 10000 / 100)
  }
  percent = percent >= 100 ? 100 : percent
  return percent
}

export const useCalcNutrition = (monthDiarys, selectedWeekly) => {
  const weekDiarys = ref([])
  const weekly = ref([])
  const weekNutrition = ref({})

  // 取得週日記
  const getWeekly = () => {
    const start_week = moment(selectedWeekly.value).startOf('week')
    const week_day = moment(start_week).add(7, 'days')
    const week_array = Array(7).fill().map(() => week_day.subtract(1, 'd').format('YYYY-MM-DD')).reverse()
    
    let week_data = []
    week_array.forEach(date => {
      const diarys_data = monthDiarys.value
      
      diarys_data.forEach(item => {
        if(item.date==date) {
          week_data.push(item)
        }
      })
    })

    weekDiarys.value = week_data
    weekly.value = week_array
  }

  // 計算每筆食品營養累加值
  const calcNutrition = (data) => {
    if (data == 0) {
      const type = ['calories','carbohydrates', 'fat', 'protein', 'saturated_fat', 'trans_fat', 'sodium', 'sugar']

      const toal = {}
      type.forEach(key => toal[key] = 0)
      return toal
    }

    const total = data.reduce((acc, curr) => {
      for(let key in curr.food.nutrition) {
        if (!acc[key]) {
          acc[key] = 0
        }
        acc[key] += Math.round(curr.food.nutrition[key] * curr.quantity)
      }
      return acc
    }, {})

    return total
  }

  const updateNutrition = () => {

    // 1) 取得週日記
    getWeekly()

    // 2) 每日營養攝取量
    const calc_data = clacIntakes()

    // 3) 計算每筆食品營養累加值
    weekNutrition.value = {}
    weekly.value.forEach(date => {
      let data = []
      weekDiarys.value.forEach(item => {
        if(date == item.date) {
          data.push(item)
        }
      })
      
      
      // 整合攝取量、累加值、攝取百分比
      const total_data = calcNutrition(data)
      const copy_data = JSON.parse(JSON.stringify(calc_data)) // 深拷貝
      for (let key in total_data) {
        copy_data[key].content = total_data[key]
        copy_data[key].percent = clacIntakePercent(copy_data[key])
      }
      weekNutrition.value[date] = copy_data
    })
  }

  return {
    updateNutrition,
    weekNutrition
  }
}