<template>
    <el-button :class="computedClass" :disabled="disabled" :icon="icon" @click="handleClick">
        <slot />
    </el-button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
    variant: { type: String, default: 'primary' }, // 색상
    size: { type: String, default: 'md' }, // 크기: sm | md | lg
    disabled: Boolean,
    icon: String,
})

const handleClick = (e) => {
    if (props.disabled) return
    emit('click', e)
}

const computedClass = computed(() => [
    'base-button',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    { 'is-disabled': props.disabled },
])
</script>

<style scoped>
/* 공통 스타일 */
.base-button {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.2;
    border-radius: 5px;
    border: none;
    padding: 0 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.15s ease, transform 0.15s ease, filter 0.15s ease;
}

/* === Variant === */
.btn--primary {
    background: #0aa2eb;
    color: #ffffff;
    border: none;
}

.btn--primary:not(.is-disabled):hover {
    background: #0893d3;
}

.btn--secondary {
    background: #ffffff;
    color: #0aa2eb;
    border: 1px solid #0aa2eb;
}

.btn--secondary:not(.is-disabled):hover {
    background: #f4f9ff;
}

.btn--gray1 {
    background: #cfcfcf;
    color: #ffffff;
}

.btn--gray1:not(.is-disabled):hover {
    background: #bdbdbd;
}

.btn--gray2 {
    background: #f1efee;
    color: #cfcfcf;
}

.btn--gray2:not(.is-disabled):hover {
    background: #e2e0df;
}

.btn--danger {
    background: #ff2b2b;
    color: #ffffff;
}

.btn--danger:not(.is-disabled):hover {
    background: #e02222;
}

/* === Size === */
.btn--sm {
    height: 32px;
}

.btn--md {
    height: 40px;
}

.btn--lg {
    height: 46px;
}

/* === Active 눌림 효과 === */
.base-button:not(.is-disabled):active {
    transform: scale(0.97);
    filter: brightness(0.9);
}

/* === Disabled === */
.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

.is-disabled:hover {
    background: inherit;
    transform: none;
    filter: none;
}

.base-button:focus,
.base-button:focus-visible {
    outline: none !important;
    box-shadow: none !important;
}
</style>
