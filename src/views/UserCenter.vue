<template>
  <the-header></the-header>
  <section class="main">
    <main class="main__container">
      <router-view></router-view>
    </main>
  </section>
</template>

<script>
import TheHeader from '../components/layout/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>