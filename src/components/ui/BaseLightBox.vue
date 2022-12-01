<template>
  <div class="lightBox">
    <div class="lightBox__close" @click="tryClose">
      <i class="fa-solid fa-x"></i>
    </div>
    <div class="lightBox__content">
      <slot></slot>
    </div>
  </div>
  <div class="baseMask"></div>
</template>

<script>
export default {
  emits: ['close'],
  setup(_, context) {

    const tryClose = () => {
      context.emit('close')
    }

    window.addEventListener('click',(e) => {
      const $mask = e.target.closest('.baseMask')
      if(!$mask) return
      tryClose()
    })

    return {
      tryClose
    }
  }
}
</script>