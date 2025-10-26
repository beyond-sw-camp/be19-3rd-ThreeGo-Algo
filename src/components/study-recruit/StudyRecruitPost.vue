<template>
  <div class="study-recruit-post-page">
    <div class="study-recruit-post">
      <div class="container">
        <div class="form-section">
          <TabTitle title="스터디 모집" />
          <br>
          <!-- 제목 -->
          <div class="form-group">
            <label class="form-label">
              제목 <span class="required">*</span>
            </label>
            <input
              v-model="formData.title"
              type="text"
              class="form-input"
              placeholder="제목을 입력하세요..."
            />
          </div>

          <!-- 필수사항 -->
          <div class="form-group">
            <label class="form-label">
              모집 인원 <span class="required">*</span>
            </label>
            <div class="required-fields">

              <!-- 인원수 입력 -->
              <div class="number-input-wrapper">
                <img class="people-icon" src="@/assets/icons/myicon.svg" alt="people" />
                <input
                  v-model.number="formData.memberCount"
                  type="number"
                  class="number-input"
                  placeholder="20"
                  min="1"
                />
              </div>
            </div>
          </div>

          <!-- 스터디 기간 -->
          <div class="form-group">
            <label class="form-label">
              스터디 기간 <span class="required">*</span>
            </label>
            <DateRangeButton
              v-model:start-date="formData.startDate"
              v-model:end-date="formData.endDate"
            />
          </div>

          <!-- 본문 -->
          <div class="form-group">
            <label class="form-label">
              본문 <span class="required">*</span>
            </label>
            <div ref="editorContainer" class="editor-container"></div>
          </div>
        </div>

        <!-- 버튼 그룹 -->
        <div class="button-group">
          <CustomButton
            text="이전"
            variant="outline"
            size="md"
            @click="handlePrevious"
            class="action-button"
          />
          <CustomButton
            text="완료"
            variant="primary"
            size="md"
            @click="handleSubmit"
            class="action-button"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from '@/components/common/CustomButton.vue'
import DateRangeButton from '@/components/common/DateRangeButton.vue'
import Footer from '@/components/common/Footer.vue'
import TabTitle from '@/components/common/TabTitle.vue'

const router = useRouter()

// jQuery와 Summernote 동적 로드
let $ = null
let editor = null

const editorContainer = ref(null)
const formData = reactive({
  title: '',
  interviewType: '',
  memberCount: null,
  startDate: '',
  endDate: '',
  content: ''
})

const emit = defineEmits(['submit', 'previous'])

// Summernote 초기화
const initializeSummernote = () => {
  if (!window.jQuery || !window.jQuery.fn.summernote) {
    console.error('Summernote not loaded')
    return
  }

  $ = window.jQuery
  
  $(editorContainer.value).summernote({
    placeholder: '스터디 내용을 작성해주세요...',
    height: 400,
    lang: 'ko-KR',
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    fontNames: ['Roboto', 'Arial', 'Courier New', 'Noto Sans KR'],
    fontNamesIgnoreCheck: ['Roboto', 'Noto Sans KR'],
    callbacks: {
      onChange: (contents) => {
        formData.content = contents
      }
    }
  })

  // 초기 내용 설정
  $(editorContainer.value).summernote('code', formData.content)
}

// 폼 검증
const validateForm = () => {
  if (!formData.title.trim()) {
    alert('제목을 입력해주세요.')
    return false
  }
  if (!formData.memberCount || formData.memberCount < 1) {
    alert('인원수를 입력해주세요.')
    return false
  }
  if (!formData.startDate || !formData.endDate) {
    alert('스터디 모집 기간을 선택해주세요.')
    return false
  }
  if (!formData.content.trim() || formData.content === '<p><br></p>') {
    alert('본문을 작성해주세요.')
    return false
  }
  return true
}

const handleSubmit = () => {
  if (validateForm()) {
    // TODO: 실제로는 API 호출하여 데이터 저장
    console.log('제출 데이터:', formData)

    // 성공 메시지 표시
    alert('스터디 모집글이 등록되었습니다!')

    // 메인 페이지로 이동
    router.push('/study-recruit')
  }
}

const handlePrevious = () => {
  // 뒤로가기 (메인 페이지로)
  router.push('/study-recruit')
}

onMounted(() => {
  // Summernote 스크립트 로드
  if (!document.querySelector('#summernote-css')) {
    const link = document.createElement('link')
    link.id = 'summernote-css'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css'
    document.head.appendChild(link)
  }

  if (!window.jQuery) {
    const jqueryScript = document.createElement('script')
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    jqueryScript.onload = () => {
      const summernoteScript = document.createElement('script')
      summernoteScript.src = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js'
      summernoteScript.onload = () => {
        const langScript = document.createElement('script')
        langScript.src = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/lang/summernote-ko-KR.min.js'
        langScript.onload = initializeSummernote
        document.body.appendChild(langScript)
      }
      document.body.appendChild(summernoteScript)
    }
    document.body.appendChild(jqueryScript)
  } else {
    initializeSummernote()
  }
})

onBeforeUnmount(() => {
  if ($ && editorContainer.value) {
    $(editorContainer.value).summernote('destroy')
  }
})
</script>

<style scoped>
.study-recruit-post-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.study-recruit-post {
  flex: 1;
  background-color: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.page-title {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 40px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.required {
  color: #dc3545;
  margin-left: 2px;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  color: #333;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #adb5bd;
}

.form-input:focus {
  border-color: #0aa2eb;
  box-shadow: 0 0 0 3px rgba(10, 162, 235, 0.1);
}

.required-fields {
  display: flex;
  gap: 16px;
  align-items: center;
}

.dropdown-wrapper {
  position: relative;
  flex: 1;
  max-width: 200px;
}

.form-select {
  width: 100%;
  padding: 12px 40px 12px 18px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  color: #333;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-select:focus {
  border-color: #0aa2eb;
  box-shadow: 0 0 0 3px rgba(10, 162, 235, 0.1);
}

.dropdown-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.number-input-wrapper {
  position: relative;
  flex: 1;
  max-width: 150px;
}

.people-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
  filter: invert(55%) sepia(0%) saturate(0%) hue-rotate(176deg) brightness(95%) contrast(90%);
}

.number-input {
  width: 100%;
  padding: 12px 18px 12px 46px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  color: #333;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s ease;
}

.number-input::placeholder {
  color: #adb5bd;
}

.number-input:focus {
  border-color: #0aa2eb;
  box-shadow: 0 0 0 3px rgba(10, 162, 235, 0.1);
}

/* Remove number input arrows */
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input[type=number] {
  -moz-appearance: textfield;
}

.editor-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid #e9ecef;
}

.action-button {
  min-width: 140px;
}

/* Summernote 커스텀 스타일 */
:deep(.note-editor) {
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-family: 'Noto Sans KR', sans-serif;
}

:deep(.note-editor.note-frame) {
  border-radius: 10px;
}

:deep(.note-toolbar) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 12px;
}

:deep(.note-editing-area) {
  background: white;
}

:deep(.note-editable) {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  padding: 20px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 24px 20px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 32px;
  }

  .form-section {
    gap: 24px;
  }

  .required-fields {
    flex-direction: column;
    align-items: stretch;
  }

  .dropdown-wrapper,
  .number-input-wrapper {
    max-width: 100%;
  }

  .button-group {
    flex-direction: column-reverse;
  }

  .action-button {
    width: 100%;
    min-width: auto;
  }
}
</style>