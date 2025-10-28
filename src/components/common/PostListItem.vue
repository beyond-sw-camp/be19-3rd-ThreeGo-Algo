<template>
    <div class="post-item">
        <div class="post-header">
            <div class="post-title-area">
                <p class="post-title" @click="goToPost">
                    {{ title }}
                </p>
                <img v-if="status === 'APPROVED'" :src="certificationIcon" class="certification-icon" />
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
import { defineProps } from 'vue'

const props = defineProps({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    nickname: { type: String, required: true },
    rankName: { type: String, required: true },
    createdAt: { type: String, required: true },
    status: { type: String, default: '' },
    likeCount: Number,
    commentCount: { type: Number, required: true },
    peopleCount: Number
});
const emit = defineEmits(['click'])

const certificationIcon = certificationImage;

const goToPost = () => {
    emit('click', props.id)
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
    align-items: center;
    gap: 8px;
    height: 22px;
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