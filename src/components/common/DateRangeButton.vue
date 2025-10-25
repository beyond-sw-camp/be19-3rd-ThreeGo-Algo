<template>
    <div class="date-range-wrapper">
        <!-- 시작일 버튼 -->
        <div class="date-btn" @click="openPicker('start')">
            <img v-if="!startDate" class="icon" src="@/assets/icons/calendar.svg" alt="calendar" />
            <span>{{ startDate || '시작일' }}</span>
        </div>

        <span class="separator">~</span>

        <!-- 종료일 버튼 -->
        <div class="date-btn" @click="openPicker('end')">
            <img v-if="!endDate" class="icon" src="@/assets/icons/calendar.svg" alt="calendar" />
            <span>{{ endDate || '종료일' }}</span>
        </div>

        <!-- 숨겨진 DatePicker -->
        <el-date-picker ref="startPicker" v-model="startDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
            :append-to-body="false" popper-class="start-popper" style="visibility: hidden; position: absolute;" />
        <el-date-picker ref="endPicker" v-model="endDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
            :append-to-body="false" popper-class="end-popper" style="visibility: hidden; position: absolute;" />

        <!-- 초기화 버튼 -->
        <div class="reset-btn" @click="resetDates">초기화</div>
    </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const props = defineProps({
  startDate: {
    type: String,
    default: ''
  },
  endDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:startDate', 'update:endDate'])

const startDate = ref(props.startDate)
const endDate = ref(props.endDate)
const startPicker = ref(null)
const endPicker = ref(null)

// Props 변경 감지
watch(() => props.startDate, (newVal) => {
  startDate.value = newVal
})

watch(() => props.endDate, (newVal) => {
  endDate.value = newVal
})

// 날짜 변경 시 emit
watch(startDate, (newVal) => {
  emit('update:startDate', newVal)
})

watch(endDate, (newVal) => {
  emit('update:endDate', newVal)
})

const resetDates = () => {
    startDate.value = ''
    endDate.value = ''
    emit('update:startDate', '')
    emit('update:endDate', '')
}

const openPicker = async (type) => {
    await nextTick()
    if (type === 'start' && startPicker.value) startPicker.value.handleOpen()
    if (type === 'end' && endPicker.value) endPicker.value.handleOpen()
}
</script>

<style scoped>
.date-range-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    font-size: 16px;
}

.date-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 18px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 400;
    color: #898989;
    font-size: 16px;
    line-height: 1.4;
    transition: 0.2s ease;
    box-sizing: border-box;
    white-space: nowrap;
    min-height: 42px;
}

.date-btn:hover {
    border-color: #0aa2eb;
    color: #0aa2eb;
}

.separator {
    font-size: 20px;
    font-weight: 400;
    color: #898989;
}

.icon {
    width: 20px;
    height: 20px;
    filter: invert(55%) sepia(0%) saturate(0%) hue-rotate(176deg) brightness(95%) contrast(90%);
}

.reset-btn {
    margin-left: 5px;
    color: #999;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
    align-self: flex-end;
    padding-bottom: 5px;
}

.reset-btn:hover {
    color: #0aa2eb;
}
</style>
