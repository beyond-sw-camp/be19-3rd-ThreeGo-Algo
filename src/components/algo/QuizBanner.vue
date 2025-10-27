<template>
    <div class="quiz-banner-container">
        <div class="quiz-banner-left-section">
            <img :src="image" class="koala-image" />
            <div class="quiz-banner-text-section">
                <p class="quiz-banner-title">
                    🏁 <span class="quiz-banner-highlight">{{ title }}</span> 학습 완료!
                </p>
                <p class="quiz-banner-subtitle">
                    지금 바로 <span class="quiz-banner-highlight">퀴즈</span>로 개념을 완성해보세요.
                </p>
                <p class="quiz-banner-description">
                    💡 정답을 맞히면 <span class="quiz-banner-point">2 포인트</span>를 얻을 수 있어요!
                </p>
            </div>
        </div>

        <CustomButton class="quiz-banner-button" @click="emit('goToQuizPage')">
            퀴즈 풀러가기
        </CustomButton>
    </div>
</template>

<script setup>
import koalaImg from '@/assets/images/default_koala.png';
import CustomButton from '@/components/common/CustomButton.vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
    title: String
});

const image = koalaImg;

const emit = defineEmits(['goToQuizPage']);
</script>

<style scoped>
.quiz-banner-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 35px;
    height: 141px;
    background: #F0FAFF;
    border-radius: 8px;
    margin-bottom: 10px;
}

.quiz-banner-left-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

.koala-image {
    width: 67px;
}

.quiz-banner-text-section {
    display: flex;
    flex-direction: column;
}

.quiz-banner-title {
    font-weight: 500;
    font-size: 13px;
}

.quiz-banner-subtitle {
    font-weight: 700;
    font-size: 14px;
    color: #000;
}

.quiz-banner-description {
    font-weight: 500;
    font-size: 12px;
    color: #383838;
}

.quiz-banner-highlight {
    color: #0aa2eb;
}

.quiz-banner-point {
    color: #0aa2eb;
    font-weight: 700;
}
</style>
