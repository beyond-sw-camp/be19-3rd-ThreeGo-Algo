<template>
  <div class="roadmap-list">
    <RoadmapItem
      v-for="(item, index) in roadmaps"
      :key="item.id"
      :id="item.id"
      :index="index"
      :order="item.order"
      :title="item.title"
      :isActive="Number(currentRoute.params.roadmapId) === item.id"
      @click="onClick(item.id)"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import RoadmapItem from '@/components/algo/RoadmapListItem.vue';

const router = useRouter();
const currentRoute = useRoute();

const roadmaps = [
  { id: 1, order: 1, title: '자료구조' },
  { id: 2, order: 1, title: '정렬' },
  { id: 3, order: 2, title: '탐색' },
  { id: 4, order: 10, title: 'DP(동적 계획법)' },
  { id: 5, order: 13, title: '그래프' }
]

function onClick(id) {
  console.log('Clicked roadmap with id:', id);
}
</script>

<style scoped>
.roadmap-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>