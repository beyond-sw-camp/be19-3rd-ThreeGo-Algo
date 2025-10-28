<template>
    <div class="filter-card">
        <div class="filter-header">
            <h3>필터</h3>
            <button class="reset-btn" @click="$emit('reset')">초기화</button>
        </div>

        <!-- 인증 필터 -->
        <label class="checkbox-item">
            <input type="checkbox" v-model="localVerified" @change="emitChange" />
            인증된 글만 보기
        </label>

        <!-- 기업 필터 -->
        <div class="company-filter">
            <h4>기업</h4>
            <div v-if="companies.length === 0" class="no-company">표시할 기업이 없습니다.</div>
            <div v-else v-for="c in companies" :key="c" class="checkbox-item">
                <input type="checkbox" :value="c" v-model="localCompanies" @change="emitChange" />
                <span>{{ c }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    showVerifiedOnly: Boolean,
    selectedCompanies: Array,
    companies: { //부모에서 전달받을 기업 목록
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['updateFilters', 'reset'])



// 로컬 상태 (props 변경 감지)
const localVerified = ref(props.showVerifiedOnly)
const localCompanies = ref([...props.selectedCompanies])

const emitChange = () => {
    emit('updateFilters', {
        showVerifiedOnly: localVerified.value,
        selectedCompanies: localCompanies.value
    })
}

// 부모 값 변화 시 반영
watch(() => props.showVerifiedOnly, newVal => (localVerified.value = newVal))
watch(() => props.selectedCompanies, newVal => (localCompanies.value = [...newVal]))
</script>

<style scoped>
.filter-card {
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    padding: 18px 20px 22px;
}

.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.filter-header h3 {
    font-size: 17px;
    font-weight: 700;
    color: #2b1a0d;
}

.reset-btn {
    background: none;
    border: none;
    color: #a3a3a3;
    font-size: 14px;
    cursor: pointer;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: #2b1a0d;
    margin-bottom: 6px;
}

.company-filter h4 {
    font-size: 15px;
    font-weight: 700;
    margin-top: 14px;
    margin-bottom: 8px;
    color: #2b1a0d;
}

.no-company {
    font-size: 14px;
    color: #a3a3a3;
    margin-bottom: 6px;
}
</style>
