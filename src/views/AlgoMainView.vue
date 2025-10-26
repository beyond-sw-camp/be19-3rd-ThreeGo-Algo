<template>
    <div class="algo-main-container">
    <TabTitle title="알고리즘 학습" />
    <PageInfoBanner title="알고리즘, 어디서부터 공부해야 할지 모르겠다면?" subtitle="기초부터 실전까지, 방향 있는 알고리즘 학습 로드맵을 따라가면 어느새 코잘알 🐨"
        :image="bannerAlgo" bgColor="#F0FAFF" />

    <div class="roadmap-container">
        <!-- 왼쪽 로드맵 리스트 -->
        <div class="roadmap-sidebar">
            <span class="sidebar-title">학습 로드맵</span>
            <hr />
            <RoadmapItem v-for="(item, index) in roadmaps" :key="item.id" :index="index" :id="item.id" :order="item.order" :title="item.title"
                :isActive="currentRoadmapId === item.id" @click="clickRoadmap(item.id)" />
        </div>

        <!-- 오른쪽 게시물 리스트 -->
        <div class="roadmap-content">
            <h2 class="roadmap-step-title">
                Step {{ currentIndex + 1 }} <span>{{ currentRoadmap.title }}</span>
            </h2>
            <p class="roadmap-step-desc">
                &nbsp;&nbsp;{{ currentRoadmap.desc }}
            </p>

            <div class="algo-list">
                <AlgoPostItem v-for="post in currentRoadmap.posts" :key="post.id" :id="post.id" :title="post.title"
                    :quizIds="post.quizIds" :solvedQuizIds="post.solvedQuizIds" @click="clickPost(post.id)" />
            </div>
            <span class="point-info">💡 학습 후 퀴즈를 맞히면 <span>2 포인트</span>를 얻을 수 있어요!</span>

            <div class="roadmap-nav">
                <CustomButton width="120px" :disabled="isFirst" @click="goPrev">이전 로드맵</CustomButton>
                <CustomButton width="120px" :disabled="isLast" @click="goNext">다음 로드맵</CustomButton>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import bannerAlgo from '@/assets/images/banner-algo.png';
import PageInfoBanner from '@/components/common/PageInfoBanner.vue';
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RoadmapItem from '@/components/algo/RoadmapListItem.vue';
import AlgoPostItem from '@/components/algo/AlgoPostListItem.vue';
import TabTitle from '@/components/common/TabTitle.vue';
import CustomButton from '@/components/common/CustomButton.vue';

// 로드맵 더미 데이터
const roadmaps = [
    {
        id: 1,
        order: 1,
        title: '자료구조',
        desc: '스택, 큐, 리스트와 같은 기본 자료구조를 이해하는 것은 알고리즘 학습의 출발점입니다.',
        posts: [
            { id: 1, title: '큐 (Queue)', quizIds: [1, 2, 3], solvedQuizIds: [1] },
            { id: 2, title: '스택 (Stack)', quizIds: [4, 5, 6], solvedQuizIds: [4, 5] },
            { id: 3, title: '연결리스트 (Linked List)', quizIds: [7, 8], solvedQuizIds: [] }
        ]
    },
    {
        id: 12,
        order: 2,
        title: '정렬',
        desc: '선택, 버블, 삽입 정렬 등 기초 정렬 알고리즘을 학습해보세요.',
        posts: [
            { id: 4, title: '선택 정렬 (Selection Sort)', quizIds: [9, 10], solvedQuizIds: [9] },
            { id: 5, title: '삽입 정렬 (Insertion Sort)', quizIds: [11], solvedQuizIds: [] }
        ]
    },
    {
        id: 13,
        order: 13,
        title: 'DP',
        desc: '중복되는 하위 문제를 해결하는 동적 계획법(DP)의 핵심 개념을 배워봅시다.',
        posts: [
            { id: 6, title: '피보나치 수열 (DP)', quizIds: [12], solvedQuizIds: [] },
            { id: 17, title: '배낭 문제 (Knapsack)', quizIds: [13, 14], solvedQuizIds: [13] }
        ]
    }
];

const router = useRouter();

// URL 파라미터에서 roadmapId 읽기
const route = useRoute();
const currentRoadmapId = ref(Number(route.params.roadmapId) || 1);

// URL 변경 감지
watch(
  () => route.params.roadmapId,
  (newRoadmapId) => {
    if (newRoadmapId) currentRoadmapId.value = Number(newRoadmapId);
  }
);

const currentRoadmap = computed(() => roadmaps.find(r => r.id === currentRoadmapId.value));

function clickRoadmap(id) {
  if (id !== currentRoadmapId.value) {
    currentRoadmapId.value = id;
    router.push(`/algorithm/roadmap/${id}`);
  }
}

function clickPost(id) {
    console.log('selectedPostId:', id);
}

const currentIndex = computed(() => roadmaps.findIndex(r => r.id === currentRoadmapId.value));

const isFirst = computed(() => currentIndex.value === 0);
const isLast = computed(() => currentIndex.value === roadmaps.length - 1);

function goPrev() {
    if (!isFirst.value) {
        const prevRoadmap = roadmaps[currentIndex.value - 1];
        currentRoadmapId.value = prevRoadmap.id;
        router.push(`/algorithm/roadmap/${prevRoadmap.id}`);
    }
}

function goNext() {
  if (!isLast.value) {
    const nextRoadmap = roadmaps[currentIndex.value + 1];
    currentRoadmapId.value = nextRoadmap.id;
    router.push(`/algorithm/roadmap/${nextRoadmap.id}`);
  }
}
</script>

<style scoped>
.algo-main-container {
    min-height: 900px;
}

.page-title {
    width: 1022px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-size: 35px;
    margin-top: 20px;
}

.roadmap-container {
    font-family: 'Noto Sans KR';
    width: 1022px;
    display: flex;
    margin: 0 auto;
    margin-top: 34px;
    gap: 24px;
}

.roadmap-sidebar {
    border-radius: 8px;
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 12px;
}

.roadmap-sidebar hr {
    border: 1px solid #CFCFCF;
    width: 100%;
    margin: 2px 0px;
}

.sidebar-title {
    font-size: 14px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
}

.roadmap-content {
    flex: 1;
    background: #fff;
    border: 1px solid #94DBFF;
    border-radius: 8px;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.roadmap-step-title {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 8px;
    color: #383838;
}

.roadmap-step-title span {
    color: #0AA2EB;
}

.roadmap-step-desc {
    border-left: 2px solid #0AA2EB;
    font-size: 13px;
    color: #555;
    margin-bottom: 24px;
}

.algo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.point-info {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    text-align: center;
    margin-top: 14px;
    font-size: 13px;
    color: #383838;
}

.point-info span {
    color: #0AA2EB;
}

.roadmap-nav {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}
</style>
