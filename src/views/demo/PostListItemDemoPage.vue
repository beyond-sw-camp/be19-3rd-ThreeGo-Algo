<template>
  <div class="post-list">
    <PostListItem
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :nickname="post.nickname"
      :rankName="post.rankName"
      :createdAt="post.createdAt"
      :isVerified="post.isVerified"
      :likeCount="post.likeCount"
      :commentCount="post.commentCount"
      :peopleCount="post.peopleCount"
      :status="post.status"
    />
  </div>
</template>

<script setup>
import PostListItem from '@/components/common/PostListItem.vue';

const posts = [
  // 기업별 정보 공유 게시물
  {
    id: 1,
    title: '현대오토에버 코테 후기 공유합니다 (문제 복기)',
    nickname: '라이언',
    rankName: '코잘알',
    createdAt: '2025.10.13',
    status: 'APPROVED',
    likeCount: 120,
    commentCount: 15
  },
  {
    id: 2,
    title: 'SSAFY 코테 후기 정리!',
    nickname: '어피치',
    rankName: '코좀알',
    createdAt: '2025.10.10',
    likeCount: 120,
    commentCount: 15,
    peopleCount: 50
  },
  // 스터디 그룹 공간 게시물
  {
    id: 3,
    title: '안녕하세요!! 앞으로 남은 기간 재밌게 공부해요',
    nickname: '라이언',
    rankName: '코뉴비',
    createdAt: '2025.10.13',
    commentCount: 10
  },
  // 코딩 풀이 게시물
  {
    id: 4,
    title: '입출력의 시작, 두 수를 더해보자 (A+B 풀이)',
    nickname: '라이언라이언',
    rankName: '코신',
    createdAt: '2025.10.25',
    likeCount: 10,
    commentCount: 1
  },
  
]
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>