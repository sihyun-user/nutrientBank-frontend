<template>
  <the-header></the-header>
  <section class="user-info">
    <div class="user-info__container">
      <info-aside></info-aside>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue'
import InfoAside from '@/components/layout/InfoAside.vue'
export default {
  components: {
    TheHeader,
    InfoAside
  }
}
</script>