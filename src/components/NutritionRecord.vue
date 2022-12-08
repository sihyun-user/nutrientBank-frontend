<template>
  <base-card class="nutrition">
    <div class="nutrition__header">
      <div class="nutrition__title baseTitle">今日紀錄</div>
      <div class="nutrition__btns">
        <div class="baseWhiteBtn" @click="setCustomFood">
          <i class="fa-solid fa-plus"></i>
          <span>新增自訂食品</span>
        </div>
        <router-link to="user-search" class="baseBtn">
          <i class="fa-solid fa-plus"></i>
          <span>新增營養紀錄</span>
        </router-link>
      </div>
    </div>
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
  </base-card>
  <base-light-box v-if="showBox" @close="tryClose">
    <edit-food-detail title="新增自訂食品" @handle-food="tryCreateCustomFood"></edit-food-detail>
  </base-light-box>
</template>

<script>
import { ref, reactive, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import BaseCard from '@/components/ui/BaseCard.vue'
import NUTRITION_DATA from '@/service/nutrition.json'
import EditFoodDetail from '@/components/EditFoodDetail.vue'
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
export default {
  emits: ['create-customFood'],
  props: {
    weekNutrition: {
      type: Object
    },
    selectedDate: {
      type: String
    }
  },
  components: {
    BaseCard,
    EditFoodDetail,
    BaseLightBox
  },
  setup(props) {
    const store = useStore()
    const showBox = ref(false)
    const dayRecord = reactive(NUTRITION_DATA)
    const { weekNutrition, selectedDate } = toRefs(props)

    watch([weekNutrition, selectedDate], () => setDayRecord())

    // 設置每日營養資料
    const setDayRecord = () => {
      const record = weekNutrition.value[selectedDate.value]
      Object.assign(dayRecord, record)
    }
    // 設置自訂食品彈窗
    const setCustomFood = () => {
      showBox.value = true
    }
    // 新增自訂食品
    const tryCreateCustomFood = async(payload) => {
      const results = await store.createCustomFood(payload)
      if (!results) return

      tryClose()
    }

    const tryClose = () => {
      showBox.value = false
    }

    return {
      ...toRefs(dayRecord),
      showBox,
      setCustomFood,
      tryCreateCustomFood,
      tryClose
    }
  }
}
</script>