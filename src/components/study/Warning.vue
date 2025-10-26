<template>
  <div class="warning-container">
    <img src="@/assets/icons/studydanger.svg" alt="경고" class="warning-icon" />
    <div class="warning-content">
      <h3 class="warning-title">스터디 해체</h3>
      <p class="warning-message">스터디 해체 전 반드시 주의사항을 확인하세요.</p>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.warning-container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background-color: #FFF0F0;
  border-radius: 8px;
  font-family: 'Noto Sans KR'
}

.warning-icon {
  width: 60px;
  height: 60px;
  margin-left: 20px;
}

.warning-content {
  flex: 1;
}

.warning-title {
  font-size: 20px;
  font-weight: 700;
  color: #383838;
  margin: 0 0 8px 0;
}

.warning-message {
  font-size: 16px;
  font-weight: 400;
  color: #383838;
  margin: 0;
  line-height: 1.5;
}
</style>