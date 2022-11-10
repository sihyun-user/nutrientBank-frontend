<template>
  <div class="skillBar skillBar__web">
    <div class="skillBar__wrapper">
      <div class="skillBar__row">
        <div class="skillBar__title">蛋白質 <span>(g)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-orange" :style="{'width':`${protein.percent}%`}">
            <span class="skillBar__value skillBar__value-orange">{{protein.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{protein.intake}}</div>
      </div>
      <div class="skillBar__row">
        <div class="skillBar__title">碳水化合物 <span>(g)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-orange" :style="{'width':`${carbohydrates.percent}%`}">
            <span class="skillBar__value skillBar__value-orange">{{carbohydrates.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{carbohydrates.intake}}</div>
      </div>
      <div class="skillBar__row skillBar__row--short">
        <div class="skillBar__title">糖 <span>(g)</span></div>
        <div class="skillBar__bar skillBar__bar--short">
          <div class="skillBar__barControl skillBar__barControl-yellow" :style="{'width':`${sugar.percent}%`}">
            <span class="skillBar__value skillBar__value-yellow">{{sugar.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{sugar.intake}}</div>
      </div>
    </div>
    <div class="skillBar__wrapper">
      <div class="skillBar__row">
        <div class="skillBar__title">脂肪 <span>(g)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-orange" :style="{'width':`${fat.percent}%`}">
            <span class="skillBar__value skillBar__value-orange">{{fat.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{fat.intake}}</div>
      </div>
      <div class="skillBar__row skillBar__row--short">
        <div class="skillBar__title">飽和脂肪 <span>(g)</span></div>
        <div class="skillBar__bar skillBar__bar--short">
          <div class="skillBar__barControl skillBar__barControl-yellow" :style="{'width':`${saturated_fat.percent}%`}">
            <span class="skillBar__value skillBar__value-yellow">{{saturated_fat.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{saturated_fat.intake}}</div>
      </div>
      <div class="skillBar__row skillBar__row--short">
        <div class="skillBar__title">反式脂肪 <span>(g)</span></div>
        <div class="skillBar__bar skillBar__bar--short">
          <div class="skillBar__barControl skillBar__barControl-yellow" :style="{'width':`${trans_fat.percent}%`}">
            <span class="skillBar__value skillBar__value-yellow">{{trans_fat.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{trans_fat.intake}}</div>
      </div>
      <div class="skillBar__row">
        <div class="skillBar__title">納 <span>(mg)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-gray" :style="{'width':`${sodium.percent}%`}">
            <span class="skillBar__value skillBar__value-gray">{{sodium.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{sodium.intake}}</div>
      </div>
    </div>
  </div>

  <div class="skillBar skillBar__pad">
    <base-card class="skillCard">
      <div class="skillBar__title">蛋白質 <span>(g)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-orange" :style="{'width':`${protein.percent}%`}">
            <span class="skillBar__value skillBar__value-orange">{{protein.content}}</span>
          </div>
      </div>
      <div class="skillBar__target">{{protein.intake}}</div>
    </base-card>
    <base-card class="skillCard">
      <div class="skillCard__row">
        <div class="skillBar__title">碳水化合物 <span>(g)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-orange" :style="{'width':`${carbohydrates.percent}%`}">
            <span class="skillBar__value skillBar__value-orange">{{carbohydrates.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{carbohydrates.intake}}</div>
      </div>
      <div class="skillBar__row skillBar__row--short">
        <div class="skillBar__title">糖 <span>(g)</span></div>
        <div class="skillBar__bar skillBar__bar--short">
          <div class="skillBar__barControl skillBar__barControl-yellow" :style="{'width':`${sugar.percent}%`}">
            <span class="skillBar__value skillBar__value-yellow">{{sugar.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{sugar.intake}}</div>
      </div>
    </base-card>
    <base-card class="skillCard">
      <div class="skillBar__row">
        <div class="skillBar__title">脂肪 <span>(g)</span></div>
        <div class="skillBar__bar">
          <div class="skillBar__barControl skillBar__barControl-orange" :style="{'width':`${fat.percent}%`}">
            <span class="skillBar__value skillBar__value-orange">{{fat.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{fat.intake}}</div>
      </div>
      <div class="skillBar__row skillBar__row--short">
        <div class="skillBar__title">飽和脂肪 <span>(g)</span></div>
        <div class="skillBar__bar skillBar__bar--short">
          <div class="skillBar__barControl skillBar__barControl-yellow" :style="{'width':`${saturated_fat.percent}%`}">
            <span class="skillBar__value skillBar__value-yellow">{{saturated_fat.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{saturated_fat.intake}}</div>
      </div>
      <div class="skillBar__row skillBar__row--short">
        <div class="skillBar__title">反式脂肪 <span>(g)</span></div>
        <div class="skillBar__bar skillBar__bar--short">
          <div class="skillBar__barControl skillBar__barControl-yellow" :style="{'width':`${trans_fat.percent}%`}">
            <span class="skillBar__value skillBar__value-yellow">{{trans_fat.content}}</span>
          </div>
        </div>
        <div class="skillBar__target">{{trans_fat.intake}}</div>
      </div>
    </base-card>
    <base-card class="skillCard">
      <div class="skillBar__title">納 <span>(mg)</span></div>
      <div class="skillBar__bar">
        <div class="skillBar__barControl skillBar__barControl-gray" :style="{'width':`${sodium.percent}%`}">
          <span class="skillBar__value skillBar__value-gray">{{sodium.content}}</span>
        </div>
      </div>
      <div class="skillBar__target">{{sodium.intake}}</div>
    </base-card>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import NUTRITION_DATA from '@/service/nutrition.json'
import BaseCard from '@/components/ui/BaseCard.vue'
export default {
  props: {
    dayDiarys: {
      type: Array
    },
    selectedDate: {
      type: String
    }
  },
  components: {
    BaseCard
  },
  setup(props) {
    const { dayDiarys, selectedDate } = toRefs(props)
    const nutrition = reactive(NUTRITION_DATA)

    watch([dayDiarys, selectedDate], () =>  updateNutrition())

    // 計算每日營養攝取量
    const clacTodayIntakes = (data) => {
      const { height, weight, age, sex, sportType, fitness_goal } = data
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

      clacTodayIntakes({
        height: 154, 
        weight: 74, 
        age: 25, 
        sex: 0, 
        sportType: 'underSport',
        fitness_goal: 'gentleLoseFat'
      })
      clacIntakePercent()

      console.log('當日紀錄:',nutrition)
    }
    
    return {
      ...toRefs(nutrition)
    }
  }
}
</script>