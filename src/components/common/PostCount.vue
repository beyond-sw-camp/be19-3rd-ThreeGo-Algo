<template>
    <div class="post-count">
        <span class="count">{{ count }}</span>
        <span class="text">개의 {{ label }}이 있어요.</span>
    </div>
</template>

<script setup>
defineProps({
    count: {
        type: [Number, String],
        required: true,
    },
    label: {
        type: String,
        default: '게시물',
    },
})
</script>

<style scoped>
.post-count {
    display: flex;
    align-items: baseline;
    font-size: 16px;
    font-weight: 400;
    color: #838383;
}

.count {
    color: #0aa2eb;
    font-weight: 500;
}
</style>
