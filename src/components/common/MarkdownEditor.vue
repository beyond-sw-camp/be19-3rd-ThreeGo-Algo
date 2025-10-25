<template>
  <div class="markdown-wrapper">
    <MdEditor
      v-model="localValue"
      height="400px"
      :on-upload-img="handleUploadImage"
      placeholder="스터디 모집 내용을 마크다운으로 작성하세요"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { uploadToS3 } from '@/utils/s3Upload'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

// ✅ props를 직접 수정하지 않고, 내부 ref로 복사
const localValue = ref(props.modelValue)

// ✅ 부모 → 자식 데이터 변경 반영
watch(() => props.modelValue, (val) => {
  if (val !== localValue.value) localValue.value = val
})

// ✅ 자식 → 부모로 변경사항 전달
watch(localValue, (val) => emit('update:modelValue', val))

// ✅ 이미지 업로드 핸들러
const handleUploadImage = async (files, callback) => {
  try {
    const urls = []
    for (const file of files) {
      const imageUrl = await uploadToS3(file)
      urls.push(imageUrl)
    }
    callback(urls)
  } catch (e) {
    console.error('S3 업로드 실패:', e)
  }
}
</script>

<style scoped>
.markdown-wrapper {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
</style>
