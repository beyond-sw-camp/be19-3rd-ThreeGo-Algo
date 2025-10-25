<template>
    <div class="emoji-text">
        <img :src="emojiType" />
        <span>{{ count }}</span>
    </div>
</template>

<script setup>
import { emojiImages } from '@/constants/EmojiImages.js';
import { defineProps, computed } from 'vue';

const props = defineProps({
    type: String,
    count: Number
});

const emojiType = computed(() => emojiImages[props.type]);

</script>

<style scoped>
.emoji-text {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.emoji-text span {
    color: #838383;
    font-size: 13px;
    font-family: 'Noto Sans KR', sans-serif;
}

.emoji-text img {
    width: 20px;
}
</style>