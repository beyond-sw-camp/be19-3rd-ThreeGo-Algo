<template>
    <div class="like-frame">
        <p class="like-text">
            이번 학습이 도움이 되셨다면
            <span class="highlight">추천하기</span> 눌러주세요!
        </p>

        <template v-if="isLiked === false">
            <CustomButton icon="/src/assets/icons/thumbup.svg" @click="emit('likePost')">
                추천하기
            </CustomButton>
        </template>
        <template v-else>
            <CustomButton disabled>
                추천하기
            </CustomButton>
            <span class="like-text">💖 이미 마음을 전했어요.</span>
        </template>
    </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
    isLiked: Boolean
});

const emit = defineEmits(['likePost']);
</script>

<style scoped>
.like-frame {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #B7E7FF;
    border-radius: 8px;
    margin-bottom: 20px;
}

.like-text {
    font-size: 14px;
    font-weight: 500;
    color: #294887;
}

.like-text .highlight {
    font-weight: 700;
    color: #0AA2EB;
}

.like-text {
    font-weight: 700;
    color: #0AA2EB;
}
</style>
