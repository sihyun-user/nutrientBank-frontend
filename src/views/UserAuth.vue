<template>
  <section class="auth">
    <div class="container">
      <div class="user">
        <div class="user__title">
          <h1>營養日記</h1>
          <span>NutrientDiary</span>
        </div>
        <div class="user__form">
          <div class="user__form-title">會員登入</div>
          <!-- 登入 -->
          <div class="user__form-login">
            <div class="user__form-entered">
              <label for="login-email">信箱</label>
              <input id="login-email" class="inputMode" type="email">
            </div>
            <div class="user__form-entered">
              <label for="login-password">密碼</label>
              <input id="login-password" class="inputMode" type="password">
            </div>
          </div>

          <!-- 註冊 -->
          <div class="user__form-register" v-if="false">
            <div class="user__form-entered">
              <label for="register-name">暱稱</label>
              <input id="register-name" class="inputMode" type="text">
            </div>
            <div class="user__form-entered">
              <label for="email">信箱</label>
              <input id="register-email" class="inputMode" type="email">
            </div>
            <div class="user__form-entered">
              <label for="register-password">密碼</label>
              <input id="register-password" class="inputMode" type="password">
            </div>
            <div class="user__form-entered">
              <label for="register-confirmPassword">密碼確認</label>
              <input id="register-confirmPassword" class="inputMode" type="password">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>