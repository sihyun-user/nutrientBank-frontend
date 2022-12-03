<template>
  <div class="date-picker">
    <div class="date-picker__icon">
      <i  class="fa-regular fa-calendar"></i>
    </div>
    <datepicker
    v-model="selectedTime"
    inputFormat="yyyy/MM/dd"
    class="date-picker__input"
    >
    </datepicker>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import Datepicker from 'vue3-datepicker'
import moment from 'moment'
export default {
  emits: ['pick-time'],
  components: {
    Datepicker
  },
  props: {
    date: {
      trype: String
    }
  },
  setup(props,context) {
    const selectedTime = ref(new Date(props.date))

    watch(selectedTime, () => handleSelectTime())

    const handleSelectTime = () => {
      let date = moment(selectedTime.value).format('YYYY/MM/DD')
      context.emit('pick-time', date)
    }

    return {
      selectedTime,
      handleSelectTime
    }
  }
}
</script>
