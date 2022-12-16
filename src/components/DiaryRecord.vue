<template>
  <base-card class="diary-record">
    <div class="diary-record__header">
      <div class="diary-record__title">我的營養日記</div>
      <router-link to="user-search" class="baseBtn">
        <i class="fa-solid fa-plus"></i>
        <span>新增營養紀錄</span>
      </router-link>
    </div>
    <div class="diary-record__table">
      <div class="diary-record__table--header">
        <div class="diary-record__table--main diary-record__table--main-1">品項 / 份數</div>
        <div class="diary-record__table--item diary-record__table--item-kacl">卡路里<br>kcal</div>
        <div class="diary-record__table--item">蛋白質<br>g</div>
        <div class="diary-record__table--item">碳水化合物<br>g</div>
        <div class="diary-record__table--item">脂肪<br>g</div>
        <div class="diary-record__table--item">飽和脂肪<br>g</div>
        <div class="diary-record__table--item">反式脂肪<br>g</div>
        <div class="diary-record__table--item">糖<br>g</div>
        <div class="diary-record__table--item">鈉<br>mg</div>
        <div class="diary-record__table--edit">編輯</div>
        <div class="diary-record__table--delete">刪除</div>
      </div>
      <div v-for="(record, type) in dateRecord" :key="type"
      class="diary-record__table--row">
        <div class="diary-record__table--main diary-record__table--main-2">
          {{type=='breakfast'?'早餐':(type=='lunch'?'午餐':(type=='dinner'?'晚餐':'點心'))}}
        </div>
        <div class="diary-record__table--main" v-if="record.length == 0">暫無紀錄</div>
        <div v-for="item in record" :key="item.diaryId" 
        class="diary-record__table--content">
          <div class="diary-record__table--main">{{item.food.name}} / {{item.quantity}}份</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['calories'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['protein'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['carbohydrates'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['fat'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['saturated_fat'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['trans_fat'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['sugar'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--item">{{(item.food.nutrition['sodium'] * item.quantity).toFixed(1).replace(/.0+$/g,'')}}</div>
          <div class="diary-record__table--edit" @click="setEditWindow(item)"><i class="fa-solid fa-pen"></i></div>
          <div class="diary-record__table--delete" @click="deleteOneDiary"><i class="fa-solid fa-x"></i></div>
        </div>
      </div>
    </div>
  </base-card>
  <base-light-box v-if="showBox" @close="tryClose">
    <edit-diary :selectDiary="selectDiary" @update-diary="tryUpdateDiary"></edit-diary>
  </base-light-box>
</template>

<script>
import { ref, toRefs, computed } from 'vue'
import { useStore } from '@/store'
import BaseCard from '@/components/ui/BaseCard.vue'
import EditDiary from '@/components/EditDiary.vue'
export default {
  emits: ['update-diary'],
  components: {
    BaseCard,
    EditDiary
  },
  props: {
    diaryRecords: {
      type: Object
    },
    selectedDate: {
      type: String
    }
  },
  setup(props, context) {
    const showBox = ref(false)
    const selectDiary = ref(null)
    const { diaryRecords, selectedDate } = toRefs(props)

    const dateRecord = computed(() => diaryRecords.value[selectedDate.value])

    // 設置編輯彈窗
    const setEditWindow = (diary) => {
      showBox.value = true
      selectDiary.value = diary
    }
    // 刪除一筆營養日記
    const deleteOneDiary = () => {
      store.updateOneDiary({diaryId, paramData})
      context.emit('update-diary')
    }
    // 編輯一筆營養日記
    const tryUpdateDiary = () => {
      context.emit('update-diary')
      tryClose()
    }
    
    const tryClose = () => {
      showBox.value = false
    }

    return {
      showBox,
      selectDiary,
      dateRecord,
      setEditWindow,
      deleteOneDiary,
      tryUpdateDiary,
      tryClose
    }
  }
}
</script>