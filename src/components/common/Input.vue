<template>
  <el-input
    v-model="input"
    :style="{ width }"
    :placeholder="placeholder"
  >
  
    <template v-if="iconSrc" #prefix>
      <img
        :src="iconSrc"
        alt="icon"
        class="input-icon"
      />
    </template>
  </el-input>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '240px'
  },
  placeholder: {
    type: String,
    default: 'Please input'
  },
  icon: {
    type: String,
    default: '' // 예: "user.svg"
  }
})

const input = ref('')

const iconSrc = computed(() => {
  if (!props.icon) return null 
  try {
    return new URL(`../../assets/icons/${props.icon}`, import.meta.url).href
  } catch (e) {
    console.warn(`[Input.vue] 아이콘 로드 실패: ${props.icon}`)
    return null
  }
})
</script>

<style scoped>
.input-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}
</style>
