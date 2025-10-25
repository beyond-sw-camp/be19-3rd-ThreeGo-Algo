<template>
  <button
    :class="['custom-button', `button-${variant}`, `button-${size}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, outline, danger
    validator: (value) => ['primary', 'secondary', 'outline', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.custom-button {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.custom-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.button-primary {
  background-color: #0AA2EB;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background-color: #0891d1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(10, 162, 235, 0.3);
}

.button-secondary {
  background-color: #6c757d;
  color: white;
}

.button-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.button-outline {
  background-color: transparent;
  border: 2px solid #0AA2EB;
  color: #0AA2EB;
}

.button-outline:hover:not(:disabled) {
  background-color: #0AA2EB;
  color: white;
}

.button-danger {
  background-color: #dc3545;
  color: white;
}

.button-danger:hover:not(:disabled) {
  background-color: #c82333;
}

/* Sizes */
.button-sm {
  padding: 6px 12px;
  font-size: 13px;
}

.button-md {
  padding: 10px 20px;
  font-size: 15px;
}

.button-lg {
  padding: 14px 28px;
  font-size: 17px;
}

.custom-button:active:not(:disabled) {
  transform: translateY(0);
}
</style>
