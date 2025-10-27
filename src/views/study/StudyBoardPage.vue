<template>
  <div class="banner">
    <PageInfoBanner
      title="성장의 모든 순간을 기록하고 공유해요!"
      subtitle="팀원들과 자유롭게 의견을 나누고 지식을 쌓아가는 공간입니다."
      :image="bannerBoard"
      bgColor="#F0FAFF"
    />

  </div>
</template>

<script setup>
import PageInfoBanner from '@/components/common/PageInfoBanner.vue';
import bannerBoard from '@/assets/images/study_blog_banner_board.png';
</script>

<style scoped>
.banner {
  margin-top: 20px;
}

.banner :deep(.banner-subtitle) {
  white-space: pre-line;
}
</style>