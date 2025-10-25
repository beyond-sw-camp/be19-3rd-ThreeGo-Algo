<template>
  <div class="common-test-container">
    <h1>🧩 공통 컴포넌트 미리보기</h1>
    <p class="desc">Element Plus + Custom Components Preview</p>

          <div class="preview-area">
            <TabTitle title="알고리즘 학습" />
            <TabTitle title="기업별 정보 공유 게시판" />
          </div>
          <br>
          <div class="preview-area">
            <MyProfileDropdown
              user-name="홍길동"
              @mypage="handleMyPage"
              @logout="handleLogout"
            />
          </div>
          <br>
          <div class="preview-area">
            <BackButton text="목록으로 돌아가기" />
            <BackButton text="스터디 목록" to="/study" class="mt-2" />
          </div>
          <br>

          <div class="preview-area" style="width: 40%;">
            <SearchBar />
          </div>
          <br>

        </div>
</template>


<script setup>
import { ref } from 'vue'
import { MyProfileDropdown, BackButton, SearchBar } from '@/components/common'
import { User, ArrowLeft, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import TabTitle from '@/components/common/TabTitle.vue'

const router = useRouter()
const lastKeyword = ref('')

const onSearch = (keyword) => {
  lastKeyword.value = keyword
  ElMessage.success(`검색어: ${keyword}`)
}

const handleMyPage = () => {
  ElMessage.info('마이페이지로 이동')
  // router.push('/mypage')
}

const handleLogout = () => {
  ElMessage.success('로그아웃 되었습니다')
  // localStorage.removeItem('accessToken')
  // router.push('/login')
}
</script>

<style scoped>
.common-test-container {
  max-width: 1000px;
  margin: 60px auto;
  padding: 20px;
  background: #fdfdfd;
}
h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}
.desc {
  color: #888;
  margin-bottom: 30px;
}
.preview-card {
  border-radius: 16px;
  transition: 0.3s;
}
.preview-card:hover {
  transform: translateY(-3px);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #333;
}
.preview-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 4px;
}
.search-result {
  margin-top: 8px;
  color: #444;
}
.mt-4 {
  margin-top: 20px;
}
.mt-2 {
  margin-top: 8px;
}

</style>
