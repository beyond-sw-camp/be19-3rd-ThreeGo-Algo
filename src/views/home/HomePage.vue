<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <h3>학습부터 취업까지 <strong>- ALG<img src="/koala.svg" alt="코알라" class="kola-icon1" /></strong>와 함께 성장하세요.</h3>
      <h1>몰라도 된다, 알고 있으면 되니까!</h1><br/>

      <!-- 로그인 상태에 따른 조건부 렌더링 -->
      <button v-if="!isLoggedIn" class="start-btn" @click="goToLogin">지금 바로 시작하기</button>
      <div v-else class="welcome-message">
        <img src="/koala.svg" alt="알코알라" class="welcome-icon" />
        <p><strong>{{ userName }}</strong>님 환영합니다</p>
      </div>

      <!-- Auto Carousel Banner -->
      <div class="carousel-container">
        <button class="carousel-arrow left" @click="prevSlide">❮</button>

        <div class="carousel-wrapper">
          <div class="carousel" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(banner, index) in banners" :key="index" class="carousel-item">
              <div class="text-area">
                <h2>{{ banner.number }}</h2>
                <h3>{{ banner.title }}</h3>
                <p>{{ banner.desc }}</p>
              </div>
              <img :src="banner.image" alt="banner image" />
            </div>
          </div>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <span
            v-for="(banner, index) in banners"
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>

        <button class="carousel-arrow right" @click="nextSlide">❯</button>
      </div>
    </section>
    
    <div>
        <h5 style="color: gray">#체계적학습 #기업별코테후기 #AI코드리뷰 #스터디그룹 #레벨업</h5>
    </div>

    <!-- Target Audience Section -->
    <section class="audience-section">
      <h2 class="audience-title">
        ALG<img src="/koala.svg" alt="코알라" class="kola-icon" />는 이런 분들을 위해 만들어졌어요
      </h2>
      <div class="audience-images">
        <img v-for="(image, index) in forImages" :key="index" :src="image" :alt="`for-${index + 1}`" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import home_books from '@/assets/images/home_books.png'
import robot from '@/assets/images/robot.png'
import home_career from '@/assets/images/home_career.png'
import home_study from '@/assets/images/home_study.png'
import home_rank from '@/assets/images/home_rank.png'
import for1 from '@/assets/images/01_for.png'
import for2 from '@/assets/images/02_for.png'
import for3 from '@/assets/images/03_for.png'
import for4 from '@/assets/images/04_for.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToLogin = () => router.push('/login')

// 로그인 상태 확인
const userInfo = ref(null)

// 로그인 여부 계산
const isLoggedIn = computed(() => userInfo.value !== null)

// 사용자 이름 (닉네임 또는 이메일의 @ 앞부분 사용)
const userName = computed(() => {
  if (!userInfo.value) return ''
  return userInfo.value.nickname || userInfo.value.email?.split('@')[0] || '사용자'
})

// 로그인 상태 확인 함수
const checkLoginStatus = () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      userInfo.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('사용자 정보 파싱 오류:', e)
      localStorage.removeItem('user')
    }
  }
}

const banners = [
  {
    number: '01',
    title: '알고리즘 학습 로드맵',
    desc: '개념부터 실전까지 이어지는 학습 로드맵으로 방향을 잃지 않고 성장하세요.',
    image: home_books
  },
  {
    number: '02',
    title: 'AI 코드 피드백',
    desc: 'AI가 당신의 코드를 코칭해드립니다.',
    image: robot
  },
  {
    number: '03',
    title: '기업별 정보 공유',
    desc: '기업별 후기와 인증 정보를 모아 코딩테스트 준비를 도와드립니다.',
    image: home_career
  },
  {
    number: '04',
    title: '스터디',
    desc: '스터디 그룹을 만들어 함께 배우며 성장하세요.',
    image: home_study
  },
  {
    number: '05',
    title: '포인트 & 등급제',
    desc: '활동으로 포인트를 얻고 성장의 단계를 경험하세요.',
    image: home_rank
  }
]

const forImages = [for1, for2, for3, for4]

const currentSlide = ref(0)
let interval

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + banners.length) % banners.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  checkLoginStatus()
  interval = setInterval(() => {
    nextSlide()
  }, 3000) // 3초마다 자동 슬라이드
})

onBeforeUnmount(() => clearInterval(interval))
</script>

<style scoped>
.home-container {
  text-align: center;
  background-color: #f5fbff;
  color: #222;
  padding-bottom: 100px;
}

.hero-section {
  padding: 60px 20px;
  
}

.hero-section h3 {
  font-size: 16px;
  font-weight: 400;
  color: #666;
  margin-bottom: 12px;
}

.hero-section h3 strong {
  font-weight: 700;
  color: #222;
}

.hero-section h1 {
  font-size: 40px;
  font-weight: 700;
  color: #000;
  margin: 0 0 24px 0;
}

.start-btn {
  background-color: #00a8ff;
  color: white;
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 60px 0;
  transition: background-color 0.2s;
}

.start-btn:hover {
  background-color: #0091e0;
}

/* 환영 메시지 스타일 */
.welcome-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 60px 0;
  padding: 16px 28px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 168, 255, 0.15);
}

.welcome-icon {
  width: 32px;
  height: 32px;
}

.welcome-message p {
  font-size: 18px;
  color: #383838;
  margin: 0;
  font-weight: 500;
}

.welcome-message strong {
  color: #00a8ff;
  font-weight: 700;
}

/* Carousel Container */
.carousel-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

}

.carousel-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  background-color: white;
  padding: 50px 60px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.carousel-item img {
  width: 260px;
  height: auto;
  object-fit: contain;
}

.text-area {
  text-align: left;
  flex: 1;
}

.text-area h2 {
  font-size: 80px;
  font-weight: 700;
  color: #f0f0f0;
  margin: 0 0 12px 0;
  line-height: 1;
}

.text-area h3 {
  font-size: 26px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;
}

.text-area p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Carousel Arrows */
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-arrow:hover {
  background-color: white;
  color: #00a8ff;
  border-color: #00a8ff;
}

.carousel-arrow.left {
  left: -20px;
}

.carousel-arrow.right {
  right: -20px;
}

/* Carousel Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 80%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
  justify-content: center;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background-color: #00a8ff;
  width: 24px;
  border-radius: 4px;
}

.indicator:hover {
  background-color: #00a8ff;
}

/* Audience Section */
.audience-section {
  background-color: #f5fbff;
  padding: 80px 20px;
}

.audience-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin-bottom: 60px;
}

.audience-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.kola-icon1 {
  width: 24px;
  height: 24px;
  margin: 0 2px;
  vertical-align: middle;
  display: inline-block;
}
.kola-icon {
  width: 40px;
  height: 40px;
  margin: 0 2px;
  vertical-align: middle;
  display: inline-block;
}

.audience-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.audience-images img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-item {
    flex-direction: column;
    padding: 30px;
    gap: 30px;
  }

  .text-area {
    text-align: center;
  }

  .carousel-arrow.left {
    left: 10px;
  }

  .carousel-arrow.right {
    right: 10px;
  }

  .audience-images {
    grid-template-columns: 1fr;
  }
}
</style>
