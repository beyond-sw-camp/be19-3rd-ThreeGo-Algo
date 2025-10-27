<template>
  <div class="recruit-management-page">
    <div class="page-container">
      <!-- 상단: 뒤로가기 + 제목 -->
      <div class="page-header">
        <BackButton text="본문으로 돌아가기" :to="`/study-recruit/${postId}`" />
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
                <th>상태</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="applicant in applicants" :key="applicant.joinId">
                <td class="applicant-name">{{ applicant.nickname }}</td>
                <td class="motivation">{{ applicant.applicant }}</td>
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
                    v-if="applicant.status === 'PENDING'"
                    class="btn-accept"
                    @click="acceptApplicant(applicant.joinId)"
                  >
                    수락
                  </button>
                  <button 
                    v-if="applicant.status === 'PENDING'"
                    class="btn-reject"
                    @click="rejectApplicant(applicant.joinId)"
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from '@/components/common/BackButton.vue';
import TabTitle from '@/components/common/TabTitle.vue';
import TwoButtonPopup from '@/components/common/TwoButtonPopup.vue';
import coreApi from '@/api/coreApi';

const route = useRoute();
const router = useRouter();
const postId = route.params.postId;

// 스터디 정보
const study = ref({
  title: '',
  memberLimit: 0
});

const isClosed = ref(false);
const showClosePopup = ref(false);
const applicants = ref([]);

// 📊 통계
const totalApplicants = computed(() => applicants.value.length);
const approvedCount = computed(() =>
  applicants.value.filter(a => a.status === 'APPROVED').length
);

// ✅ 게시글 정보 조회
const fetchPostInfo = async () => {
  try {
    const response = await coreApi.get(`/study-recruit/posts/${postId}`);
    const data = response.data;

    study.value = {
      title: data.title,
      memberLimit: data.capacity
    };

    // 모집 상태 확인 (OPEN, CLOSED, CANCELLED)
    isClosed.value = data.status === 'CLOSED' || data.status === 'CANCELLED';

    console.log('✅ 게시글 정보:', data);
    console.log('✅ 모집 마감 여부:', isClosed.value);
  } catch (error) {
    console.error('❌ 게시글 정보 조회 실패:', error);
  }
};

// ✅ 신청자 목록 조회 API
const fetchApplicants = async () => {
  try {
    const response = await coreApi.get(`/study-recruit/posts/${postId}/members`);
    applicants.value = response.data.map(applicant => ({
      joinId: applicant.id,                 // 신청 ID (수락/거절에 사용)
      memberId: applicant.memberId,         // 회원 ID
      nickname: applicant.memberNickname,   // 신청자 닉네임
      applicant: applicant.applicant,       // 지원동기
      status: applicant.status,             // PENDING / APPROVED / REJECTED
      appliedAt: applicant.appliedAt        // 신청일
    }));

    console.log('✅ 신청자 목록:', applicants.value);
  } catch (error) {
    console.error('❌ 신청자 목록 조회 실패:', error);
  }
};

// ✅ 신청자 수락 API
const acceptApplicant = async (joinId) => {
  try {
    await coreApi.post(`/study-recruit/applicants/${joinId}/accept`);
    alert('신청이 수락되었습니다.');
    await fetchApplicants();
  } catch (error) {
    console.error('❌ 신청자 수락 실패:', error);
    alert('신청 수락 중 오류가 발생했습니다.');
  }
};

// ✅ 신청자 거절 API
const rejectApplicant = async (joinId) => {
  try {
    await coreApi.post(`/study-recruit/applicants/${joinId}/reject`);
    alert('신청이 거절되었습니다.');
    await fetchApplicants();
  } catch (error) {
    console.error('❌ 신청자 거절 실패:', error);
    alert('신청 거절 중 오류가 발생했습니다.');
  }
};

const getStatusClass = (status) => ({
  'status-pending': status === 'PENDING',
  'status-approved': status === 'APPROVED',
  'status-rejected': status === 'REJECTED'
});

const getStatusText = (status) => {
  const statusMap = {
    PENDING: '대기 중',
    APPROVED: '수락됨',
    REJECTED: '거절됨'
  };
  return statusMap[status] || status;
};

// ✅ 모집 마감 API
const closeRecruitment = async () => {
  try {
    await coreApi.post(`/study-recruit/posts/${postId}/close`);
    alert("스터디 모집이 마감되었습니다.");
    isClosed.value = true;
    showClosePopup.value = false;
  } catch (error) {
    console.error("❌ 모집 마감 실패:", error);
    alert("모집 마감 중 오류가 발생했습니다.");
  }
};

const createStudyGroup = () => {
  const approvedMembers = applicants.value.filter(a => a.status === 'APPROVED');
  const studyGroupData = {
    postId: postId,
    recruitPost: study.value,
    approvedMembers: approvedMembers,
    isClosed: true
  };
  sessionStorage.setItem('createStudyGroupData', JSON.stringify(studyGroupData));
  router.push('/study-recruit/create-study');
};

// 🔹 페이지 로드 시 게시글 정보 및 신청자 목록 조회
onMounted(async () => {
  await fetchPostInfo();
  await fetchApplicants();
});
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