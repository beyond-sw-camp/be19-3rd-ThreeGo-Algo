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
          <Input placeholder="이메일" icon="mail.svg" width="100%" v-model="email" />
          <CustomButton height="sm" @click="handleRequestVerification">인증 요청</CustomButton>
        </div>

        <div class="input-group">
          <Input placeholder="인증번호" width="100%" v-model="verificationCode" />
          <CustomButton height="sm" @click="handleVerifyCode">확인</CustomButton>
        </div>

        <p v-if="verificationMessage" :class="isVerificationError ? 'error-message' : 'message'">
          {{ verificationMessage }}
        </p>

        <Input placeholder="비밀번호" icon="lock.svg" width="100%" v-model="password" type="password" />
        <Input placeholder="비밀번호 확인" icon="lock.svg" width="100%" v-model="passwordCheck" type="password" />
        <Input placeholder="닉네임" icon="user.svg" width="100%" v-model="nickname" />

        <div class="checkbox-container">
          <input type="checkbox" id="privacy" v-model="isAgreed" />
          <label for="privacy" class="privacyTxt">개인 정보 수집 및 이용에 동의합니다.</label>
        </div>

        <p v-if="signupMessage" :class="isSignupError ? 'error-message' : 'message'">
          {{ signupMessage }}
        </p>

        <CustomButton
          width="100%"
          height="sm"
          :disabled="!isVerified || !isAgreed"
          @click="handleSignup"
        >
          회원 가입
        </CustomButton>

        <div class="login-line">
          <p>이미 계정이 있으신가요?</p>
          <p class="login" @click="goToLogin">로그인</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'

const router = useRouter()

const isVerified = ref(false)
const isAgreed = ref(false)
const isVerificationError = ref(false)
const isSignupError = ref(false)

const email = ref('')
const verificationCode = ref('')
const correctCode = ref('')
const password = ref('')
const passwordCheck = ref('')
const nickname = ref('')

const verificationMessage = ref('')
const signupMessage = ref('')

const handleRequestVerification = () => {
  correctCode.value = '123456' // TODO: fetch 요청으로 받아오기
  verificationMessage.value = ''
  isVerified.value = false
  console.log('인증 요청 버튼 클릭됨')
}

const handleVerifyCode = () => {
  if (verificationCode.value === correctCode.value) {
    isVerified.value = true
    isVerificationError.value = false
    verificationMessage.value = '인증이 성공되었습니다.'
  } else {
    isVerified.value = false
    isVerificationError.value = true
    verificationMessage.value = '인증번호가 일치하지 않습니다.'
  }
}

const handleSignup = () => {
  if (password.value !== passwordCheck.value) {
    isSignupError.value = true
    signupMessage.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  isSignupError.value = false
  console.log('회원가입 성공', {
    email: email.value,
    password: password.value,
    nickname: nickname.value
  })
}

const goToLogin = () => {
  router.push('/login')
}
</script>
<style scoped>

.error-message {
  color: red;
  font-size: 13px;
  align-self: flex-start;
  margin-top: -5px;
  margin-bottom: 10px;
}

.message {
  color: green;
  font-size: 13px;
  align-self: flex-start;
  margin-top: -5px;
  margin-bottom: 10px;
}

.signup-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.left-side {
  flex: 1;
  background: linear-gradient(#FDFEFF 0%, #CAEDFF 97%);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 10px;
}

.subtext {
  font-size: 23px;
  color: #383838;
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

.checkbox-container {
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #383838;
}

.checkbox-container input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.privacyTxt {
  font-weight: 200;
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

.login-line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  margin-top: 10px;
}

.login-line .login {
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.2s;
}

.login-line .login:hover {
  color: #0056b3;
}
</style>
