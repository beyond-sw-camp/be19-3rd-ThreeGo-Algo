<template>
  <div class="banner">
    <PageInfoBanner
      title="스터디원 관리"
      subtitle="멤버를 스터디에서 제외하거나, 스터디장 권한을 다른 멤버에게 위임할 수 있습니다."
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