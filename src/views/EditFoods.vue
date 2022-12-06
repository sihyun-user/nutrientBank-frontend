<template>
  <div class="edit-foods">
    <div class="edit-foods__nav">
      <span class="edit-foods__nav--item edit-foods__nav--item-active">自訂食品 (15)</span>
      <div class="edit-foods__nav--item">我的書籤 (20)</div>
    </div>
    <form @submit.prevent="searchEntered">
      <div class="edit-foods__entered">
        <div class="edit-foods__entered-text">
          <input type="text" placeholder="食品搜尋..." v-model="enteredKeyword">
          <button type="submit" class="edit-food__entered-icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
    <ul class="edit-foods__list">
      <base-foodItem class="edit-foods__item"></base-foodItem>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseFoodItem from '@/components/ui/BaseFoodItem.vue'
export default {
  components: {
    BaseFoodItem
  },
  setup() {
    const enteredKeyword = ref('')
    const searchEntered = () => {

    }

    return {
      enteredKeyword,
      searchEntered
    }
  }
}
</script>