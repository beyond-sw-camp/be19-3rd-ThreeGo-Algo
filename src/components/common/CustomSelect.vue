<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
  icon: {
    type: String,
    default: '',
  },
  onSelect: {
    type: Function,
  },
  initialValue: { type: String, default: '' },
})

const selectedValue = ref('')

watch(() => props.initialValue, (v) => {
  selectedValue.value = v
})

const iconSrc = computed(() => {
  if (!props.icon) return ''
  return new URL(`/src/assets/icons/${props.icon}`, import.meta.url).href
})

function handleSelect(value) {
  const selectedOption = props.options.find(option => option.value === value)
  if (selectedOption) {
    props.onSelect?.(selectedOption)
  }
}
</script>

<template>
  <el-select
    v-model="selectedValue"
    :placeholder="props.placeholder"
    class="select"
    @change="handleSelect"
  >
    <template #prefix>
      <img v-if="props.icon" :src="iconSrc" alt="icon" class="select-icon" />
    </template>

    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      class="select-option"
    />
  </el-select>
</template>

<style scoped>
.select {
  width: 160px;
  font-family: 'Noto Sans KR';
  --el-border-color: #D9D9D9;
}

.select-option {
  font-family: 'Noto Sans KR';
  font-size: 16px 
}

.select-icon {
  width: 18px;
  height: 18px;
  margin-left: 4px;
  margin-right: 6px;
  object-fit: contain;
}
</style>