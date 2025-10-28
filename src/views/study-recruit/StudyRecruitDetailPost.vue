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
            <template v-if="isWriter">
              <button class="action-link" @click="goToEditPage">수정</button>
              <button class="action-link" @click="deletePost">삭제</button>
            </template>
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

          <!-- 모집 목적 섹션 -->
          <div class="section">
            <h3 class="section-title">모집 목적</h3>
            <div class="section-content" v-html="post.content"></div>
          </div>

          <!-- 댓글 섹션 -->
          <Comment
            :comments="comments"
            :currentUser="currentUser"
            @submit-comment="addComment"
            @submit-reply="addReply"
            @edit-comment="editComment"
            @delete-comment="deleteComment"
            @edit-reply="editReply"
            @delete-reply="deleteReply"
          />
        </div>

        <!-- 우측 박스 영역 -->
        <div class="side-box" v-if="post.title">
          <RecruitManagement v-if="isWriter" :postId="route.params.postId"/>
          <template v-else>
            <ApplyStudyBox v-if="!isApplied" :dDay="0" @apply="handleApply" />
            <AfterApplyStudyBox v-else :status="applyStatus" @cancel="handleCancel" />
          </template>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import RecruitBadge from "@/components/study-recruit/RecruitBadge.vue";
import ApplyStudyBox from "@/components/study-recruit/ApplyStudyBox.vue";
import AfterApplyStudyBox from "@/components/study-recruit/AfterApplyStudyBox.vue";
import RecruitManagement from "@/components/study-recruit/RecruitManagement.vue";
import coreApi from "@/api/coreApi";

const router = useRouter();
const route = useRoute();
const postId = route.params.postId;

const post = ref({
  title: "",
  status: "",
  writer: "",
  rankName: "",
  createdAt: "",
  content: "",
  memberLimit: 0,
  studyPeriod: "",
  startDate: "",
  endDate: "",
});

const comments = ref([]);
const isWriter = ref(false);
const isApplied = ref(false);
const applyStatus = ref("pending");
const currentUser = ref([]);
const currentMemberId = ref(null);

// 신청 상태 확인
const fetchApplyStatus = async () => {
  try {
    const response = await coreApi.get(`/study-recruit/posts/${postId}/applicants/me`);

    if (response.data) {
      isApplied.value = true;
      applyStatus.value = response.data.status; // 예: "PENDING", "APPROVED", "REJECTED"
    } else {
      isApplied.value = false;
      applyStatus.value = null;
    }
  } catch (error) {
    // 404 에러는 신청하지 않은 것으로 간주
    if (error.response?.status === 404) {
      isApplied.value = false;
      applyStatus.value = null;
    } else {
      isApplied.value = false;
      applyStatus.value = null;
    }
  }
};

// 게시물 상세조회 (작성자 여부 + 신청상태까지 반영)
const fetchPostDetail = async () => {
  try {
    const response = await coreApi.get(`/study-recruit/posts/${postId}`);
    const data = response.data;

    post.value = {
      title: data.title,
      status: data.status,
      writer: data.memberNickname,
      rankName: data.rankName,
      createdAt: data.createdAt || "",
      content: data.content,
      memberLimit: data.capacity,
      studyPeriod: data.studyCategory || "-",
      startDate: data.startDate,
      endDate: data.endDate,
    };

    // 작성자 여부 판별
    const writerId = Number(data.memberId);
    isWriter.value = currentMemberId.value === writerId;

    // 작성자 아닌 경우 → 신청 상태 확인
    if (!isWriter.value) {
      await fetchApplyStatus();
    }

  } catch (error) {
    console.error("❌ 스터디 모집글 상세조회 실패:", error);
  }
};


// 신청하기
const handleApply = async (applicantText) => {
  try {
    await coreApi.post(`/study-recruit/posts/${postId}/applicants`, {
      applicant: applicantText
    });
    alert("스터디 신청이 완료되었습니다!");
    isApplied.value = true;
    applyStatus.value = "PENDING";
  } catch (error) {
    alert("신청 중 오류가 발생했습니다.");
  }
};


// 신청 취소
const handleCancel = async () => {
  try {
    await coreApi.delete(`/study-recruit/posts/${postId}/applicants`);
    alert("신청이 취소되었습니다.");
    isApplied.value = false;
    applyStatus.value = null;
  } catch (error) {
    alert("신청 취소 중 오류가 발생했습니다.");
  }
};

// 댓글 조회
const fetchComments = async () => {
  try {
    const response = await coreApi.get(`/study-recruit/posts/${postId}/comments`);

    const all = response.data.map(c => {
      const mapped = {
        id: c.id,
        userId: c.memberId, // ✅ Comment 컴포넌트가 기대하는 필드명
        nickname: c.memberNickname,
        memberNickname: c.memberNickname, // ✅ isMyComment fallback용
        rankName: c.rankName || c.rank || c.memberRank || '코뉴비',
        content: c.content,
        createdAt: c.createdAt,
        parentId: c.parentId,
        visibility: c.visibility || 'Y' // ✅ visibility 필드 추가 (기본값 'Y')
      };
      console.log('📝 매핑된 댓글:', mapped);
      return mapped;
    });
    const parents = all.filter(c => !c.parentId);
    comments.value = parents.map(p => ({
      ...p,
      replies: all.filter(c => c.parentId === p.id)
    }));
  } catch (error) {
    console.error("❌ 댓글 조회 실패:", error);
  }
};

// 댓글 작성
const addComment = async (commentData) => {
  try {
    await coreApi.post(`/study-recruit/comments/${postId}`, { content: commentData.content });
    await fetchComments();
  } catch (error) {
    console.error("❌ 댓글 작성 실패:", error);
  }
};

// 답글 작성
const addReply = async (replyData) => {
  try {
    await coreApi.post(`/study-recruit/comments/${postId}`, {
      content: replyData.content,
      parentId: replyData.commentId,
    });
    await fetchComments();
  } catch (error) {
    console.error("❌ 답글 작성 실패:", error);
  }
};

// 댓글 수정
const editComment = async (payload) => {
  const { commentId, content } = payload; 
  try {
    const response = await coreApi.put(`/study-recruit/comments/${commentId}`, {
      content
    });
    await fetchComments(response);
  } catch (error) {
    console.error('❌ 댓글 수정 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);
    alert('댓글 수정 중 오류가 발생했습니다.');
  }
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return

  try {
    const response = await coreApi.delete(`/study-recruit/comments/${commentId}`)
    await fetchComments(response)
  } catch (error) {
    console.error('❌ 댓글 삭제 실패:', error)
    alert('댓글 삭제 중 오류가 발생했습니다.')
  }
}

// 대댓글 수정
const editReply = async (payload) => {
  const { replyId, content } = payload;
  try {
    const response = await coreApi.put(`/study-recruit/comments/${replyId}`, {
      content
    });
    await fetchComments();
  } catch (error) {
    console.error('❌ 대댓글 수정 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);
    alert('대댓글 수정 중 오류가 발생했습니다.');
  }
};

// 대댓글 삭제
const deleteReply = async ({ replyId }) => {
  if (!confirm('정말로 이 답글을 삭제하시겠습니까?')) return;

  try {
    const response = await coreApi.delete(`/study-recruit/comments/${replyId}`);
    await fetchComments();
  } catch (error) {
    console.error('❌ 대댓글 삭제 실패:', error);
    console.error('❌ 에러 상세:', error.response?.data);
    alert('대댓글 삭제 중 오류가 발생했습니다.');
  }
};

// 수정 버튼
const goToEditPage = () => {
  router.push({
    path: "/study-recruit/post",
    query: { mode: "edit", id: postId },
  });
};

// 삭제 버튼
const deletePost = async () => {
  if (!confirm("정말 이 모집글을 삭제하시겠습니까?")) return;
  try {
    await coreApi.delete(`/study-recruit/posts/${postId}`);
    alert("모집글이 삭제되었습니다.");
    router.push("/study-recruit");
  } catch (error) {
    console.error("❌ 모집글 삭제 실패:", error);
    alert("삭제 중 오류가 발생했습니다.");
  }
};

onMounted(async () => {
  // localStorage에서 사용자 정보 가져오기
  const storedMemberId = localStorage.getItem("memberId");
  const storedNickname = localStorage.getItem("nickname");
  const storedRankName = localStorage.getItem("rankName");

  currentMemberId.value = storedMemberId ? Number(storedMemberId) : 0;
  currentUser.value = {
    id: currentMemberId.value, // ✅ Comment 컴포넌트가 userId와 비교하는 필드
    nickname: storedNickname || "사용자",
    rankName: storedRankName || "코뉴비"
  };

  console.log('👤 댓글 작성자 정보:', currentUser.value);

  await fetchPostDetail();
  await fetchComments();
});
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
