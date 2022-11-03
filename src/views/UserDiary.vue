<template>
  <section class="diary">
    <div v-for="diary in diarys" :key="diary.diaryId" :food="diary.food">
      <Skillbar></Skillbar>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { apiUserLogin } from '../service/api'
import Skillbar from '../components/layout/Skillbar.vue'
export default {
  components: {
    Skillbar
  },
  setup() {
    const diarys = ref(null)
    const getMonthDiary = async() => {
      try {
        const res = await apiUserLogin()
  
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