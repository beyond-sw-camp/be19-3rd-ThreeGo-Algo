<template>
  <div class="board-summary-card">
    <div class="card-header">
      <div class="header-left">
        <span class="header-title">게시판</span>
      </div>
      <button class="more-button" @click="goToBoard">
        + 더 보기
      </button>
    </div>

    <div class="board-list">
      <div v-if="posts.length === 0" class="no-posts">
        게시물이 없습니다
      </div>
      <div 
        v-else
        v-for="post in posts" 
        :key="post.id"
        class="board-item"
        @click="goToPost(post.id)"
      >
        <span class="post-title">{{ truncateTitle(post.title) }}</span>
        <span class="post-date">{{ post.date }}</span>
      </div>
    </div>
    <CustomButton height="md" @click="goToWrite">게시글 작성하기</CustomButton>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  posts: {
    type: Array,
    required: true,
    default: () => []
  }
})

const truncateTitle = (title) => {
  return title.length > 15 ? title.substring(0, 15) + '...' : title
}

const goToBoard = () => router.push('/study/board')
const goToPost = (postId) => router.push(`/study/board/${postId}`)
const goToWrite = () => router.push('/study/board/new')
</script>

<style scoped>
.board-summary-card {
  width: 315px;
  height: 250px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #DBF4FF;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 8px;
  border-left: 4px solid #0AA2EB;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.more-button {
  background: none;
  border: none;
  color: #0AA2EB;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.more-button:hover {
  opacity: 0.8;
}

.board-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  margin-bottom: 16px;
}

.board-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.board-item:hover .post-title {
  color: #0AA2EB;
}

.post-title {
  font-size: 14px;
  color: #383838;
  flex: 1;
  transition: color 0.2s;
}

.post-date {
  font-size: 12px;
  color: #CFCFCF;
  flex-shrink: 0;
  margin-left: 8px;
}

.write-button {
  width: 100%;
  padding: 12px;
  background-color: #0AA2EB;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.write-button:hover {
  background-color: #0891d1;
}

.no-posts {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #CFCFCF;
  font-size: 14px;
  height: 100%;
}
</style>
