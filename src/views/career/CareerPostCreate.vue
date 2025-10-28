<template>
    <div class="company-post-create-page">
        <div class="form-wrapper">
            <h2 class="page-title">기업 정보 공유 게시글 작성</h2>

            <!-- 제목 입력 -->
            <div class="form-group">
                <label class="form-label">제목 <span class="required">*</span></label>
                <input v-model="formData.title" type="text" class="form-input" placeholder="제목을 입력해주세요" />
            </div>

            <!-- 필수사항 -->
            <div class="form-group">
                <label class="form-label">필수사항 <span class="required">*</span></label>
                <div class="required-row">
                    <CustomSelect :options="companyOptions" placeholder="기업 선택" icon="company.svg"
                        :onSelect="val => formData.company = val" />
                    <CustomSelect :options="yearOptions" placeholder="년도 선택" icon="calendar.svg"
                        :onSelect="val => formData.year = val" />
                </div>
            </div>

            <!-- 인증사진 첨부 -->
            <div class="form-group">
                <label class="form-label">인증사진 첨부</label>

                <p class="upload-hint">
                    코딩테스트 응시 혹은 면접 참여를 증명할 수 있는 이미지(예: 합격 문자 등)를 첨부해주세요.<br />
                    인증 이미지는 관리자 확인 후 <span>10포인트</span>가 지급됩니다.
                </p>

                <!-- 업로드 영역 -->
                <div class="upload-row">
                    <input ref="fileInput" type="file" accept="image/*" class="hidden-input"
                        @change="handleFileUpload" />

                    <!-- 업로드 버튼 -->
                    <CustomButton variant="secondary" height="sm" icon="/src/assets/icons/link.svg"
                        @click="triggerFileInput">인증사진 업로드</CustomButton>

                    <!-- 파일명 + X 버튼 -->
                    <div v-if="fileName" class="uploaded-file">
                        <span class="file-name">{{ fileName }}</span>
                        <button class="remove-btn" @click="removeFile">×</button>
                    </div>
                </div>

                <div class="file-limit">※ 1MB 이하의 이미지 파일만 업로드할 수 있습니다.</div>

                <!-- 인증 확인 체크박스 -->
                <div v-if="formData.file" class="confirm-check">
                    <input type="checkbox" id="confirmCheck" v-model="formData.confirmed" class="check-input" />
                    <label for="confirmCheck" class="check-label">
                        인증 완료 후에는 게시글 수정 및 삭제가 제한됩니다. 본 내용을 확인하셨습니까?
                    </label>
                </div>
            </div>


            <!-- 본문 -->
            <div class="form-group">
                <label class="form-label">본문 <span class="required">*</span></label>
                <div ref="editorContainer" class="editor-container"></div>
            </div>

            <!-- 버튼 그룹 -->
            <div class="button-group">
                <CustomButton variant="secondary" @click="handlePrevious">이전</CustomButton>
                <CustomButton variant="primary" @click="handleSubmit">완료</CustomButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from '@/components/common/CustomButton.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import { createCareerPost } from '@/api/careerApi'

const router = useRouter()
let $ = null

// 데이터
const formData = reactive({
    title: '',
    company: '',
    year: '',
    content: '',
    file: null,
    confirmed: false,
})

const fileInput = ref(null)
const fileName = ref('')

// 옵션
const companyOptions = ['네이버', '카카오', '삼성전자', 'LG전자', '기타'].map(c => ({ label: c, value: c }))
const yearOptions = ['2025', '2024', '2023'].map(y => ({ label: y, value: y }))

// 파일 업로드
const triggerFileInput = () => fileInput.value.click()
const handleFileUpload = e => {
    const file = e.target.files[0]
    if (!file) return

    // 10MB 초과 시 경고 및 리셋
    const maxSize = 1024 * 1024 // 1MB
    if (file.size > maxSize) {
        alert('1MB 이하의 이미지 파일만 업로드할 수 있습니다.')
        e.target.value = '' // 선택 초기화
        return
    }

    fileName.value = file.name
    formData.file = file
}


const removeFile = () => {
    formData.file = null
    fileName.value = ''
    formData.confirmed = false
}

// Summernote 초기화
const editorContainer = ref(null)
const initializeSummernote = () => {
    if (!window.jQuery || !window.jQuery.fn.summernote) return
    $ = window.jQuery
    $(editorContainer.value).summernote({
        placeholder: '내용을 작성해주세요',
        height: 400,
        lang: 'ko-KR',
        toolbar: [
            ['style', ['bold', 'underline', 'clear']],
            ['font', ['fontname', 'fontsize', 'color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
            ['view', ['fullscreen', 'codeview']]
        ],
        callbacks: {
            onChange: (contents) => (formData.content = contents)
        }
    })
}

// 검증
const validateForm = () => {
    if (!formData.title.trim()) return alert('제목을 입력해주세요.'), false
    if (!formData.company) return alert('기업을 선택해주세요.'), false
    if (!formData.year) return alert('년도를 선택해주세요.'), false
    if (!formData.content.trim() || formData.content === '<p><br></p>')
        return alert('본문을 작성해주세요.'), false
    if (formData.file && !formData.confirmed)
        return alert('인증 확인란을 체크해주세요.'), false

    return true
}

const handleSubmit = async () => {
    if (!validateForm()) return

    try {
        const data = new FormData()
        data.append('title', formData.title)
        data.append('company', formData.company)
        data.append('year', formData.year)
        data.append('content', formData.content)
        if (formData.file) data.append('image', formData.file)

        const res = await createCareerPost(data)

        alert('게시글이 성공적으로 등록되었습니다!')
        router.push(`/career-info/${res.id || ''}`) // 등록 후 상세 페이지로 이동
    } catch (err) {
        console.error('게시글 등록 실패:', err)
        alert('게시글 등록 중 오류가 발생했습니다.')
    }
}


const handlePrevious = () => router.push('/career-info')

// Mount
onMounted(() => {
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
    } else initializeSummernote()
})

onBeforeUnmount(() => {
    if ($ && editorContainer.value) $(editorContainer.value).summernote('destroy')
})
</script>

<style scoped>
.company-post-create-page {
    display: flex;
    justify-content: center;
    background: #fff;
    padding: 60px 20px;
}

.form-wrapper {
    width: 100%;
    max-width: 960px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.page-title {
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-label {
    font-size: 15px;
    font-weight: 600;
    color: #333;
}

.required {
    color: #dc3545;
}

.file-limit {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    font-weight: 300;
    color: #999;
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 15px;
}

.required-row {
    display: flex;
    gap: 12px;
}

.upload-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.upload-hint {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
}

.upload-hint span {
    color: #0aa2eb;
    font-weight: 600;
}

.hidden-input {
    display: none;
}

.file-name {
    font-size: 14px;
    color: #555;
}

.editor-container {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    overflow: hidden;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.uploaded-file {
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 6px 10px;
}

.file-name {
    font-size: 14px;
    color: #333;
}

.remove-btn {
    background: none;
    border: none;
    color: #999;
    font-size: 18px;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    transition: color 0.2s;
}

.remove-btn:hover {
    color: #ff2b2b;
}

.confirm-check {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: 10px;
}

.check-input {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.check-label {
    font-size: 13px;
    font-weight: 400;
    color: #ff2b2b;
    line-height: 1.6;
    cursor: pointer;
}

:deep(.note-editor) {
    border: none;
    font-family: 'Noto Sans KR', sans-serif;
}

:deep(.note-toolbar) {
    background: #fafafa;
    border-bottom: 1px solid #eee;
}
</style>
