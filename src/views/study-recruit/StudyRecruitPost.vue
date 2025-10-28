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
            variant="secondary"
            height="md"
            @click="handlePrevious"
            class="action-button"
          >
            이전
          </CustomButton>
          <CustomButton
            variant="primary"
            height="md"
            @click="handleSubmit"
            class="action-button"
          >
            완료
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TabTitle from '@/components/common/TabTitle.vue'
import coreApi from '@/api/coreApi'
import DateRangeButton from '@/components/common/DateRangeButton.vue'
import CustomButton from '@/components/common/CustomButton.vue'

const router = useRouter()
const route = useRoute()

// 현재 모드 (등록 / 수정)
const mode = ref(route.query.mode || 'create')   // 'create' or 'edit'
const postId = ref(route.query.id || null)

// jQuery & Summernote 관련
let $ = null
const editorContainer = ref(null)

// 폼 데이터
const formData = reactive({
  title: '',
  interviewType: '',
  memberCount: null,
  startDate: '',
  endDate: '',
  content: ''
})

// Summernote 초기화
const initializeSummernote = () => {
  if (!window.jQuery || !window.jQuery.fn.summernote) {
    console.error('❌ Summernote not loaded')
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

  // ✏️ 수정 모드일 때 초기 내용 반영
  if (mode.value === 'edit' && formData.content) {
    $(editorContainer.value).summernote('code', formData.content)
  }
}

// ✅ 폼 검증
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

// ✅ 등록/수정 공용 핸들러
const handleSubmit = async () => {
  if (!validateForm()) return

  const postData = {
    title: formData.title,
    content: formData.content,
    capacity: formData.memberCount,
    startDate: formData.startDate,
    endDate: formData.endDate,
  }

  try {
    let response
    if (mode.value === 'edit' && postId.value) {
      // ✏️ 수정
      response = await coreApi.put(`/study-recruit/posts/${postId.value}`, postData)
      alert('스터디 모집글이 수정되었습니다!')
      router.push(`/study-recruit/${postId.value}`)
    } else {
      // 🆕 등록
      response = await coreApi.post('/study-recruit/posts', postData)
      alert('스터디 모집글이 등록되었습니다!')
      router.push('/study-recruit')
    }

    console.log('✅ 성공:', response.data)
  } catch (error) {
    console.error('❌ 등록/수정 실패:', error.response?.data || error.message)
    alert('등록 또는 수정 중 오류가 발생했습니다.')
  }
}

// ✅ 뒤로가기
const handlePrevious = () => {
  router.push('/study-recruit')
}

// ✅ 수정 모드일 경우 기존 게시글 불러오기
const fetchPostDetail = async () => {
  if (mode.value !== 'edit' || !postId.value) return

  try {
    const response = await coreApi.get(`/study-recruit/posts/${postId.value}`)
    const data = response.data

    formData.title = data.title
    formData.memberCount = data.capacity
    formData.startDate = data.startDate
    formData.endDate = data.endDate
    formData.content = data.content

    console.log('✏️ 수정 모드 데이터 로드 완료:', formData)

    // summernote가 로드된 후 내용 반영
    setTimeout(() => {
      if (window.jQuery && $(editorContainer.value)) {
        $(editorContainer.value).summernote('code', formData.content)
      }
    }, 500)
  } catch (error) {
    console.error('❌ 수정 모드 데이터 로드 실패:', error)
  }
}

// ✅ Summernote 로드 & 초기화
onMounted(async () => {
  // CSS 추가
  if (!document.querySelector('#summernote-css')) {
    const link = document.createElement('link')
    link.id = 'summernote-css'
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css'
    document.head.appendChild(link)
  }

  const loadSummernote = () => {
    const summernoteScript = document.createElement('script')
    summernoteScript.src = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js'
    summernoteScript.onload = () => {
      const langScript = document.createElement('script')
      langScript.src = 'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/lang/summernote-ko-KR.min.js'
      langScript.onload = () => {
        initializeSummernote()
        fetchPostDetail() // ✏️ 수정 모드일 경우 데이터 로드
      }
      document.body.appendChild(langScript)
    }
    document.body.appendChild(summernoteScript)
  }

  if (!window.jQuery) {
    const jqueryScript = document.createElement('script')
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
    jqueryScript.onload = loadSummernote
    document.body.appendChild(jqueryScript)
  } else {
    loadSummernote()
  }
})

// ✅ 언마운트 시 Summernote 해제
onBeforeUnmount(() => {
  if (window.jQuery && editorContainer.value) {
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