<template>
  <div class="skillbar">
    <div class="skillbar__wrapper">
      <div class="skillbar__title">熱量</div>
      <div class="skillbar__value">
        <span class="skillbar__value--total">757</span>/
        <span class="skillbar__value--target">1560</span> (kcal)
      </div>
    </div>
    <div class="skillbar__bar">
      <div class="skillbar__barControl" :style="{'width':`${percent}%` }"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  setup() {
    const percent = ref(0);

    const setBarControl = () => {
      setTimeout(() => {
        percent.value = 80
      }, 300)
    }


    setBarControl()

    return {
      percent
    }
  }
}
</script>