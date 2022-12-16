import { ref, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import useCalcNutrition from '@/hooks/calcNutrition'
import moment from 'moment'

export const useSetMonthNutrition = () => {
  const store = useStore()
  const monthDiarys = ref([])
  const selectedDate = ref(null)
  const selectedWeekly = ref(null)
  const { updateNutrition, weekNutrition, diaryRecords } = useCalcNutrition(monthDiarys, selectedWeekly)

  onMounted(() => getMonthDiarys())

  watch(monthDiarys, () => updateNutrition())

  // 設置今日日期
  const setTodayDate = () => {
    const today = moment().format('YYYY-MM-DD')
    selectedDate.value = today
    selectedWeekly.value = today
  }
  // 取得今月日記 
  const getMonthDiarys = async() => {
    const data = await store.getDiarys(selectedDate.value)
    monthDiarys.value = data
  }
  // 設置選擇星期
  const tryChangeWeekly = (payload) => {
    selectedWeekly.value = payload
    updateNutrition()
  }
  // 設置選擇日期
  const tryUpdateDate = (payload) => {
    selectedDate.value = payload
  }

  setTodayDate()

  return {
    monthDiarys,
    weekNutrition,
    selectedDate,
    selectedWeekly,
    diaryRecords,
    getMonthDiarys,
    tryChangeWeekly,
    tryUpdateDate
  }
}

export default useSetMonthNutrition