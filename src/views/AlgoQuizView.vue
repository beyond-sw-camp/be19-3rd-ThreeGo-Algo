<template>
    <div class="algo-quiz-container">
        <div class="breadcrumb-container">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/algorithm' }">알고리즘 학습</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/algorithm/roadmap/${dummyPostDetail.roadmapId}` }">{{dummyPostDetail.title }}</el-breadcrumb-item>
                <!-- TODO 학습 게시물로 이동 -->
                <el-breadcrumb-item :to="{ path: '/algorithm' }">{{ dummyPostDetail.roadmapTitle }}</el-breadcrumb-item>
                <el-breadcrumb-item>퀴즈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="roadmap-title">
            <p>🎯 {{ dummyPostDetail.title }} 퀴즈</p>
        </div>
        <hr />

        <div class="quiz-container">
            <div class="quiz-main">
                <p class="quiz-title"><span>Q. </span>{{ currentQuiz.question }}</p>

                <QuizOption :options="currentQuiz.options" :quizId="currentQuiz.id" @submit="handleSubmit" />
            </div>

            <div class="quiz-sidebar">
                <p>📚 퀴즈 목록</p>
                <div class="quiz-list-wrapper">
                    <QuizListItem v-for="(quiz, index) in quizzes" :key="quiz.id" :quiz="quiz"
                        :solved="solvedQuizIds.includes(quiz.id)" :index="index" @click="handleQuizClick(quiz.id)" />
                </div>
            </div>
        </div>
    </div>

    <OneButtonPopup v-model="popup.correct" title="🎉 정답이에요!" subtitle="2 포인트를 획득했어요!" confirmText="확인"
        image="/src/assets/images/level_up1_1.png" confirmVariant="primary" :showCancel="false"
        @confirm="handleConfirm('correct')" />

    <OneButtonPopup v-model="popup.alreadySolved" title="👍 이미 맞힌 퀴즈예요!" subtitle="다음 퀴즈에 도전하여 학습을 이어가 보세요!"
        confirmText="확인" image="/src/assets/images/level_up1_1.png" confirmVariant="primary" :showCancel="false"
        @confirm="handleConfirm('alreadySolved')" />

    <OneButtonPopup v-model="popup.wrong" title="😢 아쉽게도 틀렸어요." subtitle="개념을 복습하고 다시 도전해보세요!" confirmText="확인"
        image="/src/assets/images/level_up1_1.png" confirmVariant="primary" :showCancel="false"
        @confirm="handleConfirm('wrong')" />
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import QuizListItem from '@/components/algo/QuizListItem.vue';
import QuizOption from '@/components/algo/QuizOption.vue';
import OneButtonPopup from '@/components/common/OneButtonPopup.vue';
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute();
const router = useRouter();

const currentPostId = ref(Number(route.params.postId));
const currentQuizId = ref(Number(route.params.quizId) || null);

const quizzes = ref([]);
const solvedQuizIds = ref([]);

const dummyQuizzes = [
    {
        id: 12,
        question: '피보나치 수열의 점화식은 무엇인가?',
        type: 'MULTIPLE_CHOICE',
        options: [
            { id: 1, optionText: 'F(n) = F(n-1) + F(n-2)', isCorrect: true },
            { id: 2, optionText: 'F(n) = F(n-1) * 2', isCorrect: false },
            { id: 3, optionText: 'F(n) = n', isCorrect: false },
        ],
    },
    {
        id: 13,
        question: '스택은 FILO?',
        type: 'OX',
        options: [
            { id: 4, optionText: 'O', isCorrect: true },
            { id: 5, optionText: 'X', isCorrect: false },
        ],
    },
    {
        id: 14,
        question: '큐는 FILO?',
        type: 'OX',
        options: [
            { id: 4, optionText: 'X', isCorrect: true },
            { id: 5, optionText: 'O', isCorrect: false },
        ],
    }
];

const dummyPostDetail = {
    postId: 1,
    roadmapId: 1,
    roadmapTitle: "스택",
    title: "자료구조",
    solvedQuizIds: [12],
};

quizzes.value = dummyQuizzes;
solvedQuizIds.value = dummyPostDetail.solvedQuizIds;

const currentQuiz = computed(() =>
    quizzes.value.find((q) => q.id === currentQuizId.value)
);

function handleQuizClick(quizId) {
    currentQuizId.value = quizId;
    router.push(`/algorithm/post/${currentPostId.value}/quiz/${quizId}`);
}

const popup = reactive({
    correct: false,
    wrong: false,
    alreadySolved: false
})

const handleConfirm = (type) => {
    popup[type] = false;
}

function handleSubmit({ quizId, selectedOption }) {
    console.log('제출된 퀴즈:', quizId, selectedOption);

    if (selectedOption && selectedOption.isCorrect) {
        if (!dummyPostDetail.solvedQuizIds.includes(quizId)) {
            dummyPostDetail.solvedQuizIds.push(quizId);
            solvedQuizIds.value = [...dummyPostDetail.solvedQuizIds];
            popup.correct = true;
        } else {
            popup.alreadySolved = true;
        }
    } else {
        popup.wrong = true;
    }
}
</script>

<style scoped>
.algo-quiz-container {
    width: 1022px;
    margin: 0 auto;
    margin-top: 50px;
}

.algo-quiz-container hr {
    color: #CFCFCF;
    margin: 0px 0px 20px 0px;
}

.roadmap-title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
}

.quiz-container {
    display: flex;
    gap: 100px;
}

.quiz-sidebar {
    border: 1px solid #F1EFEE;
    border-radius: 8px;
    padding: 10px 30px;
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.quiz-sidebar p {
    font-size: 14px;
    font-weight: 700;
    color: #0AA2EB;
    text-align: center;
}

.quiz-main {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.quiz-title {
    font-size: 14px;
    font-weight: 700;
}

.quiz-title span {
    color: #0AA2EB;
}

.quiz-sidebar QuizListItem {
    overflow-y: auto;
    max-height: 200px;
}

.quiz-list-wrapper {
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 5px;
}

.breadcrumb-container {
    margin-bottom: 20px;
}
</style>