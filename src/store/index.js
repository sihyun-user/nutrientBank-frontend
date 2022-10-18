import { defineStore } from 'pinia'

export const useStore = defineStore('mainStore', {
  state: () => ({
    errorMsg: ''
  }),
  getters: {
    
  },
  actions: {},
  persist: true
})