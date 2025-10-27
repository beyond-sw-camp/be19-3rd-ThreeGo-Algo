<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal-container">
      <h1 class="modal-title">{{ modalTitle }}</h1>

      <div class="form-group">
        <label class="label">
          순서
        </label>
        <p class="description">순서를 비워두시면, 자동으로 마지막 순서로 추가됩니다.</p>
        <Input 
          v-model="localOrder"
          width="100px"
          placeholder=""
        />
      </div>

      <div class="form-group">
        <label class="label">
          제목 <span class="required">*</span>
        </label>
        <Input 
          v-model="localTitle"
          width="100%"
          placeholder="제목을 입력해주세요."
        />
      </div>

      <div class="form-group">
        <label class="label">
          설명 <span class="required">*</span>
        </label>
        <textarea
          v-model="localDescription"
          class="textarea-large"
          placeholder="설명을 입력해주세요."
          rows="6"
        ></textarea>
      </div>

      <div class="button-group">
        <CustomButton variant="gray1" @click="handleClose">
          취소하기
        </CustomButton>
        <CustomButton @click="handleSubmit">
          등록하기
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Input from '@/components/common/Input.vue'
import CustomButton from '@/components/common/CustomButton.vue'

const props = defineProps({
  modalTitle: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  order: {
    type: [Number, String],
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'submit'])

const localTitle = ref(props.title)
const localOrder = ref(props.order)
const localDescription = ref(props.description)

watch(() => props.title, (newVal) => {
  localTitle.value = newVal
})

watch(() => props.order, (newVal) => {
  localOrder.value = newVal
})

watch(() => props.description, (newVal) => {
  localDescription.value = newVal
})

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit', {
    title: localTitle.value,
    order: localOrder.value,
    description: localDescription.value
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 40px;
  width: 80%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  font-family: 'Noto Sans KR';
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin: 0 0 32px 0;
  text-align: center;
}

.form-group {
  margin-bottom: 18px;
}

.label {
  display: block;
  font-size: 18px;
  font-weight: 200;
  color: #000;
  margin-bottom: 8px;
  text-align: start;
}

.required {
  color: #FF2B2B;
}

.description {
  font-size: 14px;
  color: #CFCFCF;
  margin: 0 0 12px 12px;
  line-height: 1.5;
}


.form-group :deep(.el-input) {
  margin-left: 12px;
}

.textarea-large {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-family: 'Noto Sans KR';
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  margin: 0 0 0 12px;
}

.textarea-large:focus {
  outline: none;
  border-color: #00A7E1;
}

.textarea-large::placeholder {
  color: #CFCFCF;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
</style>