<template>
  <div class="create-study-group-page">
    <div class="page-container">
      <h1 class="page-title">스터디 생성</h1>

      <div class="form-section">
        <!-- 스터디명 -->
        <div class="form-group">
          <label class="form-label">
            스터디명 <span class="required">*</span>
          </label>
          <input
            v-model="formData.title"
            type="text"
            class="form-input"
            placeholder="스터디명을 입력하세요."
          />
        </div>

        <!-- 스터디 소개 -->
        <div class="form-group">
          <label class="form-label">
            스터디 소개 <span class="required">*</span>
          </label>
          <textarea
            v-model="formData.description"
            class="form-textarea"
            placeholder="스터디 소개를 입력하세요."
            rows="6"
          ></textarea>
        </div>

        <!-- 스터디 기간 -->
        <div class="form-group">
          <label class="form-label">
            스터디 기간 <span class="required">*</span>
          </label>
          <DateRangeButton
            v-model:start-date="formData.startDate"
            v-model:end-date="formData.endDate"
          />
        </div>

        <!-- 스터디장 -->
        <div class="form-group">
          <label class="form-label">스터디장</label>
          <div class="leader-info">
            <MiniProfile
              :nickname="leaderInfo.nickname"
              :rankName="leaderInfo.rankName"
            />
          </div>
        </div>

        <!-- 스터디원 리스트 -->
        <div class="form-group">
          <div class="members-header">
            <label class="form-label">스터디원 리스트</label>
            <span class="member-count">총 {{ members.length }}명</span>
          </div>
          
          <div class="members-table-wrapper">
            <table class="members-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>멤버</th>
                  <th>지원동기</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in members" :key="member.id">
                  <td class="member-no">{{ index + 1 }}</td>
                  <td class="member-profile">
                    <MiniProfile
                      :nickname="member.nickname"
                      :rankName="member.rankName"
                    />
                  </td>
                  <td class="member-motivation">{{ member.motivation }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <div class="form-actions">
          <button class="btn-cancel" @click="handleCancel">취소</button>
          <button class="btn-submit" @click="handleSubmit">생성하기</button>
        </div>
      </div>
    </div>

    <!-- 생성 완료 팝업 - 변경 -->
    <StudyCreationSuccessPopup
      v-model="showSuccessPopup"
      :group-id="createdGroupId"
      @confirm="handleSuccessConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MiniProfile from '@/components/common/MiniProfile.vue';
import DateRangeButton from '@/components/common/DateRangeButton.vue';
import StudyCreationSuccessPopup from '@/components/study-recruit/component/StudyCreationSuccessPopup.vue';


const route = useRoute();
const router = useRouter();

// 폼 데이터
const formData = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: ''
});

// 스터디장 정보
const leaderInfo = ref({
  nickname: '라이언',
  rankName: '코뉴비'
});

// 승인된 스터디원 목록 (이전 페이지에서 전달받거나 API로 가져오기)
const members = ref([]);

// 팝업 및 생성된 그룹 ID
const showSuccessPopup = ref(false);
const createdGroupId = ref(null);

// 초기 데이터 로드
onMounted(() => {
  // 이전 페이지에서 전달받은 데이터 로드
  loadApprovedMembers();
});

const loadApprovedMembers = () => {
  // sessionStorage에서 전달받은 데이터 확인
  const savedData = sessionStorage.getItem('createStudyGroupData');

  console.log('CreateStudyGroup - savedData:', savedData);

  if (savedData) {
    try {
      const studyGroupData = JSON.parse(savedData);
      console.log('CreateStudyGroup - parsed data:', studyGroupData);

      if (studyGroupData.approvedMembers && studyGroupData.approvedMembers.length > 0) {
        // 실제 전달받은 데이터 사용 - 필드명 매핑
        console.log('전달받은 승인된 멤버 사용');
        members.value = studyGroupData.approvedMembers.map(member => ({
          id: member.id,
          nickname: member.name, // name -> nickname으로 매핑
          rankName: member.rankName || '코뉴비', // rankName이 없으면 기본값
          motivation: member.motivation
        }));

        // 스터디 정보도 함께 받았다면 폼에 미리 채우기
        if (studyGroupData.recruitPost) {
          formData.value.title = studyGroupData.recruitPost.title || '';
        }

        // 사용 후 삭제
        sessionStorage.removeItem('createStudyGroupData');
        return;
      }
    } catch (e) {
      console.error('데이터 파싱 에러:', e);
    }
  }

  console.log('더미 데이터 사용');
  // 전달받은 데이터가 없을 때 예시 데이터
  const approvedMembers = [
    {
      id: 3,
      nickname: '제이지',
      rankName: '코좀알',
      motivation: '알고리즘 기초부터 차근차근 배우고 싶어요! 열심히 하겠습니다 :)'
    },
    {
      id: 4,
      nickname: '프로도',
      rankName: '코뉴비',
      motivation: '알고리즘 기초부터 차근차근 배우고 싶어요! 열심히 하겠습니다 :)'
    },
    {
      id: 6,
      nickname: '라이라이언',
      rankName: '코뉴비',
      motivation: '알고리즘 기초부터 차근차근 배우고 싶어요! 열심히 하겠습니다 :)'
    }
  ];

  members.value = approvedMembers;
};

const handleCancel = () => {
  if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
    router.back();
  }
};

const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    alert('스터디명을 입력해주세요.');
    return;
  }
  if (!formData.value.description.trim()) {
    alert('스터디 소개를 입력해주세요.');
    return;
  }
  if (!formData.value.startDate || !formData.value.endDate) {
    alert('스터디 기간을 선택해주세요.');
    return;
  }

  const studyGroupData = {
    ...formData.value,
    leaderId: leaderInfo.value.nickname,
    memberIds: members.value.map(m => m.id),
    memberCount: members.value.length
  };

  console.log('스터디 그룹 생성:', studyGroupData);
  
  // API 호출 후
  createdGroupId.value = 123; // 실제로는 API 응답에서
  showSuccessPopup.value = true;
};

// 팝업 확인 핸들러 (선택사항)
const handleSuccessConfirm = () => {
  console.log('스터디 그룹으로 이동');
};
</script>

<style scoped>
.create-study-group-page {
  min-height: 100vh;
  background-color: #fff;
  padding: 40px 20px;
}

.page-container {
  max-width: 1024px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid #1a1a1a;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-label {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.required {
  color: #e74c3c;
  margin-left: 2px;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #0aa2eb;
}

.form-input::placeholder {
  color: #999;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  outline: none;
  border-color: #0aa2eb;
}

.form-textarea::placeholder {
  color: #999;
}

/* 스터디장 */
.leader-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.leader-icon {
  width: 24px;
  height: 24px;
}

/* 스터디원 리스트 */
.members-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-count {
  font-size: 14px;
  color: #666;
}

.members-table-wrapper {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.members-table {
  width: 100%;
  border-collapse: collapse;
}

.members-table thead {
  background: #f8f9fa;
}

.members-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  border-bottom: 1px solid #e9ecef;
}

.members-table th:first-child {
  width: 80px;
}

.members-table th:nth-child(2) {
  width: 180px;
}

.members-table td {
  padding: 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f1f3f5;
}

.members-table tbody tr:last-child td {
  border-bottom: none;
}

.members-table tbody tr:hover {
  background: #f8f9fa;
}

.member-no {
  text-align: center;
  font-weight: 500;
  color: #666;
}

.member-profile {
  font-weight: 500;
}

.member-motivation {
  color: #333;
  line-height: 1.5;
}

/* 버튼 영역 */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 32px;
  border-top: 1px solid #e9ecef;
}

.btn-cancel,
.btn-submit {
  padding: 14px 40px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f1f3f5;
  color: #666;
}

.btn-cancel:hover {
  background: #e9ecef;
}

.btn-submit {
  background: #0aa2eb;
  color: white;
}

.btn-submit:hover {
  background: #0891d1;
}

/* 반응형 */
@media (max-width: 768px) {
  .page-container {
    padding: 0 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .members-table-wrapper {
    overflow-x: auto;
  }

  .members-table {
    min-width: 600px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
  }
}
</style>