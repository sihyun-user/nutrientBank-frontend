<template>
  <div class="info-personal">
    <div class="info-personal__heder">個人檔案</div>
    <form class="info-personal__form" @submit.prevent="updateProfile">
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">暱稱</label>
          <input class="info-personal__ented-text" type="text" 
          placeholder="請輸入暱稱" v-model="personalInfo.name">
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">E-mail</label>
          <input class="info-personal__ented-text" type="text" disabled="disabled" 
          v-model="personalInfo.email">
        </div>
      </div>
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">生日</label>
          <div class="info-personal__date">
            <base-datePicker :date="personalInfo.birthday" @pick-time="tryPickTime"></base-datePicker>
          </div>
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">性別</label>
          <div class="info-personal__sex">
            <label class="radio__label radioMode">
              <div class="radioMode__wrap">
                <input type="radio" name="sex" value="1" v-model="personalInfo.sex">
                <span class="checkmark"></span>
              </div>
              男性
            </label>
            <label class="radio_label radioMode">
              <div class="radioMode__wrap">
                <input type="radio" name="sex" value="0" v-model="personalInfo.sex">
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
            <input class="info-personal__ented-text"
            type="number" oninput="if(value.length>3)value=value.slice(0,3)"
            v-model="personalInfo.height" placeholder="請輸入身高">
            <span class="info-personal__ented-unit">公分</span>
          </div>
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">體重</label>
          <div class="info-personal__ented-wrap">
            <input class="info-personal__ented-text"
            type="number" oninput="if(value.length>2)value=value.slice(0,2)"
            v-model="personalInfo.weight" placeholder="請輸入體重">
            <span class="info-personal__ented-unit">公斤</span>
          </div>
        </div>
      </div>
      <div class="info-personal__row">
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">運動量</label>
          <div class="info-personal__select">
            <div class="info-personal__select-text" @click="setTypeMemu('sport')">
              <span>{{sportText}}</span>
              <div class="info-personal__select-icon">
                <i v-if="isOpenSportMenu" class="fa-solid fa-angle-up"></i>
                <i v-else class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <ul v-if="isOpenSportMenu" class="info-personal__select-list">
              <li v-for="(type, index) in sportData" :key="index"
              :class="{ 'info-personal__select-selected': personalInfo.sportType==type.sportType }"
              @click="setTypeValue('sport', type)"
              >
                <input id="type" type="radio">
                <label for="type">{{type.sportName}}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-personal__ented">
          <label class="info-personal__ented-label">健身目標</label>
          <div class="info-personal__select">
            <div class="info-personal__select-text" @click="setTypeMemu('fitness')">
              <span>{{fitnessText}}</span>
              <div class="info-personal__select-icon">
                <i v-if="isOpenFitnessMenu" class="fa-solid fa-angle-up"></i>
                <i v-else class="fa-solid fa-angle-down"></i>
              </div>
            </div>
            <ul v-if="isOpenFitnessMenu" class="info-personal__select-list">
              <li v-for="(type, index) in fitnessData" :key="index"
              :class="{ 'info-personal__select-selected': personalInfo.fitnessType==type.fitnessType }"
              @click="setTypeValue('fitness', type)"
              >
                <input id="type" type="radio">
                <label for="type">{{type.fitnessName}}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="errorMsg" class="errorMsg info-personal__errorMsg">{{errorMsg}}</div>
      <button type="submit" class="info-personal__btn orangeBigBtn">更新個人檔案</button>
    </form>
  </div>
  <base-spinner v-if="isLoading"></base-spinner>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store'
import BaseDatePicker from '@/components/ui/BaseDatePicker.vue'
import HEALTH_DATA from '@/service/health.json'
export default {
  components: {
    BaseDatePicker
  },
  setup() {
    const store = useStore()
    const sportData = ref(HEALTH_DATA.sport)
    const fitnessData = ref(HEALTH_DATA.fitness)
    const sportText = ref('')
    const fitnessText = ref('')
    const isOpenSportMenu = ref(false)
    const isOpenFitnessMenu = ref(false)
    const personalInfo = reactive({})

    const errorMsg = computed(() => store.errorMsg)
    const isLoading = computed(() => store.isLoading)
    const userInfo = computed(() => store.userInfo)
  
    // 設置個人資料
    const setPersonalInfo = () => {
      Object.assign(personalInfo, userInfo.value)
      delete personalInfo.isAdmin
      sportData.value.forEach(item => {
        if(item.sportType == personalInfo.sportType) {
          sportText.value = item.sportName
        }
      })
      fitnessData.value.forEach(item => {
        if(item.fitnessType == personalInfo.fitnessType) {
          fitnessText.value = item.fitnessName
        }
      })
    }
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
        sportText.value = typeValue.sportName
        personalInfo.sportType = typeValue.sportType
      }else {
        isOpenFitnessMenu.value = false
        fitnessText.value = typeValue.fitnessName
        personalInfo.fitnessType = typeValue.fitnessType
      }
    }
    // 更新個人資料
    const updateProfile = () => {
      if (personalInfo.name.length < 2) {
        return store.$patch({ errorMsg: '暱稱低於2個字元' })
      } else if (personalInfo.height <= 0) {
        return store.$patch({ errorMsg: '身高未填寫正確' })
      } else if (personalInfo.weight <= 0) {
        return store.$patch({ errorMsg: '體重未填寫正確' })
      }
      store.updateProfile(personalInfo)
    }

    const tryPickTime = (payload) => {
      personalInfo.birthday = payload
    }
    window.addEventListener('click',(e) => {
      const $select = e.target.closest('.info-personal__select')
      if($select &&(!isOpenSportMenu.value || !isOpenFitnessMenu.value)) return
      isOpenSportMenu.value = false
      isOpenFitnessMenu.value = false
    })

    setPersonalInfo()

    return {
      sportData,
      fitnessData,
      sportText,
      fitnessText,
      isOpenSportMenu,
      isOpenFitnessMenu,
      personalInfo,
      errorMsg,
      isLoading,
      setTypeMemu,
      setTypeValue,
      updateProfile,
      tryPickTime
    }
  }
}
</script>