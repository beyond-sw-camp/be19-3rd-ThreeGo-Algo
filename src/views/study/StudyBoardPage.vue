<template>
  <div class="banner">
    <PageInfoBanner
      title="성장의 모든 순간을 기록하고 공유해요!"
      subtitle="팀원들과 자유롭게 의견을 나누고 지식을 쌓아가는 공간입니다."
      :image="bannerBoard"
      bgColor="#F0FAFF"
    />

    <div class="content-container">
      <div class="search-controls">
        <SearchBar 
          :key="searchBarKey"
          v-model="searchKeyword" 
          placeholder="제목을 검색하세요" 
          buttonText="검색" 
          @search="handleSearch" 
          class="search-bar"
        />
        <CustomSelect 
          :key="selectKey"
          :options="filterOptions" 
          placeholder="최신순" 
          :onSelect="handleSelect" 
        />
        <p class="reset-button" @click="handleReset">초기화</p>
        <CustomButton height="sm" @click="handleCreatePost">+ 게시물 작성하기</CustomButton>
      </div>

      <PostCount :count="filteredPosts.length" label="게시물" class="post-count" />

      <div class="post-list">
        <PostListItem
          v-for="post in filteredPosts"
          :key="post.id"
          :id="post.id"
          :title="post.title"
          :nickname="post.memberNickname"
          rankName="코뉴비"
          :createdAt="formatDate(post.createdAt)"
          :commentCount="post.commentCount"
          @click="handlePostClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import bannerBoard from '@/assets/images/study_blog_banner_board.png'
import SearchBar from '@/components/common/SearchBar.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import PostListItem from '@/components/common/PostListItem.vue'
import coreApi from '@/api/coreApi'
import PostCount from '@/components/common/PostCount.vue'

const studyId = ref(null)
const router = useRouter()
const searchKeyword = ref('')
const posts = ref([])
const selectedFilter = ref('latest')
const searchBarKey = ref(0)
const selectKey = ref(0)

onMounted(async () => {
  studyId.value = sessionStorage.getItem('studyId')
  await fetchPosts()
})

const fetchPosts = async () => {
  try {
    const response = await coreApi.get(`/study/${studyId.value}/posts`)
    posts.value = response.data
  } catch (error) {
    console.error('게시글 조회 실패:', error)
    alert('게시글을 불러올 수 없습니다.')
  }
}

const formatDate = (dateString) => {
  return dateString.split(' ')[0].replace(/-/g, '.')
}

const filterOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된 순' },
  { value: 'comment', label: '댓글 많은 순' },
]

const filteredPosts = computed(() => {
  let result = [...posts.value]

  if (searchKeyword.value.trim()) {
    result = result.filter(post => 
      post.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }

  // 정렬
  switch (selectedFilter.value) {
    case 'latest':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'oldest':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'comment':
      result.sort((a, b) => b.commentCount - a.commentCount)
      break
  }

  return result
})

const handleSearch = () => {
  console.log('검색:', searchKeyword.value)
}

const handleSelect = (option) => {
  selectedFilter.value = option.value
  console.log('필터 선택:', option)
}

const handleReset = () => {
  searchKeyword.value = ''
  selectedFilter.value = 'latest'
  searchBarKey.value++
  selectKey.value++
  console.log('초기화')
}

const handleCreatePost = () => {
  router.push('/study/board/new')
}

const handlePostClick = (postId) => {
  router.push(`/study/board/post/${postId}`)
}
</script>

<style scoped>
.banner {
  margin-top: 20px;
}

.banner :deep(.banner-subtitle) {
  white-space: pre-line;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}

.search-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;        
  width: 50%;
  max-width: 1100px;
}

.search-bar {
  width: 400px;
  flex-shrink: 0;
}

.reset-button {
  font-size: 14px;
  color: #666;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
  margin: 0;
}

.reset-button:hover {
  color: #333;
}

.post-count {
  width: 50%;
  max-width: 1100px;
  margin-top: 40px;
}

.post-list {
  width: 50%;
  max-width: 1100px;
  margin-top: 10px;
}
</style>