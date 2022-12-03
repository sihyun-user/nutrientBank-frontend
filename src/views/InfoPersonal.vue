<template>
  <div class="info-personal">
    <div class="info-personal__heder">個人檔案</div>
    <form class="info-personal__form">
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">姓名</label>
          <input class="info-personal__ented-text" type="text" placeholder="請輸入姓名">
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">E-mail</label>
          <input class="info-personal__ented-text" type="text" disabled="disabled">
        </div>
      </div>
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">生日</label>
          <div class="info-personal__date">
            <base-datePicker :date="birthday" @pick-time="tryPickTime"></base-datePicker>
          </div>
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">性別</label>
          <div class="info-personal__sex">
            <label class="radio__label radioMode">
              <div class="radioMode__wrap">
                <input type="radio" name="sex" value="male">
                <span class="checkmark"></span>
              </div>
              男性
            </label>
            <label class="radio_label radioMode">
              <div class="radioMode__wrap">
                <input type="radio" name="sex" value="female">
                <span class="checkmark"></span>
              </div>
              女性
            </label>
          </div>
        </div>
      </div>
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">身高</label>
          <div class="info-personal__ented-wrap">
            <input class="info-personal__ented-text" type="text" placeholder="請輸入身高">
            <span class="info-personal__ented-unit">公分</span>
          </div>
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">體重</label>
          <div class="info-personal__ented-wrap">
            <input class="info-personal__ented-text" type="text" placeholder="請輸入體重">
            <span class="info-personal__ented-unit">公斤</span>
          </div>
        </div>
      </div>
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">運動量</label>
          <div class="info-personal__select">
            <div class="info-personal__select-text" @click="setTypeMemu('sport')">
              <span>{{sportType}}</span>
              <div class="info-personal__select-icon">
                <i v-if="isOpenSportMenu" class="fa-solid fa-angle-up"></i>
                <i v-else class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <ul v-if="isOpenSportMenu" class="info-personal__select-list">
              <li v-for="(type, index) in sportArray" :key="index"
              :class="{ 'info-personal__select-selected': sportType==type }"
              @click="setTypeValue('sport', type)"
              >
                <input id="type" type="radio">
                <label for="type">{{type}}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">健身目標</label>
          <!-- <input class="info-personal__ented-text" type="text" placeholder="請選健身目標"> -->
          <div class="info-personal__select">
            <div class="info-personal__select-text" @click="setTypeMemu('fitness')">
              <span>{{fitnessType}}</span>
              <div class="info-personal__select-icon">
                <i v-if="isOpenFitnessMenu" class="fa-solid fa-angle-up"></i>
                <i v-else class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <ul v-if="isOpenFitnessMenu" class="info-personal__select-list">
              <li v-for="(type, index) in goalArray" :key="index"
              :class="{ 'info-personal__select-selected': fitnessType==type }"
              @click="setTypeValue('fitness', type)"
              >
                <input id="type" type="radio">
                <label for="type">{{type}}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button type="submit" class="info-personal__btn orangeBigBtn">更新個人檔案</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseDatePicker from '@/components/ui/BaseDatePicker.vue'
export default {
  components: {
    BaseDatePicker
  },
  setup() {
    const sportArray = ['幾乎不運動', '每週運動 1-3 次', '每週運動 3-5 次', '每週運動 6-7 次', '每週運動 6次以上']
    const goalArray = ['減脂', '溫和減脂 (減少肌肉流失)', '維持體重', '溫和增肌 (減少體質積累)', '增肌']
    const birthday = ref('2000/01/01')
    const sportType = ref('幾乎不運動')
    const fitnessType = ref('維持體重')
    const isOpenSportMenu = ref(false)
    const isOpenFitnessMenu = ref(false)
    
    //TODO: 身高體重限制數字

    // 設置設置運動量、健身目標下拉選單
    const setTypeMemu = (type) => {
      if(type=='sport') {
        isOpenSportMenu.value = !isOpenSportMenu.value
      }else {
        isOpenFitnessMenu.value = !isOpenFitnessMenu.value
      }
    }
    // 設置運動量、健身目標類別
    const setTypeValue = (type, typeValue) => {
      if(type=='sport') {
        isOpenSportMenu.value = false
        sportType.value = typeValue
      }else {
        isOpenFitnessMenu.value = false
        fitnessType.value = typeValue
      }
    }

    const tryPickTime = (payload) => {
      birthday.value = payload
      console.log('birthday', birthday.value)
    }

    window.addEventListener('click',(e) => {
      const $select = e.target.closest('.info-personal__select')
      if($select &&(!isOpenSportMenu.value || !isOpenFitnessMenu.value)) return
      isOpenSportMenu.value = false
      isOpenFitnessMenu.value = false
    })

    return {
      sportArray,
      goalArray,
      birthday,
      sportType,
      fitnessType,
      isOpenSportMenu,
      isOpenFitnessMenu,
      setTypeMemu,
      setTypeValue,
      tryPickTime
    }
  }
}
</script>