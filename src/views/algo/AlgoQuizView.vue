<template>
    <div class="algo-quiz-container" v-if="currentQuiz">
        <div class="breadcrumb-container">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/algorithm' }">알고리즘 학습</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/algorithm/roadmap/${currentQuiz.roadmapId}` }">{{
                    currentQuiz.roadmapTitle
                    }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/algorithm/post/${currentQuiz.postId}` }">{{
                    currentQuiz.postTitle }}</el-breadcrumb-item>
                <el-breadcrumb-item>퀴즈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="roadmap-title">
            <p>🎯 {{ currentQuiz.postTitle }} 퀴즈</p>
        </div>
        <hr />

        <div class="quiz-container">
            <div class="quiz-main">
                <p class="quiz-title"><span>Q. </span>{{ currentQuiz.question }}</p>

                <QuizOption :options="currentQuiz.options" :key="currentQuiz.id" :quizId="currentQuiz.id" @submit="handleSubmit" />
            </div>

            <div class="quiz-sidebar">
                <p>📚 퀴즈 목록</p>
                <div class="quiz-list-wrapper">
                    <QuizListItem v-for="(quiz, index) in quizzes" :key="quiz.id" :quiz="quiz"
                        :isActive="quiz.id === currentQuizId" :isSolved="quiz.isSolved" :index="index"
                        @click="handleQuizClick(quiz.id)" />
                </div>
            </div>
        </div>
    </div>

    <OneButtonPopup v-model="popup.correct" title="🎉 정답이에요!" subtitle="2 포인트를 획득했어요!" confirmText="확인"
        image="/src/assets/images/level_up1_1.png" confirmVariant="primary" :showCancel="false"
        @confirm="handleConfirm('correct')" />

    <OneButtonPopup v-model="popup.alreadySolved" title="👍 이미 맞힌 퀴즈예요!" subtitle="다음 퀴즈에 도전하여 학습을 이어가 보세요!"
        confirmText="확인" image="/src/assets/images/algo_quiz_already.png" confirmVariant="primary" :showCancel="false"
        @confirm="handleConfirm('alreadySolved')" />

    <OneButtonPopup v-model="popup.wrong" title="😢 아쉽게도 틀렸어요." subtitle="개념을 복습하고 다시 도전해보세요!" confirmText="확인"
        image="/src/assets/images/algo_quiz_wrong.png" confirmVariant="primary" :showCancel="false"
        @confirm="handleConfirm('wrong')" />
</template>

<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import QuizListItem from '@/components/algo/QuizListItem.vue';
import QuizOption from '@/components/algo/QuizOption.vue';
import OneButtonPopup from '@/components/common/OneButtonPopup.vue';
import { ArrowRight } from '@element-plus/icons-vue'
import coreApi from '@/api/coreApi';

const route = useRoute();

const quizzes = ref([]);
const postId = ref(null);
const currentQuizId = ref(null);

const currentQuiz = computed(() =>
    quizzes.value.find(q => q.id === currentQuizId.value)
);

async function getQuiz() {
    try {
        postId.value = Number(route.params.postId);
        currentQuizId.value = Number(route.params.quizId);

        const response = await coreApi.get(`/algo/posts/${postId.value}/quizzes`);
        quizzes.value = response.data;
    } catch (error) {
        console.error('게시물 상세 정보 불러오기 실패:', error);
    }
}

function handleQuizClick(quizId) {
    currentQuizId.value = quizId;
}

watch(
    () => route.params.quizId,
    (newQuizId) => {
        if (newQuizId) {
            currentQuizId.value = Number(newQuizId);
        }
    }
);

const popup = reactive({
    correct: false,
    wrong: false,
    alreadySolved: false
})

const handleConfirm = async (type) => {
    popup[type] = false;

    try {
        if (type === 'correct') {
            await getQuiz();
        }
    } catch (error) {
        console.error('정답 제출 실패:', error);
    }
}

async function handleSubmit({ quizId, isCorrect }) {
    try {
        if (isCorrect) {
            if (!currentQuiz.value.isSolved) {
                await coreApi.post(`/algo/quizzes/${quizId}/answers`);

                popup.correct = true;
            } else {
                popup.alreadySolved = true;
            }
        } else {
            popup.wrong = true;
        }
    } catch (error) {
        console.error('정답 제출 실패:', error);
    }
}

onMounted(getQuiz);
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.quiz-sidebar p {
    margin-top: 10px;
    margin-bottom: 0px;
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
    align-items: center;
    width: 250px;
    padding: 10px;
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