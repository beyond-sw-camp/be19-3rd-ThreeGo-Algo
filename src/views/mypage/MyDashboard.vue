<template>
  <div class="dashboard-container">
    <!-- 왼쪽 프로필 -->
    <aside class="profile-section">
      <div class="profile-image">
        <img src="@/assets/images/코신.png" alt="profile" />
      </div>
      <h2 class="nickname">{{ userInfo.nickname }}</h2>
      <p class="email">{{ userInfo.email }}</p>

      <div class="info">
        <div>
          <p class="label">등급</p>
          <p class="value">{{ userInfo.rank }}</p>
        </div>
        <div>
          <p class="label">포인트</p>
          <p class="value">{{ userInfo.point }} P</p>
        </div>
      </div>
    </aside>

    <!-- 오른쪽 콘텐츠 -->
    <main class="content-section">
      <!-- 상단 -->
      <div class="top-section">
        <!-- 학습 진도율 -->
      <div style="flex:1;">
        <h3 class="card-title">알고리즘 학습 진도율</h3>
        <div class="progress-card">
          <div class="progress-wrapper">
            <div class="circle">
              <svg viewBox="0 0 36 36" class="progress-ring">
                <path class="ring-bg"
                  d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="ring-progress"
                  :stroke-dasharray="`${progress}, 100`"
                  d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="percent">{{ Math.round(progress) }}%</div>
            </div>

            <div class="progress-text">
              <p>학습 진행률 <b>{{ Math.round(progress) }}%</b></p>
              <p class="sub">총 {{ totalRoadmaps }}개의 문제</p>
              <button class="learn-btn" @click="$router.push('/algorithm/roadmap/1')">학습하러 가기</button>
              <div class="continue-text">👋 계속 이어가볼까요?</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 출석 -->
      <div style="flex:1;">
        <h3 class="card-title">출석</h3>
        <div class="attendance-card">
          <div class="attendance-body">
            <img src="@/assets/images/point.png" alt="coin" />
            <p>출석 완료하고<br /><b>1 포인트</b> 받아가세요!</p>
            <button class="attend-btn" @click="handleAttendance" :disabled="isAttended">
              {{ isAttended ? '출석 완료' : '출석하기' }}
            </button>
            <p class="sub-text">출석은 하루에 한 번만 가능합니다.</p>
          </div>
        </div>
      </div>
    </div>


      <!-- 하단 -->
      <div class="study-section">
        <div class="header">
          <h3>진행 중인 스터디</h3>
          <a href="/mypage/study" class="more">+ 더 보기</a>
        </div>

        <!-- 큰 그룹 카드 -->
        <div v-if="ongoingStudies.length > 0" class="study-group-card">
          <!-- 내부의 2개 미니 스터디 카드 -->
          <div v-for="study in ongoingStudies" :key="study.studyId" class="study-mini-card" @click="goToStudy(study.studyId)">
            <div class="study-top">
              <h4>{{ study.studyName }}</h4>
              <p class="date">{{ study.startDate }} ~ {{ study.endDate }}</p>
            </div>

            <div class="study-bottom">
              <MiniProfile :nickname="study.leaderName" :rankName="study.leaderRank || study.leaderRankName || '코뉴비'" />
              <div class="study-members">
                <img src="@/assets/icons/user.svg" alt="members" />
                <span>{{ study.memberCount }}명</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 스터디가 없을 때 -->
        <div v-else class="no-study">
          <p>진행 중인 스터디가 없습니다.</p>
          <button class="join-study-btn" @click="$router.push('/study-recruit')">스터디 찾아보기</button>
        </div>
      </div>

    </main>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MiniProfile from '@/components/common/MiniProfile.vue'
import memberApi from '@/api/memberApi'
import coreApi from '@/api/coreApi'

// 사용자 정보
const userInfo = ref({
  nickname: '',
  email: '',
  rank: '',
  point: 0,
  memberId: null
})

// 학습 진도율
const progress = ref(0)
const targetProgress = ref(0)
const totalRoadmaps = ref(0)

// 진행 중인 스터디
const ongoingStudies = ref([])

// 출석 상태
const isAttended = ref(false)

// 프로필 정보 불러오기
const fetchUserProfile = async () => {
  try {
    // localStorage에서 기본 정보 가져오기
    userInfo.value.nickname = localStorage.getItem('nickname') || '알코알라'
    userInfo.value.rank = localStorage.getItem('rank') || '코뉴비'
    userInfo.value.memberId = localStorage.getItem('memberId')

    // 이메일은 토큰에서 추출하거나 별도 API 호출
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        userInfo.value.email = payload.email || payload.sub || 'email@example.com'
      } catch (e) {
        console.error('토큰 파싱 실패:', e)
        userInfo.value.email = 'email@example.com'
      }
    }

    // 포인트 정보 가져오기 (API 있다면)
    try {
      const pointRes = await memberApi.get('/member/point')
      userInfo.value.point = pointRes.data.point || 0
    } catch (error) {
      console.log('포인트 API 없음, 기본값 사용')
      userInfo.value.point = 0
    }
  } catch (error) {
    console.error('프로필 정보 로드 실패:', error)
  }
}

// 학습 진도율 가져오기
const fetchLearningProgress = async () => {
  try {
    const response = await coreApi.get('/algo/progress')
    const data = response.data

    console.log('✅ 학습 진도율 API 응답:', data)

    // progressRate가 소수점 형태 (0.4074 = 40.74%)
    if (data.progressRate !== undefined) {
      targetProgress.value = Math.round(data.progressRate * 100) // 소수점을 퍼센트로 변환
      totalRoadmaps.value = data.totalQuestions || 27
    } else if (typeof data === 'number') {
      // 숫자만 반환되는 경우
      targetProgress.value = data
      totalRoadmaps.value = 3
    } else if (data.progressPercentage !== undefined) {
      // 객체로 반환되는 경우
      targetProgress.value = data.progressPercentage || 0
      totalRoadmaps.value = data.totalRoadmaps || 3
    } else if (data.progress !== undefined) {
      // progress 필드가 있는 경우
      targetProgress.value = data.progress || 0
      totalRoadmaps.value = data.totalRoadmaps || data.total || 3
    } else {
      console.warn('⚠️ 예상치 못한 응답 구조:', data)
      targetProgress.value = 0
      totalRoadmaps.value = 3
    }
  } catch (error) {
    console.error('❌ 학습 진도율 로드 실패:', error)
    console.error('에러 상세:', error.response?.data)
    // API 실패 시 기본값 사용
    targetProgress.value = 0
    totalRoadmaps.value = 3
  }
}

// 진행 중인 스터디 가져오기
const fetchOngoingStudies = async () => {
  try {
    const response = await coreApi.get('/study-recruit/my-studies', {
      params: {
        page: 0,
        size: 2
      }
    })

    // 응답 데이터 구조 확인
    const data = response.data
    if (data.content && Array.isArray(data.content)) {
      ongoingStudies.value = data.content
    } else if (Array.isArray(data)) {
      ongoingStudies.value = data.slice(0, 2)
    } else {
      ongoingStudies.value = []
    }
  } catch (error) {
    console.error('스터디 목록 로드 실패:', error)
    ongoingStudies.value = []
  }
}

// 진도율 애니메이션
const animateProgress = () => {
  const duration = 1200
  const step = targetProgress.value / (duration / 16)
  const animate = () => {
    if (progress.value < targetProgress.value) {
      progress.value += step
      requestAnimationFrame(animate)
    } else {
      progress.value = targetProgress.value
    }
  }
  animate()
}

// 출석 체크
const checkAttendance = async () => {
  try {
    const response = await memberApi.get('/member/attendance/today')
    isAttended.value = response.data.attended || false
  } catch (error) {
    console.log('출석 상태 확인 실패:', error)
    isAttended.value = false
  }
}

// 출석 처리
const handleAttendance = async () => {
  if (isAttended.value) {
    alert('이미 출석하셨습니다!')
    return
  }

  try {
    await memberApi.post('/member/attendance')
    isAttended.value = true
    userInfo.value.point += 1
    alert('출석이 완료되었습니다! 1 포인트가 지급되었습니다.')
  } catch (error) {
    console.error('출석 처리 실패:', error)
    alert('출석 처리 중 오류가 발생했습니다.')
  }
}

const router = useRouter()

// 스터디 이동
const goToStudy = (studyId) => {
  localStorage.setItem('studyId', studyId)
  router.push('/study/home')
}

onMounted(async () => {
  await fetchUserProfile()
  await fetchLearningProgress()
  await fetchOngoingStudies()
  await checkAttendance()
  animateProgress()
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  gap: 40px;
  padding: 40px;
  background-color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;

  width: 60%;
  margin: 0 auto;
  min-height: 80vh;
  align-items: flex-start;
}

/* ==============================
   🔹 왼쪽 프로필
============================== */
.profile-section {
  flex: 0 0 220px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  text-align: center;
  padding: 20px;
}
.profile-image img {
  width: 80px;
  border-radius: 50%;
}
.nickname {
  font-weight: 700;
  font-size: 18px;
  margin: 10px 0 4px;
}
.email {
  font-size: 13px;
  color: #888;
}
.info {
  display: flex;
  justify-content: space-around;
  border-top: 2px solid #2196f3;
  margin-top: 16px;
  padding-top: 12px;
}
.label {
  color: #777;
  font-size: 14px;
}
.value {
  font-weight: bold;
  margin-top: 4px;
}

/* ==============================
   🔹 오른쪽 콘텐츠
============================== */
.content-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* ==============================
   🔹 상단 카드 묶음 (진도율 + 출석)
============================== */
.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
}

/* 카드 제목 */
.card-title {
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 8px;
  border-left: 4px solid #2196f3;
  padding-left: 8px;
  color: #222;
}

/* 각 카드 공통 */
.progress-card,
.attendance-card {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  height: 300px;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ==============================
   🔹 학습 진도율 카드 내부
============================== */
.progress-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.circle {
  position: relative;
  width: 130px;
  height: 130px;
}
.progress-ring {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}
.ring-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}
.ring-progress {
  fill: none;
  stroke: #2196f3;
  stroke-width: 3.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s ease;
}
.percent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 22px;
}
.progress-text {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.progress-text p {
  margin: 4px 0;
  font-size: 16px;
}
.progress-text .sub {
  font-size: 14px;
  color: #777;
  margin-top: 4px;
}
.learn-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
}
.learn-btn:hover {
  background-color: #1b7ed6;
}
.continue-text {
  margin-top: 6px;
  font-size: 13px;
  color: #2196f3;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ==============================
   🔹 출석 카드
============================== */
.attendance-body {
  text-align: center;
}
.attendance-body img {
  width: 90px;
  margin: 14px 0;
}
.attendance-body p {
  font-size: 15px;
}
.attend-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
}
.attend-btn:hover {
  background-color: #1b7ed6;
}
.attend-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
.sub-text {
  color: #999;
  font-size: 13px;
  margin-top: 10px;
}

/* ==============================
   🔹 진행 중 스터디 섹션
============================== */
.study-section {
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #2196f3;
  padding-left: 10px;
  margin-bottom: 20px;
}
.header h3 {
  font-size: 18px;
  font-weight: 700;
}
.more {
  color: #2196f3;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
}

/* 스터디 카드 리스트 */
.study-list {
  display: flex;
  gap: 24px;
  margin-top: 10px;
}

/* 개별 스터디 카드 */
.study-card {
  flex: 1;
  background: #eaf5ff;
  border-radius: 14px;
  padding: 20px 22px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  transition: all 0.2s ease;
}
.study-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

/* 스터디 상단 */
.study-top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.study-card h4 {
  font-size: 16px;
  font-weight: 700;
  color: #222;
  margin-bottom: 6px;
}
.date {
  font-size: 13px;
  color: #666;
}

/* 스터디 하단 (스터디장/멤버 수) */
.study-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #444;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.study-section {
  background: white;
  border-radius: 16px;
  padding: 25px 30px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #2196f3;
  padding-left: 10px;
  margin-bottom: 20px;
}

.header h3 {
  font-size: 18px;
  font-weight: 700;
}

.more {
  color: #2196f3;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
}

/* 🔹 큰 그룹 카드 */
.study-group-card {
  background: #eaf5ff;
  border-radius: 14px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.05);
}

/* 🔹 내부 미니 카드 */
.study-mini-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.study-mini-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.08);
}

.study-mini-card .study-top h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  color: #222;
}

/* 스터디 없을 때 */
.no-study {
  text-align: center;
  padding: 60px 20px;
  color: #888;
  background: #f8f9fa;
  border-radius: 12px;
}
.no-study p {
  font-size: 16px;
  margin-bottom: 20px;
}
.join-study-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: background-color 0.2s;
}
.join-study-btn:hover {
  background-color: #1b7ed6;
}

/* ==============================
   🔹 반응형
============================== */
@media (max-width: 1200px) {
  .dashboard-container {
    width: 80%;
  }
}
@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column;
    width: 90%;
  }
  .top-section {
    flex-direction: column;
  }
}

</style>
