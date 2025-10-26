<template>
  <div class="quiz-options">
    <div
      v-for="(option, index) in options"
      :key="index"
      :class="['quiz-option', { selected: selectedIndex === index }]"
      @click="selectOption(index)"
    >
      <div class="option-label">A{{ index + 1 }}.</div>
      <div class="option-text">{{ option.optionText }}</div>
      <img
        v-if="selectedIndex === index"
        class="check-icon"
        :src="checkIcon"
        alt="selected"
      />
    </div>
  </div>

  <div class="submit-button">
    <CustomButton width="100px" @click="submitAnswer">제출하기</CustomButton>
  </div>
  
</template>

<script setup>
import { ref } from 'vue';
import checkIconSvg from '@/assets/icons/blue_check.svg';
import CustomButton from '@/components/common/CustomButton.vue';

const { options, quizId } = defineProps({
  options: { type: Array, required: true },
  quizId: { type: Number, required: true }
});

const emit = defineEmits(['submit']);
const checkIcon = checkIconSvg;

const selectedIndex = ref(null);

function selectOption(index) {
  selectedIndex.value = index;
}

function submitAnswer() {
  if (selectedIndex.value === null) return alert('보기를 선택해주세요!');
  const selectedOption = options[selectedIndex.value];
  emit('submit', { quizId, selectedOption });
}
</script>

<style scoped>
.quiz-options {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 220px;
}

.quiz-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    height: 50px;
    background: #ffffff;
    border: 2px solid #CFCFCF;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.quiz-option.selected {
    border-color: #0AA2EB;
}

.option-label {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 13px;
    width: 35px;
    padding: 5px;
    text-align: center;
    color: #000000;
    background-color: #cfcfcf;
    border-radius: 8px;
}

.quiz-option.selected .option-label {
    background-color: #DBF4FF;
}

.option-text {
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 13px;
    color: #000000;
    margin-left: 10px;
    flex: 1;
}

.check-icon {
    width: 20px;
}

.submit-button {
    display: flex;
    justify-content: center;
}
</style>