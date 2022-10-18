<template>
  <router-view></router-view>
</template>

<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './store'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    watch(() => router.path, () => store.$patch({ errorMsg: '' }))
  }
}
</script>
