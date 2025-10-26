<script setup>

const companyOptions = [
  { value: 'kakao', label: '카카오' },
  { value: 'naver', label: '네이버' },
  { value: 'coupang', label: '쿠팡' },
]

const recentOptions = [
  { value: 'latest', label: '최근 등록순' },
  { value: 'popular', label: '추천순' },
  { value: 'name', label: '제목순' },
]

const handleCompanySelect = (value) => {
  alert(`기업 선택: ${value}`)
}

const handleRecentSelect = (value) => {
  alert(`정렬 기준: ${value}`)
}
</script>

<template>
  <div class="select-demo">
    <h2>Select 예시</h2>

    <!-- 아이콘 + placeholder -->
    <div class="section">
      <h3>아이콘 + placeholder: 모든기업</h3>
      <CustomSelect :options="companyOptions" placeholder="모든기업" icon="company.svg" :onSelect="handleCompanySelect">
      </CustomSelect>

    </div>

    <!-- 아이콘 없는 placeholder -->
    <div class="section">
      <h3>아이콘 없음 + placeholder: 최근 등록순</h3>
      <CustomSelect :options="recentOptions" placeholder="최근 등록순" :onSelect="handleRecentSelect">
      </CustomSelect>

    </div>
  </div>
</template>

<style scoped>
.select-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
  padding: 20px;
  font-family: 'Noto Sans KR';
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

h2 {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  color: #555;
  width: 100%;
  margin-bottom: 6px;
}
</style>
