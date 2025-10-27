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
                        <img v-if="post.status === 'APPROVED'" src="@/assets/icons/certification.svg"
                            class="verified-icon" />
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
import { useRoute, useRouter } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import RelatedCompanyPosts from "@/components/career/RelatedCompanyPosts.vue";
import {
    fetchCareerPostDetail,
    fetchCareerComments,
    createCareerComment,
} from "@/api/careerApi";

const route = useRoute();
const router = useRouter();
const postId = route.params.postId;

// 상태
const post = ref(null);
const comments = ref([]);
const relatedPosts = ref([]);
const currentUser = ref({ id: null, nickname: "", rankName: "코뉴비" });

// 현재 로그인 사용자 세팅
const loadCurrentUser = () => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        currentUser.value.id = payload.memberId;
        currentUser.value.nickname = payload.nickname || "사용자";
        currentUser.value.role = payload.role;
        currentUser.value.rankName = "코뉴비"; // 추후 서버에서 받아오기
        console.log("로그인 사용자:", currentUser.value);
    } catch (err) {
        console.error("JWT 파싱 실패:", err);
    }
};

// 게시글 불러오기
const fetchPost = async () => {
    try {
        post.value = await fetchCareerPostDetail(postId);
    } catch (err) {
        console.error("게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
    }
};

// 댓글 불러오기 (정규화 포함)
const fetchComments = async () => {
    try {
        const raw = await fetchCareerComments(postId);

        // 백엔드 구조 → Comment.vue 구조로 맞추기
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
</style>
