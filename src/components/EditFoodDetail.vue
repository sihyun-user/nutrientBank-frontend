<template>
  <form class="edit-food" @submit.prevent="handleFood">
    <div class="edit-food__header">{{title}}</div>
    <div class="edit-food__row">
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">食品名稱</label>
        <input class="edit-food__ented-text" type="text"
        placeholder="請輸入食品名稱(必填)" v-model="editFoodInfo.name">
      </div>
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">食品英文名稱</label>
        <input class="edit-food__ented-text" type="text" 
        placeholder="請輸入食品英文名稱" v-model="editFoodInfo.subName">
      </div>
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">品牌名稱</label>
        <input class="edit-food__ented-text" type="text" 
        placeholder="請輸入品牌名稱" v-model="editFoodInfo.brand">
      </div>
    </div>
    <div class="edit-food__subHeader">份數</div>
    <div class="edit-food__row">
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">每一份量含</label>
        <input class="edit-food__ented-text" type="number"
        placeholder="請輸入每一份量含(必填)" v-model="editFoodInfo.perUnitWeight">
      </div>
      <div class="edit-food__ented edit-food__units">
        <label class="edit-food__ented-label">單位</label>
        <ul class="edit-food__units-list">
          <li class="edit-food__units-item"
          :class="{'edit-food__units-item--active': editFoodInfo.unit == 'g'}"
          @click="switchUiitType('g')"
          >
            <input id="type" type="radio" v-model="editFoodInfo.unit">
            <span>g</span>
          </li>
          <li class="edit-food__units-item"
          :class="{'edit-food__units-item--active': editFoodInfo.unit == 'ml'}"
          @click="switchUiitType('ml')"
          >
            <input id="type" type="radio" v-model="editFoodInfo.unit">
            <span>ml</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="edit-food__subHeader">營養成分</div>
    <div class="edit-food__row">
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">熱量</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入熱量" v-model="editFoodInfo.nutrition.calories">
          <span class="edit-food__ented-unit">kcal</span>
        </div>
      </div>
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">碳水化合物</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入碳水化合物" v-model="editFoodInfo.nutrition.carbohydrates">
          <span class="edit-food__ented-unit">g</span>
        </div>
      </div>
    </div>
    <div class="edit-food__row">
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">蛋白質</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入蛋白質" v-model="editFoodInfo.nutrition.protein">
          <span class="edit-food__ented-unit">g</span>
        </div>
      </div>
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">脂肪</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入脂肪" v-model="editFoodInfo.nutrition.fat">
          <span class="edit-food__ented-unit">g</span>
        </div>
      </div>
    </div>
    <div class="edit-food__row">
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">飽和脂肪</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入飽和脂肪" v-model="editFoodInfo.nutrition.saturated_fat">
          <span class="edit-food__ented-unit">g</span>
        </div>
      </div>
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">反式脂肪</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入反式脂肪" v-model="editFoodInfo.nutrition.trans_fat">
          <span class="edit-food__ented-unit">g</span>
        </div>
      </div>
    </div>
    <div class="edit-food__row">
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">糖</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入糖" v-model="editFoodInfo.nutrition.sugar">
          <span class="edit-food__ented-unit">g</span>
        </div>
      </div>
      <div class="edit-food__ented">
        <label class="edit-food__ented-label">納</label>
        <div class="edit-food__ented-wrap">
          <input class="edit-food__ented-text" type="number" step=0.1
          placeholder="請輸入納" v-model="editFoodInfo.nutrition.sodium">
          <span class="edit-food__ented-unit">mg</span>
        </div>
      </div>
    </div>
    <div v-if="errorMsg" class="errorMsg edit-food__errorMsg">{{errorMsg}}</div>
    <div class="edit-food__btn">
      <button type="submit" class="orangeBigBtn">{{title}}</button>
    </div>
  </form>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from '@/store'
export default {
  emits: ['handle-food'],
  props: {
    title: {
      type: String
    },  
    selectFood: {
      type: Object,
      default: null
    }
  },
  setup(props, context) {
    const store = useStore()
    const editFoodInfo = reactive({
      name: '', 
      subName: '',
      brand: '', 
      perUnitWeight: '',
      unit: 'g',
      nutrition: {
        calories: '',
        carbohydrates: '',
        protein: '',
        fat: '',
        saturated_fat: '',
        trans_fat: '',
        sugar: '',
        sodium: ''
      }
    })

    const errorMsg = computed(() => store.errorMsg)

    // 切換單位
    const switchUiitType = (type) => {
      editFoodInfo.unit = type
    }
    // 設置食品資料
    const setEditInfo = () => {
      if (!props.selectFood) return
      const copy_data = JSON.parse(JSON.stringify(props.selectFood)) // 深層拷貝，去除反應式
      delete copy_data.id, delete copy_data.likes, delete copy_data.type
      Object.assign(editFoodInfo, copy_data)
    }
    // 新增、編輯一筆食品
    const handleFood = async() => {
      store.$patch({ errorMsg: '' })
      if (editFoodInfo.name.trim() == '') {
        return store.$patch({ errorMsg: '食品名稱為必填欄位' })
      } else if (editFoodInfo.perUnitWeight == '') {
        return store.$patch({ errorMsg: '食品每一份量含為必填欄位' })
      }

      let payload = { paramData: editFoodInfo }
      if (props.selectFood) {
        payload.foodId  = props.selectFood.id
      }
      context.emit('handle-food', payload)
    }

    setEditInfo()

    return {
      errorMsg,
      editFoodInfo,
      setEditInfo,
      switchUiitType,
      handleFood
    }
  } 
}
</script>