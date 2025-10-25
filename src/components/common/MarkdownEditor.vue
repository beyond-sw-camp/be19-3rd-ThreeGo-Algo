<template>
  <div ref="editor"></div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const editor = ref(null)

onMounted(async () => {
  await nextTick() 
  $(editor.value).summernote({
    placeholder: '내용을 입력하세요...',
    width: 1022,
    height: 600,
    lang: 'ko-KR',
    focus: false,
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    codemirror: {
      theme: 'dracula'
    }
  })

  $(editor.value).summernote('code', '<p>Hello Summernote</p>')
})

onBeforeUnmount(() => {
  $(editor.value).summernote('destroy')
})

function getContent() {
  return $(editor.value).summernote('code')
}

defineExpose({
  getContent
})
</script>
