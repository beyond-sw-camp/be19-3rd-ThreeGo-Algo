<template>
  <div class="study-delete-page">
    <!-- 좌측 사이드바 -->
    <aside class="sidebar">
      <StudyProfile />
      <StudySetting :userRole="userRole" :currentRoute="currentRoute" />
    </aside>

    <main class="main-content">

      <Warning class="warning-box" />

      <CloseStudy
        title="스터디 해체 전 주의사항"
        color="#FF2B2B"
        buttonText="스터디 영구 해체하기"
        buttonVariant="danger"
        @action="confirmDelete"
      >
        <template #content>
          <p>🔸 스터디 해체 시, 모든 <span class="highlight-danger">스터디 게시물 / 로드맵 / 마일스톤 데이터</span>가 삭제됩니다.</p>
          <p>🔸 해체 이후에는 <span class="highlight-danger">복구가 불가능</span>하니 신중히 결정해주세요.</p>
          <p>🔸 스터디원들에게 해체 사실이 자동으로 <span class="highlight-primary">알림</span>으로 전송됩니다.</p>
        </template>
      </CloseStudy>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudySetting from '@/components/study/StudySetting.vue'
import Warning from '@/components/study/Warning.vue'
import CloseStudy from '@/components/study/CloseStudy.vue'

const route = useRoute()
const router = useRouter()

const userRole = ref('leader')
const currentRoute = computed(() => route.path)

const confirmDelete = () => {
  if (confirm('정말로 스터디를 해체하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
    alert('스터디가 성공적으로 해체되었습니다.')
    router.push('/home')
  }
}
</script>

<style scoped>
.study-delete-page {
  display: flex;
  gap: 20px;
  padding: 40px 80px;
}

.sidebar {
  width: 200px;
  margin-left: 150px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-content {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.warning-box {
  width: 80%;
  max-width: 900px;
  margin-top: 16px;
}

.close-study-box {
  width: 80%;
  max-width: 900px;
}
</style>
