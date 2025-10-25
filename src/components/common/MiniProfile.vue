<template>
    <div class="mini-profile">
        <img :src="rankImage" :alt="props.rankName" class="mini-profile-img" />
        <span>{{ props.nickname }}</span>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { rankImages } from '@/constants/rankImages.js';

const props = defineProps({
    nickname: String,
    rankName: String
});

const rankImage = computed(() => rankImages[props.rankName]);

</script>

<style scoped>
.mini-profile {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-family: 'Noto Sans KR', sans-serif;
}

.mini-profile-img {
    width: 20px;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}
</style>