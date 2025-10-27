<template>
    <div class="algo-post-detail">
        <div>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/algorithm' }">알고리즘 학습</el-breadcrumb-item>
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

                    <Comment :comments="comments" :currentUser="currentUser" @submit-comment="addComment" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import QuizBanner from "@/components/algo/QuizBanner.vue";
import { useRouter } from 'vue-router';
import LikeBanner from "@/components/algo/LikeBanner.vue";
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter();

function handleGoQuiz() {
    router.push(`/algorithm/post/${post.value.postId}/quiz/${post.value.quizIds[0]}`);
}

const post = ref({
    postId: 1,
    roadmapId: 1,
    roadmapTitle: '자료구조',
    memberId: 29,
    nickname: '관리자',
    title: "스택",
    createdAt: "2025.10.27 14:00",
    content: `
    <p>스택(Stack)은 <strong>LIFO(Last In, First Out)</strong> 구조를 가지는 자료구조로, 마지막에 들어온 데이터가 가장 먼저 나가는 특징이 있습니다.<br>
주요 연산으로는 <code>push</code>(데이터 추가), <code>pop</code>(데이터 제거), <code>peek</code>(맨 위 데이터 확인)가 있습니다.</p>

<p>스택은 프로그램에서 다양한 용도로 활용됩니다:</p>
<ul>
  <li><strong>함수 호출 관리</strong> - 프로그램 실행 시 호출되는 함수들을 스택에 쌓아, 실행이 끝나면 순서대로 제거합니다.</li>
  <li><strong>뒤로 가기 기능</strong> - 브라우저나 앱에서 사용자가 이전 페이지로 돌아갈 때, 방문한 페이지를 스택에 쌓아 활용합니다.</li>
  <li><strong>수식 계산 및 괄호 검사</strong> - 중위 표기식을 후위 표기식으로 변환하거나, 괄호가 올바르게 닫혔는지 확인할 때 사용합니다.</li>
</ul>

<p>예제 코드(Java):</p>
<pre><code>Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
stack.push(10);
stack.push(20);
System.out.println(stack.pop()); // 20
System.out.println(stack.peek()); // 10
</code></pre>

<p>스택은 간단하지만 매우 강력한 자료구조로, 알고리즘 문제에서도 자주 등장합니다.<br>
이제 여러분도 스택의 기본 원리를 이해하고, 다양한 문제에 적용해 보세요! 🚀</p>

    `,
    commentCount: 20,
    likeCount: 0,
    isLiked: false,
    quizIds: [13],
    solvedQuizIds: [],
    imageUrls: []
});

const handleLikePost = () => {
    console.log("추천하기 클릭!");
    post.value.likeCount += 1;
    console.log(post.value.likeCount);
    post.value.isLiked = true;
};

const writer = ref({
    nickname: "관리자",
    rankName: "관리자"
});

const currentUser = ref({
    nickname: "강햄찌",
    rankName: "코뉴비"
});

const comments = ref([
    {
        id: 1,
        nickname: "라이언",
        rankName: "코뉴비",
        content: "스택을 알게 되어 좋아요~",
        createdAt: "2025.11.14 18:12"
    },
    {
        id: 2,
        nickname: "제이지",
        rankName: "코좀알",
        content: "스택 클리어!",
        createdAt: "2025.11.15 10:30"
    },
]);

const addComment = (text) => {
    const newComment = {
        id: comments.value.length + 1,
        author: "강햄찌",
        content: text,
        date: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    comments.value.push(newComment);
};
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