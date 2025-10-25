<template>
  <el-card class="page-info-banner" :body-style="{ padding: '0' }" shadow="hover" :style="{ backgroundColor: bgColor }">
    <img v-if="image" :src="image" alt="banner" class="banner-bg" />

    <div class="banner-text">
      <div class="banner-title-wrapper">
        <h2 class="banner-title">{{ title }}</h2>
        <p class="banner-subtitle">{{ subtitle }}</p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ElCard } from 'element-plus'

defineProps({
  title: String,
  subtitle: String,
  image: String,
  bgColor: {
    type: String,
    default: '#f0faff'
  }
})
</script>

<style scoped>
.page-info-banner {
  position: relative;
  width: 1022px;
  height: 210px;
  border-radius: 35px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.banner-bg {
  position: absolute;
  left: 90px;
  top: -40px;
  width: 260px;
  height: 266px;
  object-fit: cover;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #1e0909;
}

.banner-title-wrapper {
  display: inline-block;
  text-align: left;
}

.banner-title {
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  line-height: 1;
}

.banner-subtitle {
  font-size: 13px;
  margin-top: 8px;
}
</style>
