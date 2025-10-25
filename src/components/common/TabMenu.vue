<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  onClick: Function,
})

const selectedValue = ref(props.items[0]?.value || null)

function handleClick(item) {
  selectedValue.value = item.value
  props.onClick?.(item)
}
</script>

<template>
  <div class="horizontal-selector-wrapper">
    <div class="horizontal-selector">
      <div
        v-for="item in items"
        :key="item.value"
        class="item"
        :class="{ selected: item.value === selectedValue }"
        @click="handleClick(item)"
      >
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.horizontal-selector-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: max-content;
  font-family: 'Noto Sans KR';
  align-items: center; 
}

.horizontal-selector {
  display: flex;
  gap: 24px;
  position: relative; 
}

.item {
  cursor: pointer;
  position: relative; 
}

.item span {
  font-size: 20px;
  color: #383838;
  transition: transform 0.2s ease, font-weight 0.2s ease; 
}

.item.selected span {
  font-weight: bold;
  color: black;
}

.item:hover span {
  font-weight: 500;
}

</style>
