<template>
    <div class="admin-login">
        <div class="left-panel">
            <img src="@/assets/images/algo_logo.png" alt="logo" class="logo" />
            <p class="slogan">매일 성장하는 당신을<br />응원하는 ALGO입니다.</p>
            <img src="@/assets/images/login.png" alt="login" class="illustration" />
        </div>

        <div class="right-panel">
            <div class="login-box">
                <h2>관리자 로그인</h2>
                <el-input v-model="email" placeholder="이메일" prefix-icon="Message" />
                <el-input v-model="password" placeholder="비밀번호" prefix-icon="Lock" type="password" />
                <el-button type="primary" block @click="handleLogin">로그인</el-button>
                <p class="footer">ALGO © 2025 ThreeGo. All rights reserved.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
    if (email.value === 'admin@algo.com' && password.value === 'admin123') {
        localStorage.setItem('adminToken', 'fake-token')
        router.push('/admin/member')
    } else {
        ElMessage.error('잘못된 관리자 계정입니다.')
    }
}
</script>

<style scoped>
.admin-login {
    display: flex;
    height: 100vh;
    font-family: 'Noto Sans KR', sans-serif;
}

.left-panel {
    flex: 1;
    background: #0b2447;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.logo {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 80px;
}

.slogan {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 40px;
}

.illustration {
    width: 340px;
}

.right-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
}

.login-box {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

h2 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
}

.footer {
    font-size: 12px;
    color: #999;
    text-align: center;
    margin-top: 10px;
}
</style>
