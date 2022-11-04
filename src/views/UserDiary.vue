<template>
  <section class="diary">
    <div v-for="diary in diarys" :key="diary.diaryId" :food="diary.food">
      <Skill-bar></Skill-bar>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { apiGetDiarys } from '../service/api'
import SkillBar from '../components/layout/SkillBar.vue'
export default {
  components: {
    SkillBar
  },
  setup() {
    const diarys = ref(null)

    const getMonthDiary = async() => {
      try {
        const res = await apiGetDiarys()
  
        diarys.value = res.data.data
      } catch (error) {
        console.log(error)
      }
    }

    getMonthDiary()

    return {
      diarys
    }
  }
}
</script>