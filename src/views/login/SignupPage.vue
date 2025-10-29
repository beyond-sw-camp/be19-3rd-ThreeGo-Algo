<template>
  <div class="signup-container">
    <div class="left-side">
      <div class="logo-section" @click="goHome">
        <img src="@/assets/images/algo_logo.png" alt="logo" class="logo-icon" />
      </div>

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

        <!-- 이메일 입력 + 인증요청 -->
        <div class="input-group">
          <Input placeholder="이메일" icon="mail.svg" width="100%" v-model="email" />
          <CustomButton height="sm" :disabled="(verificationTimer > 0 && !isVerified) || !email"
            @click="handleRequestVerification">
            {{ verificationTimer > 0 && !isVerified ? '재요청 불가' : '인증 요청' }}
          </CustomButton>
        </div>

        <!-- 인증번호 입력 -->
        <div class="input-group">
          <Input placeholder="인증번호" width="100%" v-model="verificationCode" />
          <CustomButton height="sm" @click="handleVerifyCode" :disabled="!email">
            확인
          </CustomButton>
        </div>

        <!-- 타이머 표시 -->
        <p v-if="verificationTimer > 0 && !isVerified" class="timer-text">
          남은 시간: {{ formattedTime }}
        </p>

        <!-- 인증 관련 메시지 -->
        <p v-if="verificationMessage" :class="isVerificationError ? 'error-message' : 'message'">
          {{ verificationMessage }}
        </p>

        <!-- 비밀번호 입력 -->
        <Input placeholder="비밀번호" icon="lock.svg" width="100%" v-model="password" type="password" />
        <Input placeholder="비밀번호 확인" icon="lock.svg" width="100%" v-model="passwordCheck" type="password" />
        <Input placeholder="닉네임" icon="user.svg" width="100%" v-model="nickname" />

        <!-- 약관 동의 -->
        <div class="checkbox-container">
          <input type="checkbox" id="privacy" v-model="isAgreed" />
          <label for="privacy" class="privacyTxt">
            (필수)
            <a href="#" class="terms-link" @click.prevent="openTerms">
              이용약관 및 개인정보처리방침
            </a>
            에 동의합니다.
          </label>
        </div>

        <!-- 회원가입 메시지 -->
        <p v-if="signupMessage" :class="isSignupError ? 'error-message' : 'message'">
          {{ signupMessage }}
        </p>

        <!-- 회원가입 버튼 -->
        <CustomButton width="100%" height="sm" :disabled="!isVerified || !isAgreed" @click="handleSignup">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import memberApi from '@/api/memberApi'

const router = useRouter()

// 상태 관리
const isVerified = ref(false)
const isAgreed = ref(false)
const isVerificationError = ref(false)
const isSignupError = ref(false)

const email = ref('')
const verificationCode = ref('')
const password = ref('')
const passwordCheck = ref('')
const nickname = ref('')

const verificationMessage = ref('')
const signupMessage = ref('')

// 타이머 관련
const verificationTimer = ref(0)
let timerInterval = null

// 시간 포맷: mm:ss
const formattedTime = computed(() => {
  const min = Math.floor(verificationTimer.value / 60)
  const sec = verificationTimer.value % 60
  return `${min}:${sec < 10 ? '0' + sec : sec}`
})

// 타이머 시작
const startTimer = () => {
  clearInterval(timerInterval)
  verificationTimer.value = 180 // 3분
  timerInterval = setInterval(() => {
    if (verificationTimer.value > 0) {
      verificationTimer.value--
    } else {
      clearInterval(timerInterval)
      verificationMessage.value = '인증번호가 만료되었습니다. 다시 요청해주세요.'
      isVerificationError.value = true
    }
  }, 1000)
}

// 인증번호 요청
const handleRequestVerification = async () => {
  try {
    if (!email.value) {
      verificationMessage.value = '이메일을 입력해주세요.'
      isVerificationError.value = true
      return
    }

    await memberApi.post('/auth/email', { email: email.value })
    // verificationMessage.value = '인증번호가 이메일로 전송되었습니다.'
    isVerificationError.value = false
    isVerified.value = false
    startTimer() // 타이머 시작
  } catch (err) {
    verificationMessage.value = '이메일 전송 실패. 이미 가입된 이메일일 수 있습니다.'
    isVerificationError.value = true
  }
}

const handleVerifyCode = async () => {
  try {
    await memberApi.get('/auth/code', {
      params: {
        mail: email.value,
        code: verificationCode.value
      }
    })
    verificationMessage.value = '이메일 인증 완료!'
    isVerified.value = true
    isVerificationError.value = false
    clearInterval(timerInterval) // 인증 성공 시 타이머 종료
  } catch (err) {
    verificationMessage.value = '❌ 인증번호가 일치하지 않습니다.'
    isVerificationError.value = true
    isVerified.value = false
  }
}

const handleSignup = async () => {
  if (password.value !== passwordCheck.value) {
    isSignupError.value = true
    signupMessage.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  if (!isVerified.value) {
    isSignupError.value = true
    signupMessage.value = '이메일 인증을 완료해주세요.'
    return
  }

  try {
    await memberApi.post('/signup', {
      email: email.value,
      password: password.value,
      nickname: nickname.value
    })
    signupMessage.value = '🎉 회원가입이 완료되었습니다!'
    isSignupError.value = false
    setTimeout(() => router.push('/login'), 1000)
  } catch (err) {
    signupMessage.value = '회원가입 실패. 다시 시도해주세요.'
    isSignupError.value = true
  }
}

const goHome = () => router.push('/')
const goToLogin = () => router.push('/login')
const openTerms = () => window.open('/algo-terms', '_blank', 'noopener,noreferrer')
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

.logo-section {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-icon {
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

.form-container> :not(.input-group):not(h2) {
  margin-bottom: 15px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  align-self: flex-start;
  gap: 6px;
  font-size: 12px;
  color: #383838;
  margin-bottom: 10px;
}

.privacyTxt {
  font-weight: 300;
}

.terms-link {
  font-size: 12px;
  color: #0AA2EB;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
}

.terms-link:hover {
  color: #0056b3;
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

.timer-text {
  font-size: 13px;
  color: #0aa2eb;
  align-self: flex-start;
  margin-top: -5px;
  margin-bottom: 5px;
}
</style>
