<template>
  <div class="recruit-management-box">
    <p class="title">스터디 모집 관리</p>
    <p class="description">모집글과 신청 멤버를 한눈에 관리하세요!</p>

    <button class="manage-btn" @click="goToManagement">관리 페이지 바로가기</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToManagement = () => {
  router.push('/study-recruit/manage'); // 관리 페이지 경로 (필요시 수정 가능)
};
</script>

<style scoped>
.recruit-management-box {
  border: 1px solid #e3e6eb;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #111;
  text-align: left;
}

.description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  text-align: left;
}

.manage-btn {
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.manage-btn:hover {
  background-color: #008fd1;
}
</style>