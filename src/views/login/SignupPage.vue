<template>
  <div class="signup-container">
    <div class="left-side">
      <img src="@/assets/images/algo_logo.png" alt="Logo" class="logo" />

      <div class="left-content">
        <p class="slogan">
          몰라도 된다! <br />
          알고 있으면 되니까!
        </p>
        <p class="subtext">
          지금 가입하고, 당신의 가능성을 시작하세요.
        </p>
        <img src="@/assets/images/signup.png" alt="Signup Illustration" class="signup-image" />
      </div>
    </div>

    <div class="right-side">
      <div class="form-container">
        <h2 class="title">회원가입</h2>

        <div class="input-group">
          <Input placeholder="이메일" icon="mail.svg" width="100%" />
          <CustomButton height="sm" @click="handleRequestVerification">인증 요청</CustomButton>
        </div>

        <div class="input-group">
          <Input placeholder="인증번호" width="100%" />
          <CustomButton height="sm" @click="handleVerifyCode">확인</CustomButton>
        </div>

        <Input placeholder="비밀번호" icon="lock.svg" width="100%" />
        <Input placeholder="비밀번호 확인" icon="lock.svg" width="100%" />
        <Input placeholder="닉네임" icon="user.svg" width="100%" />

        <CustomButton
          width="100%"
          height="sm"
          :disabled="!isVerified"
          @click="handleSignup"
        >
          회원 가입
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'

const isVerified = ref(false)

const handleRequestVerification = () => {
  console.log('인증 요청 버튼 클릭됨')
}

const handleVerifyCode = () => {
  console.log('인증번호 확인 버튼 클릭됨')
  isVerified.value = true
}

const handleSignup = () => {
  console.log('회원 가입 버튼 클릭됨')
}
</script>

<style scoped>
.signup-container {
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
  margin-bottom: 10px;
}

.subtext {
  font-size: 23px;
  color: #383838;
  text-align: left;
  margin-bottom: 40px;
}

.signup-image {
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

.input-group {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
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
