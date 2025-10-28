<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import coreApi from '@/api/coreApi'

import TabTitle from '@/components/common/TabTitle.vue'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import MarkdownEditor from '@/components/common/MarkdownEditor.vue'
import TwoButtonPopup from '@/components/common/TwoButtonPopup.vue'

const route = useRoute()
const router = useRouter()

// ✅ URL에서 직접 problemId와 problemTitle 가져오기
const problemId = Number(route.params.problemId)
const problemTitle = route.query.problemTitle || ''

const problem = ref({
  problemId,
  problemTitle
})

const title = ref('')
const editorRef = ref(null)
const isPopupVisible = ref(false)
const selectedImage = ref(null)

const errors = reactive({
  title: '',
  content: '',
  images: ''
})

/* 이미지 파일 선택 */
const handleImageChange = (e) => {
  selectedImage.value = e.target.files[0] || null
}

/* 유효성 검사 */
const validateForm = () => {
  let isValid = true
  errors.title = ''
  errors.content = ''
  errors.images = ''

  if (!title.value.trim()) {
    errors.title = '제목을 입력해주세요.'
    isValid = false
  }

  const content = editorRef.value?.getContent()
  if (!content || content.trim() === '' || content === '<p><br></p>') {
    errors.content = '본문을 입력해주세요.'
    isValid = false
  }

  return isValid
}

/* 뒤로가기 */
const handleBack = () => router.back()

/* 문제 선택 버튼 (임시) */
const handleSelectProblem = () => {
  alert('문제 선택 기능은 추후 구현 예정입니다.')
}

/* 작성 완료 버튼 */
const handleSubmit = () => {
  if (validateForm()) {
    isPopupVisible.value = true
  }
}

/* 실제 등록 로직 */
const submitPost = async () => {
  const content = editorRef.value?.getContent()

  if (!problem.value.problemId || isNaN(problem.value.problemId)) {
    alert('문제 정보가 올바르지 않습니다.')
    return
  }

  const formData = new FormData()
  formData.append('data', JSON.stringify({
    title: title.value,
    content
  }))
  formData.append('problemId', problem.value.problemId)

  if (selectedImage.value) {
    formData.append('images', selectedImage.value)
  }

  try {
    const { data: postId } = await coreApi.post('/coding/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    alert('게시물이 등록되었습니다.')
    router.push(`/coding-problems/${problem.value.problemId}/solutions/${postId}`)
  } catch (err) {
    console.error('게시물 등록 실패:', err)
    alert('게시물 등록 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <div class="coding-write-page">
    <TabTitle title="풀이 게시물 작성" />
    <div class="divider"></div>

    <!-- 문제 정보 영역 -->
    <div class="problem-info">
      <span class="label">코딩문제</span>
      <div class="spacer"></div>
      <CustomButton 
        variant="secondary"
        @click="handleSelectProblem"
      >{{ problem.problemTitle || '문제 선택' }}</CustomButton>
    </div>

    <!-- 제목 입력 -->
    <div class="input-section">
      <span class="label">
        제목 <span class="required">*</span>
      </span>
      <div class="spacer"></div>
      <Input
        width="1022px"
        placeholder="제목을 작성해주세요"
        v-model="title"
        :class="{ 'error-border': errors.title }" />
      <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
    </div>

    <!-- 본문 에디터 -->
    <div class="editor-section">
      <span class="label">본문 <span class="required">*</span></span>
      <div class="spacer"></div>
      <p class="hint">
        풀이를 등록하면 바로
        <strong class="ai-feedback">AI가 피드백을 제공</strong>합니다.<br />
        복잡도, 좋은 점, 개선할 점까지 한눈에 확인하세요.
      </p>
      <div :class="{ 'error-border': errors.content }">
        <MarkdownEditor ref="editorRef" />
      </div>
      <p v-if="errors.content" class="error-message">{{ errors.content }}</p>
    </div>

    <!-- 하단 버튼 -->
    <div class="bottom-buttons">
      <CustomButton variant="gray2" width="150px" height="md" @click="handleBack">
        이전
      </CustomButton>
      <CustomButton variant="primary" width="150px" height="md" @click="handleSubmit">
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
      @confirm="submitPost" />
  </div>
</template>

<style scoped>
.coding-write-page {
  max-width: 1024px;
  margin: 0 auto;
  padding: 28px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #303133;
}
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
.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 0;
  font-weight: 500;
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.error-border :deep(input),
.error-border :deep(textarea) {
  border: 2px solid #e74c3c !important;
}
.error-border :deep(.note-editor) {
  border: 2px solid #e74c3c !important;
}
.problem-title {
  color: #007bff;
  font-weight: 600;
}
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
.bottom-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;
  padding-bottom: 60px;
}
.spacer { height: 12px; }
.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
}
</style>