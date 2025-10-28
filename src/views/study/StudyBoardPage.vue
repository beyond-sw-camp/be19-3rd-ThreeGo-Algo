<template>
  <div class="banner">
    <PageInfoBanner
      title="성장의 모든 순간을 기록하고 공유해요!"
      subtitle="팀원들과 자유롭게 의견을 나누고 지식을 쌓아가는 공간입니다."
      :image="bannerBoard"
      bgColor="#F0FAFF"
    />

    <div class="content-container">
      <div class="top-controls">
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
            @select="handleSelect" 
          />
        </div>

        <div class="create-btn">
          <CustomButton height="sm" @click="handleCreatePost">+ 게시글 작성하기</CustomButton>
        </div>
      </div>

      <PostCount :count="filteredPosts.length" label="게시물" class="post-count" />

      <div class="post-list">
        <PostListItem
          v-for="post in filteredPosts"
          :key="`${post.id}`"
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

const parseDate = (dateString) => {
  if (!dateString) return new Date(0)
  const isoString = dateString.replace(' ', 'T')
  const date = new Date(isoString)
  return isNaN(date.getTime()) ? new Date(0) : date
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
    case 'latest': // 최신순
      result.sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt))
      break
    case 'oldest': // 오래된순
      result.sort((a, b) => parseDate(a.createdAt) - parseDate(b.createdAt))
      break
    case 'comment': // 댓글 많은 순
      result.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
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

.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  max-width: 1100px;
}

.search-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-bar {
  width: 400px;
  flex-shrink: 0;
}

.create-btn {
  flex-shrink: 0;
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
  padding-bottom: 50px;
}
</style>