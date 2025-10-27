<template>
  <div class="algo-post-item" @click="emit('click')">
    <div class="title-group">
      <img :src="bookIcon" class="book-icon" />
      <span class="post-title">{{ title }}</span>
    </div>

    <div class="quiz-status-group">
      <img v-for="quizId in quizIds" :key="quizId" :src="getQuizStatusIcon(quizId)" class="quiz-icon" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import blueBook from '@/assets/icons/blue_book.svg';
import clearSvg from '@/assets/images/success_koala.png';
import defaultSvg from '@/assets/images/not_success_koala.svg';

const props = defineProps({
  id: {type: Number, required: true},
  title: { type: String, required: true },
  quizIds: { type: Array, default: () => [] },
  solvedQuizIds: { type: Array, default: () => [] },
});

const bookIcon = blueBook;

const getQuizStatusIcon = (quizId) => {
  const isSolved = props.solvedQuizIds.includes(quizId);
  return isSolved ? clearSvg : defaultSvg;
};

const emit = defineEmits(['click']);
</script>

<style scoped>
.algo-post-item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 12px 18px;
  margin-bottom: 10px;

  border: 1px solid #CFCFCF;
  border-radius: 8px;
  background-color: #FFFFFF;

  font-family: 'Noto Sans KR', sans-serif;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.algo-post-item:hover {
  transition: background-color 0.2s;
  background-color: #F0FAFF;
  border-color: #94DBFF;
}

.title-group {
  display: flex;
  align-items: center;
  flex-grow: 1;
  min-width: 0;
  gap: 15px;
}

.book-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.post-title {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 13px;
  color: #666666;
}

.quiz-status-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  white-space: nowrap; 
}

.quiz-icon {
  width: 30px;
}
</style>