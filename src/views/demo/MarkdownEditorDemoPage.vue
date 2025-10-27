<template>
  <div class="markdown-container">
    <h2>Summernote 에디터</h2>
    <MarkdownEditor ref="editorRef" />
    <button @click="printContent">내용 출력</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownEditor from '@/components/common/PostEditor.vue'

 const editorRef = ref(null)

  function printContent() {
    const content = editorRef.value.getContent()
    console.log('에디터 내용:', content)
  }
</script>

<style>
.markdown-container {
  margin-left: 40px; 
  margin-top: 20px; 
}

</style>