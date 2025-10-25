<template>
  <div class="popup-demo-page">
    <h1>🎉 One Button Popup Demo</h1>

    <!-- 팝업 열기 버튼 그룹 -->
    <div class="btn-group">
      <CustomButton variant="primary" @click="openPopup('levelUp')">등급업 완료</CustomButton>
      <CustomButton variant="primary" @click="openPopup('attendance')">출석 완료</CustomButton>
      <CustomButton variant="primary" @click="openPopup('reportComplete')">신고 완료</CustomButton>
    </div>

    <!-- 등급업 완료 팝업 -->
    <OneButtonCommonPopup
      v-model="popup.levelUp"
      title="축하합니다!"
      subtitle="새로운 등급으로 승급하셨습니다."
      image="/src/assets/images/level_up1_1.png"
      confirmText="확인"
      confirmVariant="primary"
      :showCancel="false"
      @confirm="handleConfirm('등급업 완료')"
    />

    <!-- 출석 완료 팝업 -->
    <OneButtonCommonPopup
      v-model="popup.attendance"
      title="출석 완료"
      subtitle="오늘도 한 걸음 성장했어요!"
      image="/src/assets/images/default_koala.png"
      confirmText="확인"
      confirmVariant="primary"
      :showCancel="false"
      @confirm="handleConfirm('출석 완료')"
    />

    <!-- 신고 완료 팝업 -->
    <OneButtonCommonPopup
      v-model="popup.reportComplete"
      title="신고 완료"
      subtitle="관리자에게 신고가 정상적으로 접수되었습니다."
      image="/src/assets/images/report_koala2.png"
      confirmText="확인"
      confirmVariant="primary"
      :showCancel="false"
      @confirm="handleConfirm('신고 완료')"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'
import OneButtonCommonPopup from '@/components/common/OneButtonPopup.vue'

const popup = reactive({
  levelUp: false,
  attendance: false,
  reportComplete: false,
})

const openPopup = (key) => {
  popup[key] = true
}

const handleConfirm = (type) => {
  console.log(`[확인 클릭됨]: ${type}`)
  popup[type] = false
}
</script>

<style scoped>
.popup-demo-page {
  padding: 40px;
  text-align: center;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
