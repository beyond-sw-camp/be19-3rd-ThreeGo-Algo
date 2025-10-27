<template>
    <div class="study-roadmap-container">
        <div class="study-roadmap-title">
            <p>스터디 로드맵</p>
        </div>

        <StudyRoadmapItem v-for="r in roadmaps" :key="r.roadmapId" :roadmap="r" />
    </div>
</template>

<script setup>
import StudyRoadmapItem from '@/components/study/StudyRoadmapItem.vue'

const props = defineProps({
    roadmaps: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.study-roadmap-container {
    border: 1px solid #DBF4FF;
    padding: 20px;
    border-radius: 8px;
    margin: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);

    /* ✅ 스크롤 처리 */
    max-height: 400px;
    overflow-y: auto;
    scrollbar-width: thin;
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