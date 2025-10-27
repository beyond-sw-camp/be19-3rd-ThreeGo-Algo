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

                    <!-- 댓글 -->
                    <Comment :comments="comments" :currentUser="currentUser" @submit-comment="addComment" />
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
import coreApi from "@/api/coreApi";

const route = useRoute();
const router = useRouter();
const postId = route.params.postId;

// 상태
const post = ref(null);
const comments = ref([]);
const relatedPosts = ref([]);
const currentUser = ref({ nickname: "나", rankName: "코뉴비" });

// ✅ 게시글 불러오기
const fetchPost = async () => {
    try {
        const res = await coreApi.get(`/career-info/posts/${postId}`);
        post.value = res.data;
    } catch (err) {
        console.error("❌ 게시글 불러오기 실패:", err);
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
    }
};

// // ✅ 댓글 불러오기
// const fetchComments = async () => {
//     try {
//         const res = await coreApi.get(`/career-info/posts/${postId}/comments`);
//         comments.value = res.data;
//     } catch (err) {
//         console.error("❌ 댓글 불러오기 실패:", err);
//     }
// };

// // ✅ 관련글 불러오기 (같은 회사의 최신글 3개)
// const fetchRelatedPosts = async () => {
//     try {
//         if (!post.value?.company) return;
//         const res = await coreApi.get("/career-info", {
//             params: { company: post.value.company, size: 3 },
//         });
//         relatedPosts.value = res.data.filter((p) => p.id !== postId);
//     } catch (err) {
//         console.error("❌ 관련글 불러오기 실패:", err);
//     }
// };

// // ✅ 삭제 기능
// const deletePost = async () => {
//     if (!confirm("정말 이 글을 삭제하시겠습니까?")) return;
//     try {
//         await coreApi.delete(`/career-info/posts/${postId}`);
//         alert("삭제되었습니다.");
//         router.push("/career-info");
//     } catch (err) {
//         console.error("❌ 삭제 실패:", err);
//         alert("삭제 중 오류가 발생했습니다.");
//     }
// };

// // ✅ 댓글 등록
// const addComment = async (text) => {
//     try {
//         await coreApi.post(`/career-info/posts/${postId}/comments`, {
//             content: text,
//         });
//         await fetchComments(); // 새로고침
//     } catch (err) {
//         console.error("❌ 댓글 등록 실패:", err);
//     }
// };

// ✅ 게시글 본문 포맷팅
const formattedContent = computed(() =>
    post.value?.content ? post.value.content.replace(/\n/g, "<br>") : ""
);

// ✅ 날짜 포맷
const formatDate = (date) => (date ? date.split(" ")[0].replace(/-/g, ".") : "");

// ✅ onMounted 시 데이터 로드
onMounted(async () => {
    await fetchPost();
    await fetchComments();
    await fetchRelatedPosts();
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

.action-link {
    font-size: 13px;
    color: #666;
    background: none;
    border: none;
    cursor: pointer;
}

.action-link:hover {
    color: #0aa2eb;
    text-decoration: underline;
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
