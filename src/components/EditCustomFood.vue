<template>
  <base-lightBox>
    <form class="edit-custom" @click.prevent="">
      <div class="edit-custom__header">修改自訂食品</div>
    </form>
  </base-lightBox>
</template>

<script>
import BaseLightBox from '@/components/ui/BaseLightBox.vue'
export default {
  components: {
    BaseLightBox
  },
  setup() {
  } 
}
</script>