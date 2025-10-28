<template>
  <div class="form" ref="editor"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps, watch, nextTick } from 'vue'
import coreApi from '@/api/coreApi' 

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const editor = ref(null)

onMounted(async () => {
  await nextTick()

  $(editor.value).summernote({
    placeholder: '내용을 입력하세요...',
    width: 960,
    height: 500,
    lang: 'ko-KR',
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    callbacks: {
      async onImageUpload(files) {
        for (let file of files) {
          try {
            const formData = new FormData()
            formData.append('image', file) 

            const response = await coreApi.post('/file/upload', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })

            const uploadedUrl = response.data

            $(editor.value).summernote('insertImage', uploadedUrl)
          } catch (error) {
            console.error('이미지 업로드 실패:', error)
            alert('이미지 업로드 중 오류가 발생했습니다.')
          }
        }
      },

      onChange(contents) {
        emit('update:modelValue', contents)
      }
    }
  })

  $(editor.value).summernote('code', props.modelValue)
})

onBeforeUnmount(() => {
  $(editor.value).summernote('destroy')
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== $(editor.value).summernote('code')) {
      $(editor.value).summernote('code', newVal)
    }
  }
)
</script>