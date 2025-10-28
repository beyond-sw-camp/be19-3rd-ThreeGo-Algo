<template>
  <div class="post-detail-page">
    <div class="header-section">
      <p class="study-recruit-main">스터디 모집 게시판</p>
      <div class="back-button-wrapper">
        <BackButton text="목록으로 돌아가기" to="/study/board" />
      </div>

      <div class="divider"></div>

    </div>

    <div class="post-wrapper">
      <h2 class="post-title">{{ post.title }}</h2>
      
      <div class="post-meta">
        <span>{{ post.memberNickname }}</span>
        <span>{{ post.createdAt }}</span>
      </div>
      
      <div class="post-content" v-html="post.content"></div>
      
      <div class="divider">
        <span>
          댓글 <span style="color: #0AA2EB;">{{ post.commentCount }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CustomButton from '@/components/common/CustomButton.vue'
import coreApi from '@/api/coreApi'
import BackButton from '@/components/common/BackButton.vue'

const router = useRouter()
const route = useRoute()

const post = ref({
  title: '',
  content: '',
  memberNickname: '',
  createdAt: '',
  commentCount: 0
})

onMounted(async () => {
  const postId = route.params.id
  
  try {
    const response = await coreApi.get(`/study/posts/${postId}`)
    post.value = response.data
  } catch (error) {
    console.error('게시글 조회 실패:', error)
    alert('게시글을 불러올 수 없습니다.')
  }
})

const handleBack = () => router.push('/study/board')
</script>

<style scoped>
.post-detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 60px 20px;
}

.header-section {
  width: 100%;
  max-width: 960px;
  margin-bottom: 24px;
}

.study-recruit-main {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.back-button-wrapper {
  margin-bottom: 12px;
}

.post-wrapper {
  width: 100%;
  max-width: 960px;
}

.post-title {
  font-size: 26px;
  font-weight: 700;
  color: #1E0909;
  margin-bottom: 16px;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #868D96;
  margin-bottom: 24px;
  padding-bottom: 16px;
}

.post-content {
  min-height: 300px;
  line-height: 1.8;
  color: black;
  margin-bottom: 32px;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.post-content :deep(pre) {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

.post-content :deep(code) {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.5;
}

.divider {
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  font-size: 14px;
  color: #383838;
  font-weight: 700;
  font-size: 16px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>