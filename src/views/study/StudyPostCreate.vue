<template>
  <div class="company-post-create-page">
    <div class="form-wrapper">
      <h2 class="page-title">게시글 작성</h2>

      <!-- 제목 입력 -->
      <div class="form-group">
        <label class="form-label">제목 <span class="required">*</span></label>
        <input v-model="formData.title" type="text" class="form-input" placeholder="제목을 입력해주세요" />
      </div>

      <!-- 본문 -->
      <div class="form-group">
        <label class="form-label">본문 <span class="required">*</span></label>
        <PostEditor v-model="formData.content" />
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomButton from '@/components/common/CustomButton.vue'
import PostEditor from '@/components/common/PostEditor.vue'
import coreApi from '@/api/coreApi'

const studyId = ref(null)
const router = useRouter()

onMounted(() => {
  studyId.value = sessionStorage.getItem('studyId')
})

const formData = reactive({
  title: '',
  content: '',
  file: null
})

const validateForm = () => {
  if (!formData.title.trim()) return alert('제목을 입력해주세요.'), false
  if (!formData.content.trim()) return alert('본문을 작성해주세요.'), false
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try { const data = new FormData()
    data.append('title', formData.title)
    data.append('content', formData.content)

    await coreApi.post(`/study/${studyId.value}/posts`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    alert('게시글이 등록되었습니다!')
    router.push('/study/board')
  } catch (error) {
    console.error('게시글 등록 실패:', error)
    alert('게시글 등록 중 오류가 발생했습니다.')
  }
}

const handlePrevious = () => router.push('/study/board')
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

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 15px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>