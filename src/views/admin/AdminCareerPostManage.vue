<template>
    <div class="career-admin-page">
        <h2 class="page-title">기업별 정보 공유 게시판 관리</h2>

        <!-- 🔍 필터 영역 -->
        <div class="filter-bar">
            <el-input v-model="searchKeyword" placeholder="검색어" class="filter-input" clearable />
            <el-select v-model="filterStatus" placeholder="인증 상태" class="filter-select" clearable>
                <el-option label="전체" value="" />
                <el-option label="승인" value="APPROVED" />
                <el-option label="거절" value="REJECTED" />
                <el-option label="대기중" value="PENDING" />
            </el-select>
            <el-button type="primary" @click="fetchPosts">검색</el-button>
        </div>

        <!-- 📋 게시글 목록 -->
        <el-table :data="posts" stripe v-loading="loading" style="width: 100%">
            <el-table-column prop="id" label="번호" width="70" />
            <el-table-column prop="nickname" label="작성자" width="150" />
            <el-table-column label="제목" min-width="250">
                <template #default="{ row }">
                    <span class="link" @click="goDetail(row.id)">
                        {{ row.title }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="작성일" width="130" />
            <el-table-column prop="status" label="상태" width="120">
                <template #default="{ row }">
                    <span :class="['status', row.status.toLowerCase()]">
                        {{ convertStatus(row.status) }}
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchCareerPosts } from '@/api/adminCareerInfoApi'

const posts = ref([])
const loading = ref(false)
const searchKeyword = ref('')
const filterStatus = ref('')

// ✅ 게시글 목록 조회
const fetchPosts = async () => {
    loading.value = true
    try {
        const params = { keyword: searchKeyword.value, status: filterStatus.value }
        const res = await fetchCareerPosts(params)
        posts.value = res.data
    } catch (err) {
        console.error('게시글 목록 조회 실패:', err)
    } finally {
        loading.value = false
    }
}

// ✅ 상세 페이지 이동
const goDetail = (id) => {
    window.location.href = `/admin/career-info/posts/${id}`
}

// ✅ 상태 텍스트 변환
const convertStatus = (status) => {
    if (status === 'APPROVED') return '승인'
    if (status === 'REJECTED') return '거절'
    if (status === 'PENDING') return '대기중'
    return '-'
}

onMounted(fetchPosts)
</script>

<style scoped>
.page-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
}

.filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

.filter-input {
    width: 200px;
}

.filter-select {
    width: 150px;
}

.link {
    color: #0aa2eb;
    cursor: pointer;
    text-decoration: underline;
}

.status.approved {
    color: #2ecc71;
}

.status.rejected {
    color: #e74c3c;
}

.status.pending {
    color: #f39c12;
}
</style>
