<template>
  <div class="back-button" @click="handleClick">
    <el-icon><ArrowLeft /></el-icon>
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    default: '뒤로 가기'
  },
  to: {
    type: String,
    default: null
  }
})

const router = useRouter()

const handleClick = () => {
  if (props.to) {
    router.push(props.to)
  } else {
    router.back()
  }
}
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: #0AA2EB;
  cursor: pointer;
  transition: 0.2s;
}
.back-button:hover {
  text-decoration: underline;
  opacity: 0.8;
}
.el-icon {
  margin-right: 1px;
}
</style>
