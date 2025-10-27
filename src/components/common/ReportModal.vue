<template>
  <el-dialog
    v-model="visible"
    width="500px"
    class="report-modal"
    :show-close="false"
    align-center
  >
    <div class="modal-content">
      <!-- 헤더 -->
      <div class="modal-header">
        <div class="header-icon">
          <img src="@/assets/icons/report.svg" alt="신고" class="report-icon" />
        </div>
        <h2 class="modal-title">{{ targetNickname }}님의 {{ targetType }}을 신고하시겠습니까?</h2>
        <p class="modal-description">부적절한 신고는 서비스 이용에 불이익을 줄 수 있습니다.</p>
      </div>

      <!-- 신고 대상 -->
      <div class="form-section">
        <label class="form-label">신고 대상</label>
        <div class="target-content">
          <p>{{ targetContent }}</p>
        </div>
      </div>

      <!-- 신고 기준 -->
      <div class="form-section">
        <label class="form-label">
          신고 기준 
          <span class="required">*</span>
        </label>
        <CustomSelect
          :options="reportReasons"
          placeholder="신고 사유를 선택해주세요."
          :onSelect="handleReasonSelect"
        />
        <p v-if="errors.reason" class="error-message">{{ errors.reason }}</p>
      </div>

      <!-- 상세 신고 사유 -->
      <div class="form-section">
        <label class="form-label">상세 신고 사유</label>
        <el-input
          v-model="detailReason"
          type="textarea"
          :rows="4"
          placeholder="신고 내용을 자세히 작성해주시면 처리에 도움이 됩니다."
          class="detail-textarea"
        />
      </div>

      <!-- 버튼 영역 -->
      <div class="modal-buttons">
        <CustomButton
          variant="gray2"
          width="120px"
          height="md"
          @click="handleCancel"
        >
          취소
        </CustomButton>
        <CustomButton
          variant="danger"
          width="120px"
          height="md"
          @click="showConfirmationPopup"
        >
          신고
        </CustomButton>
      </div>
    </div>

    <!-- 팝업 컴포넌트 -->
    <OneButtonPopup
      v-model="popupVisible"
      title="신고 완료"
      subtitle="관리자에게 신고가 정상적으로 접수되었습니다."
      image="/src/assets/images/report_koala2.png"
      confirmText="확인"
      cancelText="취소"
      @confirm="handleSubmit"
      @cancel="handlePopupCancel" />
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import CustomButton from '@/components/common/CustomButton.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import OneButtonPopup from '@/components/common/OneButtonPopup.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  targetType: { type: String, default: '댓글' }, // '댓글' 또는 '답글'
  targetNickname: { type: String, required: true },
  targetContent: { type: String, required: true },
  targetId: { type: Number, required: true }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(false)
const popupVisible = ref(false) // 팝업 가시성 상태
const selectedReason = ref('')
const detailReason = ref('')
const errors = ref({
  reason: ''
})

// 신고 사유 옵션
const reportReasons = [
  { label: '명예훼손 및 욕설', value: 1 },
  { label: '혐오성 콘텐츠', value: 2 },
  { label: '상업성 게시물', value: 3 },
  { label: '허위사실 유포', value: 4 },
  { label: '기타', value: 5 }
]

// props <-> dialog v-model 동기화
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
    if (val) {
      // 모달이 열릴 때 초기화
      selectedReason.value = ''
      detailReason.value = ''
      errors.value.reason = ''
    }
  }
)

watch(visible, (val) => {
    // 항상 부모와 동기화
    emit('update:modelValue', val)
})

// 신고 사유 선택 핸들러
const handleReasonSelect = (value) => {
  selectedReason.value = value
  errors.value.reason = ''
}

// 유효성 검사
const validateForm = () => {
  errors.value.reason = ''
  
  if (!selectedReason.value) {
    errors.value.reason = '신고 사유를 선택해주세요.'
    return false
  }
  
  return true
}

// 취소 버튼
const handleCancel = () => {
  visible.value = false
}

// 팝업 표시
const showConfirmationPopup = () => {
  if (!validateForm()) {
    return
  }
  popupVisible.value = true
}

// 팝업 취소 핸들러
const handlePopupCancel = () => {
  popupVisible.value = false
}

// 신고 제출
const handleSubmit = () => {
  if (!validateForm()) {
    return
  }
  
  emit('submit', {
    targetId: props.targetId,
    reason: selectedReason.value,
    detailReason: detailReason.value.trim()
  })
  
  visible.value = false
  popupVisible.value = false
}
</script>

<style scoped>
.report-modal {
  font-family: 'Noto Sans KR', sans-serif;
}

.report-modal :deep(.el-dialog__body) {
  padding: 0;
}

.modal-content {
  padding: 32px;
}

/* 헤더 */
.modal-header {
  text-align: center;
  margin-bottom: 32px;
}

.header-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.report-icon {
  width: 48px;
  height: 48px;
  filter: invert(27%) sepia(89%) saturate(3271%) hue-rotate(348deg) brightness(96%) contrast(106%);
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.modal-description {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* 폼 섹션 */
.form-section {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.required {
  color: #ff2b2b;
  margin-left: 2px;
}

/* 신고 대상 내용 */
.target-content {
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  padding: 12px;
  max-height: 100px;
  overflow-y: auto;
}

.target-content p {
  margin: 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  word-break: break-word;
}

/* Select 커스터마이징 */
.form-section :deep(.select) {
  width: 100%;
}

/* 에러 메시지 */
.error-message {
  color: #ff2b2b;
  font-size: 13px;
  margin: 6px 0 0 0;
  font-weight: 500;
}

/* Textarea */
.detail-textarea {
  width: 100%;
}

.detail-textarea :deep(.el-textarea__inner) {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  resize: none;
}

/* 버튼 영역 */
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
</style>