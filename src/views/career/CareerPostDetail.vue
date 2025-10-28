<template>
    <div class="career-post-detail-page">
        <div class="career-post-detail">
            <!-- 상단: 뒤로가기 -->
            <div class="header-row">
                <BackButton text="목록으로 돌아가기" to="/career-info" />
            </div>

            <!-- 본문 -->
            <div class="content-layout" v-if="post">
                <!-- 왼쪽: 게시글 -->
                <div class="post-section">
                    <!-- 제목 -->
                    <div class="post-title-row">
                        <h2 class="post-title">{{ post.title }}</h2>

                        <!-- 승인됨 (모두에게 표시) -->
                        <img v-if="post.status === 'APPROVED'" src="@/assets/icons/certification.svg"
                            class="verified-icon" alt="approved" />

                        <!-- 심사중 (본인 글일 때만) -->
                        <div v-else-if="isAuthor && post.status === 'PENDING'" class="status-icon-wrapper">
                            <img src="@/assets/icons/certification_pending.svg" class="verified-icon" alt="pending" />
                            <div class="tooltip">인증 사진을 확인하고 있어요 🐨<br>
                                결과는 <b>24시간 이내</b>에 나와요!<br>
                                인증이 완료되면 <b>10포인트</b>가 추가로 지급됩니다 🎉 </div>
                        </div>

                        <!-- 반려됨 (본인 글일 때만) -->
                        <div v-else-if="isAuthor && post.status === 'REJECTED'" class="status-icon-wrapper">
                            <img src="@/assets/icons/certification_rejected.svg" class="verified-icon" alt="rejected" />
                            <div class="tooltip">
                                인증 반려 사유: {{ post.rejectReason || "사유 없음" }}
                            </div>
                        </div>
                    </div>


                    <!-- 기업/연도 뱃지 -->
                    <div v-if="post.company || displayYear" class="post-badges">
                        <span v-if="post.company" class="company-badge">{{ post.company }}</span>
                        <span v-if="displayYear" class="year-badge">{{ displayYear }}</span>
                    </div>

                    <!-- 작성자 정보 -->
                    <div class="author-info">
                        <MiniProfile :nickname="post.nickname" :rankName="post.rankName" />
                        <span class="post-date">{{ formatDate(post.createdAt) }}</span>
                    </div>

                    <!-- 본문 -->
                    <div class="post-content">
                        <p v-html="formattedContent"></p>
                    </div>

                    <!-- 댓글 섹션 -->
                    <Comment :comments="comments" :currentUser="currentUser" @submit-comment="addComment"
                        @submit-reply="addReply" />
                </div>

                <!-- 오른쪽: 관련글 -->
                <aside class="side-box">
                    <RelatedCompanyPosts :company="post.company" :posts="relatedPosts" @write="goWritePage" />
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import RelatedCompanyPosts from "@/components/career/RelatedCompanyPosts.vue";
import {
    fetchCareerPostDetail,
    fetchCareerComments,
    createCareerComment,
    fetchRecentCareerPostsByCompany,
} from "@/api/careerApi";
import memberApi from "@/api/memberApi";

const route = useRoute();
const router = useRouter();
const postId = route.params.postId;

// 상태
const post = ref(null);
const comments = ref([]);
const relatedPosts = ref([]);
const currentUser = ref({ id: null, nickname: "", rankName: "코뉴비" });
const displayYear = computed(() =>
    post.value?.year ? post.value.year.replace(/^_/, "") : ""
)

// 현재 로그인 사용자 세팅
const loadCurrentUser = async () => {
    try {
        const token = localStorage.getItem("accessToken")
        if (!token) return

        // JWT에서 기본 정보만 파싱
        const payload = JSON.parse(atob(token.split(".")[1]))
        currentUser.value.id = payload.memberId
        currentUser.value.role = payload.role

        // 서버에서 닉네임 + 등급(rankName) 가져오기
        const res = await memberApi.get("/member/rank", {
            headers: { Authorization: `Bearer ${token}` },
        })
        currentUser.value.nickname = res.data.nickname
        currentUser.value.rankName = res.data.rankName

        console.log("현재 로그인 사용자:", currentUser.value)
    } catch (err) {
        console.error("로그인 사용자 정보 불러오기 실패:", err)
    }
}

const isAuthor = computed(() => {
    return currentUser.value.id === post.value?.memberId;
});


// 게시글 불러오기
const fetchPost = async (id = route.params.postId) => {
    try {
        post.value = await fetchCareerPostDetail(id);

        if (post.value?.company) {
            const recent = await fetchRecentCareerPostsByCompany(post.value.company);
            relatedPosts.value = recent.filter(p => p.id !== post.value.id);
        }
    } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
    }
};

// 댓글 불러오기
const fetchComments = async (id = route.params.postId) => {
    try {
        const raw = await fetchCareerComments(id);
        const normalize = (nodes = []) =>
            nodes.map((n) => ({
                id: n.commentId,
                userId: n.memberId,
                nickname: n.nickname,
                rankName: n.rankName,
                content: n.content,
                createdAt: n.createdAt,
                replies: n.children ? normalize(n.children) : [],
            }));
        comments.value = normalize(raw);
    } catch (err) {
        console.error("댓글 불러오기 실패:", err);
    }
};


// 댓글 등록 (루트 댓글)
const addComment = async ({ content }) => {
    try {
        await createCareerComment(postId, content); // parentId 없음
        await fetchComments();
    } catch (err) {
        console.error("댓글 등록 실패:", err);
    }
};

// 대댓글 등록
const addReply = async ({ commentId, content }) => {
    try {
        await createCareerComment(postId, content, commentId); // parentId 포함
        await fetchComments();
    } catch (err) {
        console.error("대댓글 등록 실패:", err);
    }
};

// 게시글 본문 포맷팅
const formattedContent = computed(() =>
    post.value?.content ? post.value.content.replace(/\n/g, "<br>") : ""
);

// 날짜 포맷
const formatDate = (date) => (date ? date.split(" ")[0].replace(/-/g, ".") : "");

// 글쓰기 이동
const goWritePage = () => router.push("/career-info/post");


// onMounted 시 데이터 로드
onMounted(async () => {
    loadCurrentUser();
    await fetchPost();
    await fetchComments();
});

// 우트 변경 감지
onBeforeRouteUpdate(async (to, from) => {
    console.log("라우트 변경 감지:", from.params.postId, "→", to.params.postId);

    post.value = null; // 새 페이지 로드될 때 깜빡임 방지용
    comments.value = [];
    relatedPosts.value = [];

    // 새 postId 기준으로 데이터 재로드
    await fetchPost(to.params.postId);
    await fetchComments(to.params.postId);
});
</script>

<style scoped>
.career-post-detail-page {
    display: flex;
    justify-content: center;
    background-color: #fff;
    min-height: 100vh;
    padding: 40px 0;
}

.career-post-detail {
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
}

.header-row {
    margin-bottom: 16px;
}

.content-layout {
    display: flex;
    gap: 36px;
    align-items: flex-start;
}

.post-section {
    flex: 1;
    max-width: 740px;
}

.post-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.post-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
}

.verified-icon {
    width: 30px;
}

.post-badges {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 15px 0px 15px 0px;
    /* margin-bottom: 10px; */
}

.company-badge,
.year-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 12px;
    line-height: 1;
}

.company-badge {
    background-color: #E6F3FF;
    color: #0A8BE4;
    font-weight: 500;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 5px;
}

.year-badge {
    background-color: #F2F2F2;
    color: #444;
    font-weight: 500;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 5px;
}

.author-info {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 16px;
    margin-bottom: 24px;
}

.post-date {
    font-size: 14px;
    color: #666;
}

.post-content {
    font-size: 15px;
    line-height: 1.8;
    color: #333;
    white-space: pre-wrap;
    margin-bottom: 40px;
}

.side-box {
    width: 340px;
    flex-shrink: 0;
    position: sticky;
    top: 20px;
}

.status-icon-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    top: 125%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #F0FAFF;
    color: #000000;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    z-index: 10;
    margin-top: 4px;
}

.status-icon-wrapper:hover .tooltip {
    opacity: 1;
}

.tooltip {
    text-align: center;
    word-break: keep-all;
}
</style>
