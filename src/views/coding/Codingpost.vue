<template>
  <div class="coding-write-page">
    <!-- 상단 제목 -->
    <TabTitle title="풀이 게시물 작성" />

    <div class="divider"></div>

    <!-- 문제 정보 영역 -->
    <div class="problem-info">
      <span class="label">코딩문제</span>
      <div class="spacer"></div>
      
      <CustomButton 
      variant="secondary"
      @click="handleSelectProblem"
      >{{ selectedProblem?.title || '두 수의 합' }}</CustomButton>
    </div>

    <!-- 제목 입력 -->
    <div class="input-section">
      <span class="label"
        >제목 <span class="required">*</span></span
      >
      <div class="spacer"></div>
      <Input
        width="1022px"
        placeholder="제목을 작성해주세요"
        v-model="title"
      />
    </div>

    <!-- 본문 에디터 -->
    <div class="editor-section">
      <span class="label"
        >본문 <span class="required">*</span></span
      >
      <div class="spacer"></div>
      <p class="hint">
        풀이를 등록하면 바로
        <strong class="ai-feedback">AI가 피드백을 제공</strong>합니다.<br />
        복잡도, 좋은 점, 개선할 점까지 한눈에 확인하세요.
      </p>
      <MarkdownEditor ref="editorRef" />
    </div>

    <!-- 하단 버튼 -->
    <div class="bottom-buttons">
      <CustomButton
        variant="gray2"
        width="150px"
        height="md"
        @click="handleBack"
      >
        이전
      </CustomButton>
      <CustomButton
        variant="primary"
        width="150px"
        height="md"
        @click="handleSubmit"
      >
        완료
      </CustomButton>
    </div>

    <!-- 완료 팝업 -->
    <TwoButtonPopup
      v-model="isPopupVisible"
      title="풀이 등록"
      subtitle="AI피드백 때문에 시간이 걸릴 수 있습니다."
      image="/src/assets/images/robot.png"
      confirmText="등록"
      cancelText="취소"
      @confirm="submitPost"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabTitle from '@/components/common/TabTitle.vue'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import MarkdownEditor from '@/components/common/MarkdownEditor.vue'
import TwoButtonPopup from '@/components/common/TwoButtonPopup.vue'

/* 상태 */
const title = ref('')
const selectedProblem = ref({ title: '두 수의 합' })
const isPopupVisible = ref(false)
const editorRef = ref(null)

/* 버튼 핸들러 */
const handleBack = () => window.history.back()
const handleSelectProblem = () => alert('문제 선택 모달 띄우기 (구현 예정)')
const handleSubmit = () => (isPopupVisible.value = true)

/* 실제 등록 로직 */
const submitPost = () => {
  const content = editorRef.value?.getContent()
  console.log('제목:', title.value)
  console.log('문제:', selectedProblem.value)
  console.log('본문:', content)
  alert('게시물이 성공적으로 등록되었습니다.')
}
</script>

<style scoped>
.coding-write-page {
  max-width: 1024px;
  margin: 0 auto;
  padding: 28px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #303133;
}

/* === 섹션 공통 === */
.problem-info,
.input-section,
.editor-section {
  margin-bottom: 32px;
}

.label {
  font-weight: 600;
  font-size: 18px;
  color: #333;
}

.required {
  color: #e74c3c;
  font-weight: 700;
  margin-left: 4px;
}

/* 버튼 안의 문제 제목 색상 */
.problem-title {
  color: #007bff;
  font-weight: 600;
}

/* 피드백 강조 */
.ai-feedback {
  color: #e74c3c;
  font-weight: 600;
}

.hint {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
  line-height: 1.4;
}

/* === 하단 버튼 === */
.bottom-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;
  padding-bottom: 60px;
}

.spacer {
  height: 12px;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
}
</style>
