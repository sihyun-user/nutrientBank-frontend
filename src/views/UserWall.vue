<template>
  <section class="userWall">
    <div class="userWall__wrap">
      <base-card class="amount">
        <div class="amount__title baseTitle">今日額度</div>
      </base-card>
      <base-card class="nutrition">
        <div class="nutrition__title baseTitle">今日紀錄</div>
        <skill-bar :diarys="diarys"></skill-bar>
      </base-card>
    </div>
    <div class="userWall__wrap">
    </div>
  </section>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue'
import { apiGetDiarys } from '@/service/api'
import BaseCard from '@/components/ui/BaseCard.vue'
import SkillBar from '@/components/layout/SkillBar.vue'
export default {
  components: {
    BaseCard,
    SkillBar
  },
  setup() {
    const diarys = ref(null)
    // let nutrition  = reactive({})
    let nutrition = {}

    // // 計算每日營養攝取量
    // const clacTodayIntakes = (data) => {
    //   const { height, weight, age, sex, sportType, fitness_goal } = data
    //   const dayIntakes = {}

    //   // 1) 基礎代謝率(BMR)
    //   const BMR = Math.round((10 * weight) + (6.25 * height) - (5 * age) + (166 * sex - 161))

    //   // 2) 每日總熱量消耗(TDEE)
    //   let TDEE
    //   if (sportType == 'underSport') {
    //     TDEE = BMR * 1.2
    //   } else if (sportType == 'normalSport') {
    //     TDEE = BMR * 1.375
    //   } else if (sportType == 'moderateSport') {
    //     TDEE = BMR * 1.55
    //   } else if (sportType == 'severeSport') {
    //     TDEE = BMR * 1.72
    //   } else if (sportType == 'overSport') {
    //     TDEE = BMR * 1.9
    //   }
    //   TDEE = Math.round(TDEE)

    //   // 3) 每日熱量建議攝入量
    //   let calories
    //   if (fitness_goal == 'loseFat') {
    //     calories = TDEE * 0.8
    //   } else if (fitness_goal == 'gentleLoseFat') {
    //     calories = TDEE * 0.9
    //   } else if (fitness_goal == 'keepWeight') {
    //     calories = TDEE * 1
    //   } else if (fitness_goal == 'gentleAddFat') {
    //     calories = TDEE * 1.1
    //   } else if (fitness_goal == 'addFat') {
    //     calories = TDEE * 1.2
    //   }
    //   dayIntakes['calories'] = Math.round(calories)

    //   // 4) 每日營養攝取量
    //   dayIntakes['protein'] = Math.round(calories * 0.3 / 4)
    //   dayIntakes['fat'] = Math.round(calories * 0.28 / 9)
    //   dayIntakes['carbohydrates'] = Math.round(calories * 0.42 / 4)
    //   dayIntakes['sugar'] = Math.round(calories * 0.05 / 4)
    //   dayIntakes['saturated_fat'] = Math.round(calories * 0.1 / 9)
    //   dayIntakes['trans_fat'] = 0
    //   dayIntakes['sodium'] = 2000

    //   for (let key in nutrition) {
    //     for (let name in dayIntakes) {
    //       if (nutrition[key].id == name) {
    //         nutrition[key].intake = dayIntakes[name]
    //       }
    //     }
    //   }
    // }

    // // 計算當前攝取百分比
    // const clacIntakePercent = () => {
    //   for (let key in nutrition) {
    //     const {content, intake } = nutrition[key]
    //     nutrition[key].percent = Math.round(content / intake * 10000 / 100)
    //   }
    // }

    // // 計算每筆食品營養累加值
    // const calcNutrition = () => {
    //   let total = diarys.value.reduce((acc, curr) => {
    //   Object.keys(curr.food.nutrition).forEach((key, index) => {
    //     if (!acc[key]) {
    //       acc[key] = 0
    //     }
    //     acc[key] += Math.round(curr.food.nutrition[key])
    //   })
    //     return acc
    //   }, {})

    //   return total
    // }

    // // 更新營養物件內容
    // const updateNutrition = () => {
    //   const total = calcNutrition()
    //   const newTotal = {}
    //   const info = {
    //     calories: { id: 'calories', name: '熱量', unit: 'kcal' },
    //     carbohydrates: { id: 'carbohydrates', name: '碳水化合物', unit: 'g' },
    //     protein: { id: 'protein', name: '蛋白質', unit: 'g' },
    //     fat: { id: 'fat', name: '脂肪', unit: 'g' },
    //     saturated_fat: { id: 'saturated_fat', name: '飽和脂肪', unit: 'g' },
    //     trans_fat: { id: 'trans_fat', name: '反式脂肪', unit: 'g' },
    //     sugar: { id: 'sugar', name: '糖', unit: 'g' },
    //     sodium: { id: 'sodium', name: '納', unit: 'mg' }
    //   }
    //   for (let key in total) {
    //     info[key].content = total[key]
    //     // newTotal.push(info[key])
    //     newTotal[key] = info[key]
    //   }

    //   Object.assign(nutrition, newTotal)
    //   console.log(nutrition)

    //   clacTodayIntakes({
    //     height: 154, 
    //     weight: 74, 
    //     age: 25, 
    //     sex: 0, 
    //     sportType: 'underSport',
    //     fitness_goal: 'loseFat'
    //   })
    //   clacIntakePercent()
    // }
    
    // TODO: 取得當前選擇日期營養
    // 取得今月營養日記 API 
    const getDiarys = async() => {
      try {
        const res = await apiGetDiarys()
  
        diarys.value = res.data.data
        // updateNutrition()
      } catch (error) {
        console.log(error)
      }
    }
  
    getDiarys()

    return {
      diarys
      // nutrition
    }
  }
}
</script>