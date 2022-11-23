<template>
  <base-light-box title="新增營養紀錄" @close="tryClose"></base-light-box>
</template>

<script>
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
export default {
  components: {
    BaseLightBox
  },  
  setup() {
    const tryClose = () => {
      
    }

    return {
      tryClose
    }
  }
}
</script>