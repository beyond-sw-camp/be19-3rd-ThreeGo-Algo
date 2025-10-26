<template>
    <div class="quiz-item" :class="{ solved: props.solved }" @click="emit('click', props.quiz.id)">
        <div class="quiz-info">
            <span class="quiz-title">Quiz {{ index + 1 }}. {{ quiz.question }}</span>
        </div>

        <img v-if="props.solved" class="check-icon" :src="checkIcon" />
    </div>
</template>

<script setup>
import checkIconSvg from '@/assets/icons/blue_check.svg';
import { defineEmits } from 'vue';

const props = defineProps({
    quiz: { type: Object, required: true },
    solved: { type: Boolean, default: false },
    index: {type: Number, required: true}
});

const emit = defineEmits(['click']);

const checkIcon = checkIconSvg;
</script>

<style scoped>
.quiz-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f1efee;
    color: #838383;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 50px;
}

.quiz-item.solved {
    background-color: #dbf4ff;
    border-color: #0aa2eb;
    color: #000;
}

.quiz-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.quiz-title {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
}

.quiz-type {
    font-size: 12px;
    color: #666;
}

.check-icon {
    width: 22px;
}
</style>
