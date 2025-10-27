<template>
    <div class="post-item">
        <div class="post-header">
            <div class="post-title-area">
                <p class="post-title" @click="goToPost">
                    {{ title }}
                </p>
                <p v-if="company || displayYear" class="post-badges">
                    <span v-if="company" class="company-badge">{{ company }}</span>
                    <span v-if="displayYear" class="year-badge">{{ displayYear }}</span>
                </p>
                <p class="post-certification">
                    <img v-if="status === 'APPROVED'" :src="certificationIcon" class="certification-icon" />
                </p>
            </div>
            <span class="post-date">{{ createdAt }}</span>
        </div>

        <MiniProfile :nickname="nickname" :rankName="rankName" />

        <div class="post-footer">
            <EmojiText v-if="likeCount != undefined" type="grayLike" :count="likeCount" />
            <EmojiText type="grayComment" :count="commentCount" />
            <EmojiText v-if="peopleCount != undefined" type="grayPeople" :count="peopleCount" />
        </div>
    </div>
</template>

<script setup>
import certificationImage from '@/assets/icons/certification.svg';
import MiniProfile from '@/components/common/MiniProfile.vue'
import EmojiText from '@/components/common/EmojiText.vue';
import { defineProps, computed } from 'vue'

const props = defineProps({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    nickname: { type: String, required: true },
    rankName: { type: String, required: true },
    createdAt: { type: String, required: true },
    status: { type: String, default: '' },
    likeCount: Number,
    commentCount: { type: Number, required: true },
    peopleCount: Number,
    company: { type: String, default: null },
    year: { type: String, default: null },
});

const certificationIcon = certificationImage;
const displayYear = computed(() => props.year?.replace(/^_/, '') || null)

// TODO 게시물 상세 페이지로 이동 기능 구현
const goToPost = () => {
    console.log('게시물 상세 페이지로 이동 예정!');
}
</script>

<style scoped>
.post-item {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    gap: 7px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 13px 10px;
}

.post-item:hover {
    background-color: #F5F5F5;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-title-area {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
    /* height: 22px; */
}

.post-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
}

.post-title:hover {
    color: #0AA2EB;
    text-decoration: underline;
}

.post-badges {
    display: flex;
    gap: 3px;
    align-items: center;
}

.company-badge {
    background-color: #E6F3FF;
    color: #0A8BE4;
    font-weight: 500;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 5px;
}

.year-badge {
    background-color: #F2F2F2;
    color: #444;
    font-weight: 500;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 5px;
}

.certification-icon {
    width: 22px;
}

.post-date {
    font-size: 13px;
    color: #555;
}

.post-footer {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 8px;
}
</style>