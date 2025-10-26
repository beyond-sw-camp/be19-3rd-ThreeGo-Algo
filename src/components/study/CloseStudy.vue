<template>
  <div class="warning-box">
    <div class="title-section">
      <div class="red-bar"></div>
      <h2 class="title">해체 전 꼭 확인하세요!</h2>
    </div>

    <div class="content-section">
      <p class="description">
        스터디원 없이 스터디장만 남아 있을 때 삭제할 수 있습니다.<br />
        <strong>다른 멤버가 남아 있다면 먼저 스터디원을 제외해주세요.</strong>
      </p>

      <p class="warning-text">
        스터디를 해체하면 현재 진행 중인 
        <span class="highlight">로드맵, 마일스톤, 스터디원 정보</span>가 모두 삭제됩니다.<br />
        <span class="highlight-danger">복구 불가</span>하므로 신중하게 결정해주세요.
      </p>
    </div>

    <div class="button-section">
      <CustomButton variant="danger" @click="handleDissolve">
        스터디 해체하기
      </CustomButton>
    </div>
  </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue'

const emit = defineEmits(['dissolve'])

const handleDissolve = () => {
  emit('dissolve')
}
</script>

<style scoped>
.warning-box {
  border: 1px solid #FF2B2B;
  border-radius: 8px;
  padding: 30px;
  font-family: 'Noto Sans KR';
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.red-bar {
  width: 4px;
  height: 28px;
  background-color: #FF2B2B;
  border-radius: 1px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.description {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  line-height: 1.6;
  margin: 0;
}

.description strong {
  font-weight: 700;
}

.warning-text {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  line-height: 1.6;
  margin: 0;
}

.highlight {
  color: #FF2B2B;
  font-weight: 600;
}

.highlight-danger {
  color: #FF2B2B;
  font-weight: 700;
}

.button-section {
  display: flex;
  justify-content: flex-end;
}
</style>