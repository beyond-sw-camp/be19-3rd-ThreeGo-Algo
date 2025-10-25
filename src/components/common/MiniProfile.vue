<template>
    <div class="mini-profile">
        <img :src="rankImage" :alt="props.rankName" class="mini-profile-img" />
        <span>{{ props.nickname }}</span>
    </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import { rankImages } from '@/constants/rankImages.js';

const props = defineProps({
    nickname: String,
    rankName: String
});

const rankImage = ref('');

watchEffect(() => {
    rankImage.value = rankImages[props.rankName];
});

</script>

<style scoped>
.mini-profile {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
}

.mini-profile-img {
    width: 25px;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}
</style>