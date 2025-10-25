<template>
  <div class="login-container">
    <div class="left-side">
      <img src="@/assets/images/algo_logo.png" alt="Logo" class="logo" />

      <div class="left-content">
        <p class="slogan">
          매일 성장하는 당신을<br/>
          응원하는 ALGO입니다.
        </p>
  
        <img src="@/assets/images/login.png" alt="login image" class="login-image" />
      </div>
    </div>

    <div class="right-side">
      <div class="form-container">
        <h2 class="title">로그인</h2>

        <Input placeholder="이메일" icon="mail.svg" width="100%" />
        <Input placeholder="비밀번호" icon="lock.svg" width="100%" />
       
        <CustomButton
          width="100%"
          height="sm"
          @click="handleLogin"
        >
          로그인
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'

const handleLogin = () => {
  console.log('로그인 버튼 클릭됨')
}
</script>

<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.left-side {
  flex: 1;
  background: linear-gradient(#FDFEFF 0%, #CAEDFF 97%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.logo {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 75px;
}

.left-content {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.slogan {
  font-size: 40px;
  font-weight: 600;
  color: #383838;
  line-height: 1.4;
  text-align: left;
  margin-bottom: 30px;
}

.login-image {
  width: 385px;
  height: 385px;
  align-self: center;
}

.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.form-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container > :not(.input-group):not(h2) {
  margin-bottom: 15px;
}

h2 {
  align-self: flex-start;
  text-align: left;
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #383838;
}
</style>
