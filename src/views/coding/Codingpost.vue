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
        >{{ selectedProblem.title || '두 수의 합' }}</CustomButton>
    </div>

    <!-- 제목 입력 -->
    <div class="input-section">
        <span class="label">
            제목 
            <span class="required">*</span>
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
        <span class="label"> 본문 
            <span class="required">*</span>
        </span>
        <div class="spacer"></div>
        <p class="hint">
            풀이를 등록하면 바로
        <strong class="ai-feedback">AI가 피드백을 제공</strong>합니다.<br />
        복잡도, 좋은 점, 개선할 점까지 한눈에 확인하세요. </p>
        <div :class="{ 'error-border': errors.content }">
            <MarkdownEditor ref="editorRef" />
        </div>
        <p v-if="errors.content" class="error-message">{{ errors.content }}</p>
    </div>

    <!-- 하단 버튼 -->
    <div class="bottom-buttons">
        <CustomButton
            variant="gray2"
            width="150px"
            height="md"
            @click="handleBack">
        이전
        </CustomButton>
        <CustomButton
            variant="primary"
            width="150px"
            height="md"
            @click="handleSubmit" >
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

<script setup>
import { ref, reactive } from 'vue'
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

/* 에러 상태 */
const errors = reactive({
    title: '',
    content: ''
})

/* 유효성 검사 함수 */
const validateForm = () => {
    let isValid = true
    
    // 에러 초기화
    errors.title = ''
    errors.content = ''
    
    // 제목 검사
    if (!title.value || title.value.trim() === '') {
        errors.title = '제목을 입력해주세요.'
        isValid = false
    }
    
    // 본문 검사
    const content = editorRef.value?.getContent()
    if (!content || content.trim() === '' || content === '<p><br></p>') {
        errors.content = '본문을 입력해주세요.'
        isValid = false
    }
    
    return isValid
}

/* 버튼 핸들러 */
const handleBack = () => window.history.back()

const handleSelectProblem = () => alert('문제 선택 모달 띄우기 (구현 예정)')

const handleSubmit = () => {
    if (validateForm()) {
        isPopupVisible.value = true
    } else {
        // 에러가 있는 첫 번째 필드로 스크롤
        const errorElement = document.querySelector('.error-message')
        if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }
}

/* 실제 등록 로직 */
const submitPost = () => {
    const content = editorRef.value?.getContent()
    console.log('제목:', title.value)
    console.log('문제:', selectedProblem.value)
    console.log('본문:', content)
    
    // TODO: 백엔드 API 호출
    // try {
    //     await axios.post('/coding-problem/posts', {
    //         title: title.value,
    //         problemId: selectedProblem.value.id,
    //         content: content
    //     })
    //     alert('게시물이 성공적으로 등록되었습니다.')
    //     router.push('/coding-problem-list')
    // } catch (error) {
    //     console.error('등록 실패:', error)
    //     alert('게시물 등록에 실패했습니다.')
    // }
    
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

/* 에러 메시지 */
.error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 0;
    font-weight: 500;
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 에러 테두리 */
.error-border :deep(input),
.error-border :deep(textarea) {
    border: 2px solid #e74c3c !important;
}

.error-border :deep(.note-editor) {
    border: 2px solid #e74c3c !important;
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