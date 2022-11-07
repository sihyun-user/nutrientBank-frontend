<template>
  <section class="userWall">
    <div class="userWall__wrap">
      <base-card class="amount">
        <div class="amount__title baseTitle">今日額度</div>
        <day-amount></day-amount>
      </base-card>
      <base-card class="nutrition">
        <div class="nutrition__wrap">
          <div class="nutrition__title baseTitle">今日紀錄</div>
          <button class="baseBtn">新增營養紀錄</button>
        </div>
        <skill-bar :diarys="diarys"></skill-bar>
      </base-card>
    </div>
    <div class="userWall__wrap">
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { apiGetDiarys } from '@/service/api'
import BaseCard from '@/components/ui/BaseCard.vue'
import DayAmount from '@/components/layout/DayAmount.vue'
import SkillBar from '@/components/layout/Skillbar.vue'
import moment from 'moment'
export default {
  components: {
    BaseCard,
    DayAmount,
    SkillBar,
  },
  setup() {
    const diarys = ref(null)
    
    // TODO: 取得當前選擇日期營養
    // 取得今月營養日記 API 
    const getDiarys = async() => {
      try {
        const res = await apiGetDiarys()

        console.log(moment().format('YYYY-MM-DD'))
  
        diarys.value = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  
    getDiarys()

    return {
      diarys
    }
  }
}
</script>