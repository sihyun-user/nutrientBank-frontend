<template>
  <div class="edit-password">
    <div class="edit-password__heder">修改密碼</div>
    <form @submit.prevent="updatePassword">
      <div class="edit-password__ented">
        <label class="edit-password__ented-label">密碼</label>
        <input class="edit-password__ented-text" type="text" 
        placeholder="請輸入密碼">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  setup() {

    const updatePassword = () => {

    }

    return {
      updatePassword
    }
  }
}
</script>