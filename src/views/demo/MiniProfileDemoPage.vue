<template>
    <MiniProfile :nickname="nickname" :rankName="rankName"/>
</template>

<script setup>
import MiniProfile from '@/components/common/MiniProfile.vue';
import {ref} from 'vue';

const nickname = ref('알코알라');
const rankName = ref('코좀알');
</script>