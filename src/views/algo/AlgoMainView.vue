<template>
    <div class="algo-main-container">
        <TabTitle title="알고리즘 학습" />
        <PageInfoBanner title="알고리즘, 어디서부터 공부해야 할지 모르겠다면?" subtitle="기초부터 실전까지, 방향 있는 알고리즘 학습 로드맵을 따라가면 어느새 코잘알 🐨"
            :image="bannerAlgo" bgColor="#F0FAFF" />

        <div class="roadmap-container">
            <div class="roadmap-sidebar">
                <span class="sidebar-title">학습 로드맵</span>
                <hr />

                <template v-if="roadmaps.length">
                    <div class="roadmap-list-container">
                        <RoadmapItem v-for="(item, index) in roadmaps" :key="item.id" :index="index" :id="item.id"
                            :order="item.order" :title="item.title" :isActive="currentRoadmapId === item.id"
                            @click="clickRoadmap(item.id)" />
                    </div>
                </template>
                <template v-else>
                    <el-empty description="현재 학습 로드맵이 준비 중이에요." />
                </template>
            </div>

            <div class="roadmap-content">
                <template v-if="currentRoadmap">
                    <h2 class="roadmap-step-title">
                        Step {{ currentIndex + 1 }} <span>{{ currentRoadmap.title }}</span>
                    </h2>
                    <p class="roadmap-step-desc">
                        &nbsp;&nbsp;{{ currentRoadmap.description }}
                    </p>

                    <div class="algo-list">
                        <AlgoPostItem v-for="post in currentRoadmap.posts" :key="post.id" :id="post.id"
                            :title="post.title" :quizIds="post.quizIds" :solvedQuizIds="post.solvedQuizIds"
                            @click="clickPost(post.id)" />
                    </div>
                    <template v-if="currentRoadmap.posts.length > 0">
                        <span class="point-info">💡 학습 후 퀴즈를 맞히면 <span>2 포인트</span>를 얻을 수 있어요!</span>
                    </template>
                    <template v-else>
                        <el-empty description="아직 등록된 학습 게시물이 없습니다." />
                    </template>

                    <div class="roadmap-nav">
                        <CustomButton width="120px" :disabled="isFirst" @click="goPrev">이전 로드맵</CustomButton>
                        <CustomButton width="120px" :disabled="isLast" @click="goNext">다음 로드맵</CustomButton>
                    </div>
                </template>
                <template v-else>
                    <el-empty description="아직 게시물이 등록되지 않았습니다." />
                </template>

            </div>
        </div>
    </div>
</template>

<script setup>
import bannerAlgo from '@/assets/images/banner-algo.png';
import PageInfoBanner from '@/components/common/PageInfoBanner.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RoadmapItem from '@/components/algo/RoadmapListItem.vue';
import AlgoPostItem from '@/components/algo/AlgoPostListItem.vue';
import TabTitle from '@/components/common/TabTitle.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import coreApi from '@/api/coreApi';

const router = useRouter();
const route = useRoute();

const roadmaps = ref([]);
const currentRoadmapId = ref(null);
const currentRoadmap = ref(null);

async function getRoadmaps() {
    try {
        const response = await coreApi.get('/algo/roadmaps');
        roadmaps.value = response.data;

        currentRoadmapId.value = Number(route.params.roadmapId);

        await getPostsByRoadmap(currentRoadmapId.value);
    } catch (error) {
        console.error('로드맵 목록 불러오기 실패:', error);
    }
}

async function getPostsByRoadmap(roadmapId) {
    if (!roadmapId) return;

    try {
        const response = await coreApi.get(`/algo/roadmaps/${roadmapId}/posts`);

        const roadmap = roadmaps.value.find(r => r.id === roadmapId);

        if (roadmap) {
            currentRoadmap.value = {
                ...roadmap,
                posts: response.data.map(post => ({
                    id: post.postId,
                    title: post.title,
                    quizIds: post.quizIds,
                    solvedQuizIds: post.solvedQuizIds || []
                }))
            };
            console.log(currentRoadmap);
        }
    } catch (error) {
        console.error(`로드맵(${roadmapId})의 게시물 리스트 불러오기 실패:`, error);
    }
}

async function clickRoadmap(id) {
    if (id !== currentRoadmapId.value) {
        currentRoadmapId.value = id;

        router.push(`/algorithm/roadmap/${id}`);

        await getPostsByRoadmap(id);
    }
}

function clickPost(id) {
    router.push(`/algorithm/post/${id}`);
}

const currentIndex = computed(() => roadmaps.value.findIndex(r => r.id === currentRoadmapId.value));

const isFirst = computed(() => currentIndex.value === 0);
const isLast = computed(() => currentIndex.value === roadmaps.value.length - 1);

async function goPrev() {
    if (!isFirst.value) {
        const prev = roadmaps.value[currentIndex.value - 1];
        currentRoadmapId.value = prev.id;
        router.push(`/algorithm/roadmap/${prev.id}`);
        await getPostsByRoadmap(prev.id);
    }
}

async function goNext() {
    if (!isLast.value) {
        const next = roadmaps.value[currentIndex.value + 1];
        currentRoadmapId.value = next.id;
        router.push(`/algorithm/roadmap/${next.id}`);
        await getPostsByRoadmap(next.id);
    }
}

watch(
    () => route.params.roadmapId,
    async (newId) => {
        if (newId) {
            currentRoadmapId.value = Number(newId);
            await getPostsByRoadmap(currentRoadmapId.value);
        }
    }
);

onMounted(getRoadmaps);
</script>

<style scoped>
.algo-main-container {
    min-height: 100vh;
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px 60px;
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
    width: 250px;
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

.roadmap-list-container {
    max-height: 400px;
    overflow-y: auto;
    padding: 5px;
}

.roadmap-list-container>* {
    flex-shrink: 0;
    margin-top: 12px;
}

.roadmap-list-container>*:first-child {
    margin-top: 0;
}
</style>