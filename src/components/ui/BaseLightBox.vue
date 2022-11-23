<template>
  <section class="lightBox">
    <div class="lightBox__header">
      <h1>{{title}}</h1>
      <div class="lightBox__header--close" @click="tryClose"><i class="fa-solid fa-x"></i></div>
    </div>
    <div class="lightBox__content">
      <slot></slot>
    </div>
  </section>
  <div class="baseMask"></div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  emits: ['close'],
  setup(_, context) {
    
    const tryClose = () => {
      context.emit('close')
    }

    return {
      tryClose
    }
  }
}
</script>