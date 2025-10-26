<template>
  <div class="recruit-management-page">
    <div class="page-container">
      <!-- 상단: 뒤로가기 + 제목 -->
      <div class="page-header">
        <BackButton text="본문으로 돌아가기" :to="`/study-recruit/${studyId}`" />
        <TabTitle :title="study.title" />
      </div>

      <!-- 모집 현황 & 신청 현황 -->
      <div class="status-grid">
        <!-- 모집 현황 -->
        <div class="status-card recruit-status">
        <h3 class="card-title">모집 현황</h3>
        <div class="status-content">
          <p class="status-text" :class="{ open: !isClosed, closed: isClosed }">
            <template v-if="isClosed">
              <span class="highlight">모집이 마감</span>되었습니다.
            </template>
            <template v-else>
                <span class="highlight">모집 중</span>입니다.
            </template>
          </p>
          <p class="status-description" v-if="!isClosed">
            현재 새로운 신청을 받고 있어요!<br />
            모집이 완료되면 스터디 그룹을 생성할 수 있습니다.
          </p>
          <p class="status-description" v-else>
            더 이상 새로운 신청을 받을 수 없습니다.<br />
            승인된 인원으로 스터디 그룹을 생성해주세요.
          </p>
          <button 
            class="close-recruit-btn" 
            @click="isClosed ? createStudyGroup() : showClosePopup = true"
          >
            {{ isClosed ? '스터디 그룹 생성하기' : '모집 마감하기' }}
          </button>
        </div>
      </div>

      <!-- 모집 마감 확인 팝업 -->
    <TwoButtonPopup
      v-model="showClosePopup"
      title="모집 마감"
      subtitle="스터디 모집을 마감 하시겠습니까?"
      confirm-text="확인"
      cancel-text="취소"
      @confirm="closeRecruitment"
    />

        <!-- 신청 현황 -->
        <div class="status-card application-status">
          <h3 class="card-title">신청 현황</h3>
          <div class="application-stats">
            <div class="stat-item">
              <div class="stat-icon">👥</div>
              <div class="stat-label">모집인원</div>
              <div class="stat-value">{{ study.memberLimit }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">📄</div>
              <div class="stat-label">총 신청자 수</div>
              <div class="stat-value">{{ totalApplicants }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">✅</div>
              <div class="stat-label">수락 인원</div>
              <div class="stat-value">{{ approvedCount }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 스터디 참가 신청자 관리 -->
      <div class="applicant-management">
        <h3 class="section-title">스터디 참가 신청자 관리</h3>
        <div class="applicant-table">
          <table>
            <thead>
              <tr>
                <th>신청자</th>
                <th>지원동기</th>
                <th>신청일</th>
                <th>상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="applicant in applicants" :key="applicant.id">
                <td class="applicant-name">{{ applicant.name }}</td>
                <td class="motivation">{{ applicant.motivation }}</td>
                <td class="apply-date">{{ applicant.date }}</td>
                <td>
                  <span 
                    class="status-badge" 
                    :class="getStatusClass(applicant.status)"
                  >
                    {{ getStatusText(applicant.status) }}
                  </span>
                </td>
                <td class="action-buttons">
                  <button 
                    v-if="applicant.status === 'pending'"
                    class="btn-accept"
                    @click="acceptApplicant(applicant.id)"
                  >
                    수락
                  </button>
                  <button 
                    v-if="applicant.status === 'pending'"
                    class="btn-reject"
                    @click="rejectApplicant(applicant.id)"
                  >
                    거절
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from '@/components/common/BackButton.vue';
import TabTitle from '@/components/common/TabTitle.vue';
import TwoButtonPopup from '@/components/common/TwoButtonPopup.vue';

const route = useRoute();
const router = useRouter();
const studyId = route.params.id;

// 스터디 정보
const study = ref({
  title: '카카오 면접 대비 스터디',
  memberLimit: 20
});

// 모집 마감 상태 추가
const isClosed = ref(false);
const showClosePopup = ref(false);

// 신청자 목록
const applicants = ref([
  {
    id: 1,
    name: '준식이',
    motivation: '카카오 같이 뿌셔봅시다!',
    date: '2025.10.19',
    status: 'pending'
  },
  {
    id: 2,
    name: '목지',
    motivation: '면접은 처음이지만 열심히 해보겠습니다 :)',
    date: '2025.10.19',
    status: 'pending'
  },
  {
    id: 3,
    name: '제이지',
    motivation: '첫 스터디라 긴장되지만 열심히 하겠습니다!',
    date: '2025.10.18',
    status: 'approved'
  },
  {
    id: 4,
    name: '프로도',
    motivation: '함께 준비하면 더 많은 연습이 될 것 같네요 🔥 신청해봅니다!!',
    date: '2025.10.18',
    status: 'approved'
  },
  {
    id: 5,
    name: '라이언',
    motivation: '.',
    date: '2025.10.17',
    status: 'rejected'
  },
  {
    id: 6,
    name: '라이라이언',
    motivation: '잘부탁드립니다',
    date: '2025.10.17',
    status: 'approved'
  }
]);

// 통계 계산
const totalApplicants = computed(() => applicants.value.length);
const approvedCount = computed(() => 
  applicants.value.filter(a => a.status === 'approved').length
);

const getStatusClass = (status) => {
  return {
    'status-pending': status === 'pending',
    'status-approved': status === 'approved',
    'status-rejected': status === 'rejected'
  };
};

const getStatusText = (status) => {
  const statusMap = {
    pending: '대기 중',
    approved: '수락됨',
    rejected: '거절됨'
  };
  return statusMap[status] || status;
};

const acceptApplicant = (id) => {
  const applicant = applicants.value.find(a => a.id === id);
  if (applicant) {
    applicant.status = 'approved';
  }
};

const rejectApplicant = (id) => {
  const applicant = applicants.value.find(a => a.id === id);
  if (applicant) {
    applicant.status = 'rejected';
  }
};

const closeRecruitment = () => {
  isClosed.value = true;
  showClosePopup.value = false;
  // 필요시 API 호출
};

const createStudyGroup = () => {
  const approvedMembers = applicants.value.filter(a => a.status === 'approved');

  console.log('스터디 그룹 생성 버튼 클릭');
  console.log('승인된 멤버들:', approvedMembers);

  // sessionStorage에 데이터 저장
  const studyGroupData = {
    studyId: studyId,
    recruitPost: study.value,
    approvedMembers: approvedMembers,
    isClosed: true
  };

  sessionStorage.setItem('createStudyGroupData', JSON.stringify(studyGroupData));

  router.push('/study-recruit/create-study');
};


</script>

<style scoped>
.recruit-management-page {
  min-height: 100vh;
  background-color: #fff;
  padding: 40px 20px;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 페이지 헤더 */
.page-header {
  margin-bottom: 32px;
}
.page-header :deep(*) {
  text-align: left;
  margin-left: 0;
}

/* 상단 그리드 */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.status-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 28px;
}

.card-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  font-family: 'Noto Sans KR', sans-serif;
}

/* 모집 현황 카드 */
.recruit-status .status-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.status-text {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.status-text.open {
  color: #1a1a1a;
}

.status-text.closed .highlight {
  color: #e74c3c;
  font-weight: 700;
}

.status-text .highlight {
  color: #2ecc71;
  font-weight: 700;
}

.status-description {
  font-size: 14px;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

.close-recruit-btn {
  width: 100%;
  padding: 14px;
  background: #0aa2eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 12px;
}

.close-recruit-btn:hover {
  background: #0891d1;
}

/* 신청 현황 카드 */
.application-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f7f9;
  border-radius: 10px;
  padding: 24px 12px;
  text-align: center;
}

.stat-icon {
  font-size: 22px;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.4;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

/* 신청자 관리 섹션 */
.applicant-management {
  margin-top: 40px;
}

.section-title {
  font-size: 19px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  font-family: 'Noto Sans KR', sans-serif;
}

.applicant-table {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
}

th {
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 1px solid #e9ecef;
}

td {
  padding: 18px 20px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f1f3f5;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f8f9fa;
}

.applicant-name {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 15px;
}

.motivation {
  max-width: 400px;
  color: #333;
}

.apply-date {
  color: #666;
  font-size: 14px;
}

/* 상태 뱃지 */
.status-badge {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
}

.status-pending {
  background: #d0cdc3;
  color: #ffffff;
}

.status-approved {
  background: #82D09A;
  color: #ffffff;
}

.status-rejected {
  background: #DC6A6A;
  color: #ffffff;
}

/* 액션 버튼 */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-accept,
.btn-reject {
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-accept {
  background: #0aa2eb;
  color: white;
}

.btn-accept:hover {
  background: #0891d1;
}

.btn-reject {
  background: white;
  color: #0aa2eb;
  border: 1px solid #0aa2eb;
}

.btn-reject:hover {
  background: #f0f9ff;
}

/* 반응형 */
@media (max-width: 968px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .application-stats {
    grid-template-columns: 1fr;
  }

  .applicant-table {
    overflow-x: auto;
  }

  table {
    min-width: 700px;
  }
}

@media (max-width: 768px) {
  .page-container {
    padding: 0 16px;
  }

  .status-card {
    padding: 20px;
  }

  th, td {
    padding: 12px 16px;
  }
}
</style>