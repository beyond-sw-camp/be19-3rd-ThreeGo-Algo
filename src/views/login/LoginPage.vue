<template>
  <div class="login-container">
    <div class="left-side">
      <img src="@/assets/images/algo_logo.png" alt="Logo" class="logo" />

      <div class="left-content">
        <p class="slogan">
          매일 성장하는 당신을<br />
          응원하는 ALGO입니다.
        </p>

        <img src="@/assets/images/login.png" alt="login image" class="login-image" />
      </div>
    </div>

    <div class="right-side">
      <div class="form-container">
        <h2 class="title">로그인</h2>

        <Input placeholder="이메일" icon="mail.svg" width="100%" v-model="email" />
        <Input placeholder="비밀번호" icon="lock.svg" width="100%" type="password" v-model="password" />
        <p v-if="isError" class="error-message">{{ message }}</p>
        <CustomButton width="100%" height="sm" @click="handleLogin">
          로그인
        </CustomButton>
        <div class="find-line">
          <p>계정이 없으신가요?</p>
          <p class="find" @click="goToSignup">회원가입</p>
        </div>

        <div class="find-links">
          <p class="find">아이디 찾기</p>
          <span class="divider">|</span>
          <p class="find">비밀번호 찾기</p>
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
import memberApi from '@/api/memberApi'

const email = ref('')
const password = ref('')
const isError = ref(false)
const message = ref('')
const router = useRouter()

const goToSignup = () => {
  router.push('/signup')
}

const handleLogin = async () => {
  isError.value = false
  message.value = ''

  try {
    const res = await memberApi.post('/login', {
      email: email.value,
      password: password.value,
    })

    const token =
      res.headers['token'] ||
      res.headers['authorization'] ||
      res.data.token ||
      null

    if (token) {
      localStorage.setItem('accessToken', token)

      // 토큰에서 닉네임 추출
      const payload = JSON.parse(atob(token.split('.')[1]))
      const nickname = payload.nickname || payload.sub || '사용자'
      localStorage.setItem('nickname', nickname)

      console.log('로그인 성공:', nickname)
      router.push('/')
    } else {
      isError.value = true
      message.value = '아이디 또는 비밀번호를 잘못 입력하셨습니다.'
    }
  } catch (err) {
    isError.value = true
    if (err.response?.status === 401) {
      message.value = '아이디 또는 비밀번호를 잘못 입력하셨습니다.'
    } else {
      message.value = '로그인 중 오류가 발생했습니다.'
    }
  }
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

.form-container> :not(.input-group):not(h2):not(.error-message) {
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

.error-message {
  color: red;
  font-size: 13px;
  align-self: flex-start;
  margin-top: -5px;
  margin-bottom: 10px;
}

.find-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  margin-top: 10px;
}

.find-links {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
}

.find-links .divider {
  color: #888;
}

.find {
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.2s;
}

.find:hover {
  color: #0056b3;
}
</style>