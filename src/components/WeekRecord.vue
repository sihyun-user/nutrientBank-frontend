<template>
  <base-card class="week-record">
    <div class="week-record__header">
      <div class="week-record__title">當週成效</div>
      <div class="week-record__word">
        攝取 {{contentValue}} kcal<span></span>消耗 {{sportValue}} kcal
      </div>
    </div>
    <div class="week-record__spline"></div>
  </base-card>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard.vue'
import { ref, onMounted, toRefs, watch } from 'vue'
export default {
  props: {
    weekNutrition: {
      type: Object
    }
  },
  components: {
    BaseCard
  },
  setup(props) {
    const { weekNutrition } = toRefs(props)
    const contentRecord = ref(['消耗kcal量', 0, 0, 0, 0, 0, 0, 0])
    const sportRecord = ref(['消耗kcal量', 0, 0, 0, 0, 0, 0, 0])
    const contentValue = ref(0)
    const sportValue = ref(0)

    onMounted(() => renderSpline())

    watch(weekNutrition,() =>  {
      setWeekRcord()
      renderSpline()
    })

    const setWeekRcord = () => {
      const week_data = weekNutrition.value
      let record = ['攝取kcal量']
      let total = 0
      for(let date in week_data) {
        let { content } = week_data[date].calories
        record.push(content)
        total += content
      }

      contentRecord.value = record
      contentValue.value = total
    }

    const renderSpline = () => {
      let splineChart = c3.generate({
        bindto: '.week-record__spline',
        data: {
          type: 'spline',
          columns: [ contentRecord.value, sportRecord.value],
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
      })
    }

    return {
      contentValue,
      sportValue
    }
  }
}
</script>