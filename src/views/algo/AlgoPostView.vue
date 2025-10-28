<template>
    <div class="algo-post-detail">
        <div>
            <template v-if="post">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/algorithm' }">알고리즘 학습</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/algorithm/roadmap/${post.roadmapId}` }">{{ post.roadmapTitle
                        }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
                </el-breadcrumb>

                <div class="content-wrapper">
                    <div class="post-section">
                        <div class="title-row">
                            <h2 class="post-title">{{ post.title }}</h2>
                        </div>

                        <div class="author-info">
                            <MiniProfile :nickname="writer.nickname" :rankName="writer.rankName" />
                            <span class="post-date">{{ post.createdAt }}</span>
                        </div>

                        <div class="section">
                            <div class="section-content" v-html="post.content"></div>
                        </div>

                        <template v-if="post.quizIds.length !== 0">
                            <QuizBanner title="스택" @goToQuizPage="handleGoQuiz" />
                        </template>

                        <LikeBanner :isLiked="post.isLiked" @likePost="handleLikePost" />

                        <Comment :comments="comments" :currentUser="currentUser" @submit-comment="addComment"
                            @submit-reply="addReply" @edit-comment="editComment" @delete-comment="deleteComment"
                            @edit-reply="editReply" @delete-reply="deleteReply" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import QuizBanner from "@/components/algo/QuizBanner.vue";
import { useRoute, useRouter } from 'vue-router';
import LikeBanner from "@/components/algo/LikeBanner.vue";
import { ArrowRight } from '@element-plus/icons-vue'
import coreApi from '@/api/coreApi';

const router = useRouter();
const route = useRoute();

function handleGoQuiz() {
    router.push(`/algorithm/post/${post.value.postId}/quiz/${post.value.quizIds[0]}`);
}

async function handleLikePost() {
    try {
        await coreApi.post(`/algo/posts/${post.value.postId}/likes`);

        await getPostDetail();
    } catch (error) {
        console.error('좋아요 실패:', error);
    }
};

const addComment = async (commentData) => {
    try {
        await coreApi.post(`/algo/posts/${postId.value}/comments`, { content: commentData.content });

        await getPostComments();
    } catch (error) {
        console.error("댓글 작성 실패:", error);
    }
};

const addReply = async (replyData) => {
    try {
        await coreApi.post(`/algo/posts/${postId.value}/comments`, {
            content: replyData.content,
            parentId: replyData.commentId,
        });

        await getPostComments();
    } catch (error) {
        console.error("답글 작성 실패:", error);
    }
};

const editComment = async (payload) => {
    const { commentId, content } = payload;

    try {
        await coreApi.put(`/algo/comments/${commentId}`, { content });

        await getPostComments();
    } catch (error) {
        console.error('댓글 수정 실패:', error);
    }
};

const deleteComment = async (commentId) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return

    try {
        await coreApi.delete(`/algo/comments/${commentId}`);

        await getPostComments();
    } catch (error) {
        console.error('댓글 삭제 실패:', error);
    }
}

const editReply = async (payload) => {
    const { replyId, content } = payload;
    try {
        await coreApi.put(`/algo/comments/${replyId}`, { content });
        await getPostComments();
    } catch (error) {
        console.error('대댓글 수정 실패:', error);
    }
};

const deleteReply = async ({ replyId }) => {
    if (!confirm('정말로 이 답글을 삭제하시겠습니까?')) return;

    try {
        await coreApi.delete(`/algo/comments/${replyId}`);

        await getPostComments();
    } catch (error) {
        console.error('대댓글 삭제 실패:', error);
    }
};

const writer = ref({
    nickname: "관리자",
    rankName: "관리자"
});

const currentUser = ref({
    nickname: '',
    rankName: ''
});

const post = ref(null);
const postId = ref(null);
const comments = ref([]);

async function getPostDetail() {
    try {
        const name = localStorage.getItem('nickname');
        const rank = localStorage.getItem('rank');

        currentUser.value = {
            nickname: name,
            rankName: rank
        };

        postId.value = Number(route.params.postId);

        const response = await coreApi.get(`/algo/posts/${postId.value}`);
        post.value = response.data;

        await getPostComments();
        console.log(post.value);
    } catch (error) {
        console.error('게시물 상세 정보 불러오기 실패:', error);
    }
};

async function getPostComments() {
    try {
        const response = await coreApi.get(`/algo/posts/${postId.value}/comments`);
        comments.value = response.data;
    } catch (error) {
        console.error('댓글 목록 불러오기 실패:', error);
    }
};

onMounted(getPostDetail);
</script>

<style scoped>
.algo-post-detail {
    width: 1022px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
}

.post-section {
    flex: 1;
    max-width: 720px;
}

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

.section {
    margin-bottom: 32px;
    min-width: 720px;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 16px 0;
    font-family: 'Noto Sans KR', sans-serif;
}

.section-content {
    color: #333;
    font-size: 14px;
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

.value {
    color: #1a1a1a;
    font-size: 14px;
    font-weight: 500;
}

.breadcrumb-container {
    width: 1022px;
}
</style>