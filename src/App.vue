<template>
  <router-view></router-view>
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from './store'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    watch(() => route.path, () => {
      store.$patch({ errorMsg: '' })
      store.$patch({ isLoading: false })
    })
  }
}
</script>
