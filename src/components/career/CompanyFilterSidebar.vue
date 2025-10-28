<template>
    <aside class="filter-sidebar">
        <CustomButton variant="primary" width="100%" icon="/src/assets/icons/plus.svg" iconSize="14"
            @click="$emit('create')">
            글 작성하기
        </CustomButton>

        <FilterCard :showVerifiedOnly="showVerifiedOnly" :selectedCompanies="selectedCompanies" :companies="companies"
            @updateFilters="$emit('updateFilters', $event)" @reset="$emit('reset')" />

        <RewardCard @create="$emit('create')" />
    </aside>
</template>

<script setup>
import CustomButton from '@/components/common/CustomButton.vue'
import FilterCard from './FilterCard.vue'
import RewardCard from './RewardCard.vue'
defineProps({
    showVerifiedOnly: Boolean,
    selectedCompanies: Array,
    companies: { type: Array, default: () => [] }
})
defineEmits(['updateFilters', 'reset', 'create'])
</script>

<style scoped>
.filter-sidebar {
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
