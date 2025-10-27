<template>
    <div class="study-roadmap">
        <div class="study-roadmap-header" @click="toggleOpen">
            <div class="study-roadmap-number">{{ formattedNumber }}</div>
            <div class="study-roadmap-title">{{ roadmap.roadmapTitle }}</div>

            <!-- 하위 리스트 있을 때만 화살표 표시 -->
            <img v-if="hasMilestones" :src="isOpen ? arrowUp : arrowDown" class="study-arrow-icon" />
        </div>

        <!-- 하위 리스트 -->
        <transition name="fade">
            <div v-if="isOpen && hasMilestones" class="study-milestones">
                <div v-for="(m, index) in roadmap.milestones" :key="index" class="study-milestone-item">
                    <img :src="image" class="study-milestone-icon" />
                    <span class="study-milestone-text">{{ m.milestoneTitle }}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import grayKoala from '@/assets/icons/gray_koala.svg';
import arrowDown from '@/assets/icons/gray_arrow_down.svg';
import arrowUp from '@/assets/icons/gray_arrow_up.svg';

const image = grayKoala;

const props = defineProps({
    roadmap: {
        type: Object,
        required: true,
    },
});

const isOpen = ref(false);

const toggleOpen = () => {
    if (props.roadmap.milestones?.length > 0) {
        isOpen.value = !isOpen.value
    };
};

const hasMilestones = computed(() => props.roadmap.milestones?.length > 0);

const formattedNumber = computed(() =>
    props.roadmap.order.toString().padStart(2, '0')
);

</script>

<style scoped>
.study-roadmap {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #F1EFEE;
    padding: 8px 0;
}

.study-roadmap-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 12px;
}

.study-roadmap-number {
    background-color: #b7e7ff;
    font-weight: 700;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.study-roadmap-title {
    flex: 1;
}

.study-arrow-icon {
    width: 18px;
    height: 18px;
}

.study-milestones {
    margin-left: 56px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 6px;
}

.study-milestone-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.study-milestone-icon {
    width: 18px;
    height: 18px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>