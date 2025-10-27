<template>
  <div>
    <MyBanner title="스터디 그룹 공간" />
    <StudyCard
      :id=1
      name="카카오 코테 스터디"
      startDate="2025.10.13"
      endDate="2025.10.31"
      nickname="멋쟁이토마토"
      rankName="코좀알"
      :memberCount="5"
    />
  </div>
</template>

<script setup>
import MyBanner from '@/components/mypage/MyBanner.vue';
import StudyCard from '@/components/mypage/StudyCard.vue';

</script>

<style scoped>

</style>