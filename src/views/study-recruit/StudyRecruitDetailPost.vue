<template>
  <div class="study-recruit-detail-page">
    <div class="study-recruit-detail">
      <!-- 1. BackButton -->
      <div class="study-recruit-main">
        <p>스터디 모집 게시판</p>
      </div>
      <div class="back-button-wrapper">
        <BackButton text="목록으로 돌아가기" to="/study-recruit" />
      </div>

      <!-- 본문 및 우측 박스 -->
      <div class="content-wrapper">
        <div class="post-section">
          <!-- 제목 + 뱃지 -->
          <div class="title-row">
            <h2 class="post-title">{{ post.title }}</h2>
            <RecruitBadge :status="post.status" />
          </div>

          <!-- 작성자 정보 -->
          <div class="author-info">
            <MiniProfile :nickname="post.writer" :rankName="post.rankName" />
            <span class="post-date">{{ post.createdAt }}</span>
            <button class="action-link">수정</button>
            <button class="action-link">삭제</button>
          </div>

          <!-- 모집 목적 섹션 -->
          <div class="section">
            <h3 class="section-title">모집 목적</h3>
            <div class="section-content">
              <p>{{ post.content }}</p>
            </div>
          </div>

          <!-- 일정 및 진행 방식 섹션 -->
          <div class="section">
            <h3 class="section-title">일정 & 진행 방식</h3>
            <div class="info-box">
              <div class="info-item">
                <img src="@/assets/icons/myicon.svg" alt="icon" class="info-icon" />
                <span class="label">모집 인원</span>
                <span class="value">{{ post.memberLimit }}명</span>
              </div>

              <div class="info-item">
                <img src="@/assets/icons/calendar.svg" alt="calendar" class="info-icon" />
                <span class="label">스터디 구분</span>
                <span class="value">{{ post.studyPeriod }}</span>
              </div>

              <div class="info-item">
                <img src="@/assets/icons/calendar.svg" alt="calendar" class="info-icon" />
                <span class="label">스터디 시작일</span>
                <span class="value">{{ post.startDate }}</span>
              </div>

              <div class="info-item">
                <img src="@/assets/icons/calendar.svg" alt="calendar" class="info-icon" />
                <span class="label">스터디 종료일</span>
                <span class="value">{{ post.endDate }}</span>
              </div>
            </div>
          </div>

          <!-- 준비 내용 섹션 -->
          <div class="section">
            <h3 class="section-title">준비 내용</h3>
            <div class="section-content">
              <ul>
                <li>CS 핵심 주제: 운영체제, 네트워크, 데이터베이스, 알고리즘</li>
                <li>프로젝트 질문·분석 프로젝트 중심으로 예상 질문 리스트 작성</li>
                <li>기타: 카카오 인재상 기반 질의/설명 질문 대비</li>
              </ul>
            </div>
          </div>

          <!-- 댓글 섹션 -->
          <Comment
            :comments="comments"
            :currentUser="currentUser"
            @submit-comment="addComment"
          />
        </div>

        <!-- 우측 박스 영역 (신청자 / 작성자 분기) -->
        <div class="side-box">
          <RecruitManagement v-if="isWriter" />

          <template v-else>
            <ApplyStudyBox v-if="!isApplied" @apply="handleApply" />
            <AfterApplyStudyBox
              v-else
              :status="applyStatus"
              @cancel="handleCancel"
            />
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import BackButton from "@/components/common/BackButton.vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import RecruitBadge from "@/components/study-recruit/component/RecruitBadge.vue";
import ApplyStudyBox from "@/components/study-recruit/component/ApplyStudyBox.vue";
import AfterApplyStudyBox from "@/components/study-recruit/component/AfterApplyStudyBox.vue";
import RecruitManagement from "@/components/study-recruit/component/RecruitManagement.vue";

// 스터디 모집글 더미 데이터
const post = ref({
  title: "카카오 면접 대비 스터디",
  status: "OPEN",
  writer: "라이언",
  rankName: "코뉴비",
  createdAt: "2025.09.13 14:06",
  content:
    "2025 상반기 카카오 개발직군 1차/2차 면접 대비 스터디를 참여할 분들을 모집합니다.\n코딩테스트를 통과한 이후 면접 실전 감각을 유지하고,\nCS 기업기 + 프로젝트 기반 질문 대비를 중심으로 준비할 예정입니다.",
  memberLimit: 20,
  studyPeriod: "면접",
  startDate: "2025.10.01",
  endDate: "2025.10.31",
});

// 상태 관리
const isWriter = ref(true); // 작성자 시점 여부
const isApplied = ref(false);
const applyStatus = ref("pending"); // pending | approved | rejected

// 현재 사용자 정보
const currentUser = ref({
  nickname: "나",
  rankName: "코뉴비"
});

const comments = ref([
  {
    id: 1,
    nickname: "라이언",
    rankName: "코뉴비",
    content: "도움이 많이 될 것 같네요! 신청해봅니다!!",
    createdAt: "2025.11.14 18:12"
  },
  {
    id: 2,
    nickname: "제이지",
    rankName: "코좀알",
    content: "저도 카카오 면접 준비 중인데 함께하고 싶습니다!",
    createdAt: "2025.11.15 10:30"
  },
]);

// 함수들
const handleApply = () => {
  isApplied.value = true;
  applyStatus.value = "pending";
};

const handleCancel = () => {
  isApplied.value = false;
  applyStatus.value = "";
};

const addComment = (text) => {
  const newComment = {
    id: comments.value.length + 1,
    author: "나",
    content: text,
    date: new Date().toISOString().slice(0, 16).replace("T", " "),
  };
  comments.value.push(newComment);
};
</script>

<style scoped>
.study-recruit-main {
    font-size: 25px;
    font-weight: bold;
    gap: 0px;
}
.study-recruit-detail-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.study-recruit-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.back-button-wrapper {
  margin-bottom: 12px;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

.post-section {
  flex: 1;
  max-width: 720px;
}

/* 제목 + 뱃지 */
.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.post-title {
  font-size: 26;
  font-weight: 700;
  font-family: 'Noto Sans KR', sans-serif;
  color: #1a1a1a;
  margin: 0;
}

/* 작성자 정보 */
.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 24px;
}

.post-date {
  font-size: 14px;
  color: #666;
}

.action-link {
  font-size: 13px;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
}

.action-link:hover {
  color: #0aa2eb;
  text-decoration: underline;
}

/* 섹션 */
.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  font-family: 'Noto Sans KR', sans-serif;
}

.section-content {
  line-height: 1.8;
  color: #333;
  font-size: 15px;
}

.section-content p {
  margin: 0;
  white-space: pre-wrap;
}

.section-content ul {
  margin: 0;
  padding-left: 20px;
}

.section-content li {
  margin-bottom: 8px;
  line-height: 1.8;
}

/* Info Box */
.info-box {
  background-color: #f5f7f9;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.label {
  color: #666;
  font-weight: 500;
  font-size: 14px;
  flex-shrink: 0;
}

.value {
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 500;
}

/* 우측 박스 */
.side-box {
  width: 340px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

/* 반응형 디자인 */
@media (max-width: 968px) {
  .content-wrapper {
    flex-direction: column;
    gap: 24px;
  }

  .post-section {
    max-width: 100%;
  }

  .side-box {
    width: 100%;
    position: static;
  }

  .info-box {
    grid-template-columns: 1fr;
  }
}
</style>
