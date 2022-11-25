<template>
  <base-light-box v-if="showBox" @close="tryClose">
    <food-detail></food-detail>
  </base-light-box>
</template>

<script>
import { ref } from 'vue'
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
import FoodDetail from '@/components/layout/FoodDetail.vue'
export default {
  components: {
    BaseLightBox,
    FoodDetail,
  },
  setup() {
    const showBox = ref(true)

    const tryClose = () => {
      showBox.value = false
    }
    
    return {
      showBox,
      tryClose
    }
  }
}
</script>