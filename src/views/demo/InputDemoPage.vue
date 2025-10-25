<template>
  <div class="input-container">
    <Input
      width="200px"
      placeholder="아이디를 입력하세요"
      icon="user.svg"
    />
  </div>
</template>

<script setup>
import Input from '@/components/common/Input.vue';
</script>

<style>
.input-container {
  margin: 50px;
}
</style>
