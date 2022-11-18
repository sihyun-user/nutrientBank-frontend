<template>
  <base-card class="week-record">
    <div class="week-record__header">
      <div class="week-record__title baseTitle">本週成效</div>
      <div class="week-record__word">
        攝取 10410 kcal<span></span>消耗 9430 kcal
      </div>
    </div>
    <div class="week-record__spline"></div>
  </base-card>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard.vue'
import { onMounted } from 'vue'
export default {
  components: {
    BaseCard
  },
  setup() {
    onMounted(() => {
      renderSpline()
    })

    const renderSpline = () => {
      let splineChart = c3.generate({
        bindto: '.week-record__spline',
        data: {
          type: 'spline',
          columns: [
            ['攝取kcal量', 30, 200, 100, 400, 150, 250],
            ['消耗kcal量', 50, 20, 10, 40, 15, 25]
          ],
          colors: {
            '攝取kcal量': '#FFFFFF',
            '消耗kcal量': '#ABE7BC'
          }
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            tick: {
              outer: false
            }
          },
          y: {
            tick: {
              outer: false
            }
          }
        },
        point: {
            show: false
        },
        grid: {
          y: {
            show: true,
            color: '#FFFFF'
          }
        }
      });
    }
  }
}
</script>