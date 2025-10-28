<template>
    <button class="custom-button" :class="computedClass" :style="computedStyle" :disabled="disabled"
        @click="handleClick" type="default">
        <img v-if="icon" :src="icon" alt="icon" class="btn-icon" :style="iconStyle" />
        <slot />
    </button>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
    variant: { type: String, default: 'primary' }, // 버튼 종류: primary | secondary | gray1 | gray2 | danger | admin
    height: { type: String, default: 'md' }, // 높이: sm | md | lg
    width: { type: [String, Number], default: null },
    disabled: Boolean,
    icon: String,
    iconSize: { type: [String, Number], default: 18 },
})

const handleClick = (e) => {
    if (props.disabled) return
    emit('click', e)
}

const computedClass = computed(() => [
    'base-button',
    `btn--${props.variant}`,
    `btn-height--${props.height}`,
    { 'is-disabled': props.disabled },
])

const computedStyle = computed(() => {
    return props.width
        ? { width: typeof props.width === 'number' ? `${props.width}px` : props.width }
        : {}
})

const iconStyle = computed(() => ({
    width: typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize,
    height: typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize,
}))
</script>

<style scoped>
/* 공통 버튼 스타일 */
.base-button {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 1;
    border-radius: 5px;
    border: none;
    padding: 0 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.15s ease, transform 0.15s ease, filter 0.15s ease;
    box-sizing: border-box;
    white-space: nowrap;
    width: auto;
    min-width: fit-content;
}

.btn-icon {
    object-fit: contain;
    margin-right: 5px;
    padding: 0;
}

/* === Variant === */
.btn--primary {
    background: #0aa2eb;
    color: #ffffff;
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
    color: #000000;
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

.btn--admin {
    background: #1F2D3D;
    color: #ffffff;
}

.btn--admin:not(.is-disabled):hover {
    background: #16222f;
}

/* === Height === */
.btn-height--sm {
    height: 32px;
}

.btn-height--md {
    height: 40px;
}

.btn-height--lg {
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

.base-button:focus,
.base-button:focus-visible {
    outline: none !important;
    box-shadow: none !important;
}
</style>