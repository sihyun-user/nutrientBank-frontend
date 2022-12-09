<template>
  <base-card class="diary-record">
    <div class="diary-record__header">
      <div class="diary-record__title">我的營養日記</div>
      <router-link to="user-search" class="baseBtn">
        <i class="fa-solid fa-plus"></i>
        <span>新增營養紀錄</span>
      </router-link>
    </div>
    <table class="diary-record__table">
      <tr>
        <td class="diary-record__table--header">品項 / 份數</td>
        <td class="diary-record__table--item">卡路里</td>
        <td class="diary-record__table--item">蛋白質</td>
        <td class="diary-record__table--item">碳水化合物</td>
        <td class="diary-record__table--item">脂肪</td>
        <td class="diary-record__table--item">飽和脂肪</td>
        <td class="diary-record__table--item">反式脂肪</td>
        <td class="diary-record__table--item">糖</td>
        <td class="diary-record__table--item">鈉</td>
        <td class="diary-record__table--edit">編輯</td>
        <td class="diary-record__table--delete">刪除</td>
      </tr>
      <tr>
        <td class="diary-record__table--header">早餐</td>
      </tr>
      <tr>
        <td class="diary-record__table--header">三角飯糰 (肉鬆) / 1.0</td>
        <td class="diary-record__table--item">226</td>
        <td class="diary-record__table--item">37.7</td>
        <td class="diary-record__table--item">6</td>
        <td class="diary-record__table--item">5.7</td>
        <td class="diary-record__table--item">231</td>
        <td class="diary-record__table--item">0</td>
        <td class="diary-record__table--item">20</td>
        <td class="diary-record__table--item">0</td>
        <td class="diary-record__table--edit">
          <i class="fa-solid fa-pen"></i>
        </td>
        <td class="diary-record__table--delete">
          <i class="fa-solid fa-x"></i>
        </td>
      </tr>
  </table>
  </base-card>
</template>

<script>
import { toRefs, watch } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
export default {
  components: {
    BaseCard
  },
  props: {
  },
  setup(props) {
  }
}
</script>