<script setup>
import { StarFilled } from '@element-plus/icons-vue'

const handleLike = () => alert('좋아요!')
</script>

<template>
    <div class="button-demo">
        <CustomButton>기본 버튼</CustomButton>
        <CustomButton size="sm">작은 버튼</CustomButton>
        <CustomButton size="lg">큰 버튼</CustomButton>

        <CustomButton :icon="StarFilled" @click="handleLike">좋아요</CustomButton>
        <CustomButton variant="secondary">Secondary</CustomButton>
        <CustomButton variant="gray1">Gray</CustomButton>
        <CustomButton variant="gray2" disabled>비활성</CustomButton>
        <CustomButton variant="danger">삭제</CustomButton>
    </div>
</template>

<style scoped>
.button-demo {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    padding: 20px;
    background: #fafafa;
    border-radius: 8px;
}
</style>
