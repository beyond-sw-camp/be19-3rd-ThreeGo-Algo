<template>
    <div class="reward-card">
        <img src="@/assets/images/point.png" class="reward-img" />
        <div class="reward-card-content">
            <p class="reward-title">기업별 코테·면접 후기<br />공유하고 20p 받자!</p>
            <p class="reward-sub">후기 등록 시 +10p<br />인증 완료 시 +20p</p>
            <CustomButton variant="primary" @click="$emit('create')">글 작성하러 가기</CustomButton>
        </div>
    </div>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue'
</script>

<style scoped>
.reward-card {
    position: relative;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.reward-img {
    position: absolute;
    width: 160px;
    opacity: 0.35;
}

.reward-card-content {
    position: relative;
    z-index: 2;
    color: #2b1a0d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
}

.reward-title {
    font-weight: 700;
    font-size: 17px;
    line-height: 1.4;
    margin: 0;
}

.reward-sub {
    font-size: 13px;
    color: #555;
    margin-bottom: 6px;
    line-height: 1.5;
}
</style>
