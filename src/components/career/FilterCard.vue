<template>
    <div class="filter-card">
        <div class="filter-header">
            <h3>필터</h3>
            <button class="reset-btn" @click="$emit('reset')">초기화</button>
        </div>

        <label class="checkbox-item">
            <input type="checkbox" v-model="localVerified" @change="emitChange" />
            인증된 글만 보기
        </label>

        <div class="company-filter">
            <h4>기업</h4>
            <div v-for="c in companies" :key="c" class="checkbox-item">
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
})
const emit = defineEmits(['updateFilters', 'reset'])

const localVerified = ref(props.showVerifiedOnly)
const localCompanies = ref([...props.selectedCompanies])
const companies = ['네이버', '카카오', '삼성전자', '현대오토에버', 'LG전자', 'SK', '쿠팡']

const emitChange = () => {
    emit('updateFilters', { showVerifiedOnly: localVerified.value, selectedCompanies: localCompanies.value })
}

watch(
    () => props.showVerifiedOnly,
    newVal => (localVerified.value = newVal)
)

watch(
    () => props.selectedCompanies,
    newVal => (localCompanies.value = [...newVal])
)
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
</style>
