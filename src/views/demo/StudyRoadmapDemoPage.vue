<template>
    <br></br>
    <div class="study-roadmap-container">
        <div class="study-roadmap-title">
            <p>스터디 로드맵</p>
        </div>

        <StudyRoadmap v-for="r in roadmaps" :key="r.roadmapId" :roadmap="r" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import StudyRoadmap from '@/components/study/StudyRoadmap.vue';

// Path에 있는 studyId 가져오기
const route = useRoute();
const currentStudyId = ref(Number(route.params.studyId));

// 더미 데이터
const roadmaps = ref([
    {
        roadmapId: 5,
        roadmapTitle: '5주차 카카오 상반기 코테 문제 풀이',
        roadmapDescription: '',
        order: 5,
        milestones: [
            { milestoneId: 1, milestoneTitle: '프로그래머스 24918번' },
            { milestoneId: 2, milestoneTitle: '프로그래머스 19173번' },
            { milestoneId: 3, milestoneTitle: '프로그래머스 3820번' },
        ],
    },
    {
        roadmapId: 4,
        roadmapTitle: '4주차 CS 면접 대비 공부 (1)',
        roadmapDescription: '',
        order: 4,
        milestones: [],
    },
    {
        roadmapId: 3,
        roadmapTitle: '3주차 CS 면접 대비 공부 (1)',
        roadmapDescription: '',
        order: 3,
        milestones: [
            { milestoneId: 5, milestoneTitle: '프로그래머스 24918번' },
            { milestoneId: 9, milestoneTitle: '프로그래머스 19173번' },
        ],
    },
    {
        roadmapId: 2,
        roadmapTitle: '2주차 자소서 작성하기',
        roadmapDescription: '',
        order: 2,
        milestones: [],
    },
    {
        roadmapId: 1,
        roadmapTitle: '1주차 기업 분석',
        roadmapDescription: '',
        order: 1,
        milestones: [],
    },
])
</script>

<style scoped>
.study-roadmap-container {
    border: 1px solid #DBF4FF;
    padding: 20px;
    border-radius: 8px;
    margin: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.study-roadmap-title {
    border-left: 5px solid #0AA2EB;
}

.study-roadmap-title p {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
}
</style>