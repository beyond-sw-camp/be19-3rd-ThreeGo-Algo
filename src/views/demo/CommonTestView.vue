<template>
  <div class="common-test-container">
    <h1>🧩 공통 컴포넌트 미리보기</h1>
    <p class="desc">Element Plus + Custom Components Preview</p>

    <el-row :gutter="20">
      <!-- MyProfileDropdown -->
      <el-col :span="12">
        <el-card shadow="hover" class="preview-card">
          <template #header>
            <div class="card-header">
              <el-icon><User /></el-icon>
              <span>MyProfileDropdown</span>
            </div>
          </template>
          <div class="preview-area">
            <MyProfileDropdown
              user-name="홍길동"
              @mypage="handleMyPage"
              @logout="handleLogout"
            />
          </div>
        </el-card>
      </el-col>

      <!-- BackButton -->
      <el-col :span="12">
        <el-card shadow="hover" class="preview-card">
          <template #header>
            <div class="card-header">
              <el-icon><ArrowLeft /></el-icon>
              <span>BackButton</span>
            </div>
          </template>
          <div class="preview-area">
            <BackButton text="목록으로 돌아가기" />
            <BackButton text="스터디 목록" to="/study" class="mt-2" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <!-- SearchBar -->
      <el-col :span="24">
        <el-card shadow="hover" class="preview-card">
          <template #header>
            <div class="card-header">
              <el-icon><Search /></el-icon>
              <span>SearchBar</span>
            </div>
          </template>
          <div class="preview-area">
            <SearchBar
              placeholder="기업명, 제목을 검색해보세요"
              button-text="검색"
              @search="onSearch"
            />
            <div v-if="lastKeyword" class="search-result">
              <el-divider />
              <p>최근 검색어: <strong>{{ lastKeyword }}</strong></p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 🆕 Markdown Editor -->
    <el-row :gutter="20" class="mt-4">
      <el-col :span="24">
        <el-card shadow="hover" class="preview-card">
          <template #header><span>Markdown Editor (with S3 Upload)</span></template>
          <MarkdownEditor v-model="mdContent" />
          <el-divider />
          <h4>미리보기:</h4>
          <div class="markdown-preview">
            <pre>{{ mdContent }}</pre>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MyProfileDropdown, BackButton, SearchBar } from '@/components/common'
import { User, ArrowLeft, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import MarkdownEditor from '@/components/common/MarkdownEditor.vue'

const router = useRouter()
const lastKeyword = ref('')
const mdContent = ref('# 안녕하세요!\n여기에 **마크다운**을 작성해보세요 ✨')

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
.markdown-preview {
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  white-space: pre-wrap;
}
</style>
