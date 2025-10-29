<template>
    <div class="admin-page">
        <h2>회원 관리</h2>

        <div class="search-bar">
            <el-input v-model="searchKeyword" placeholder="닉네임, 이메일 검색..." clearable />
            <el-button type="primary" @click="loadMembers">검색</el-button>
        </div>

        <el-table :data="members" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="email" label="이메일" />
            <el-table-column prop="nickname" label="닉네임" />
            <el-table-column prop="roleName" label="권한" />
            <el-table-column prop="status" label="상태" />

            <el-table-column label="조치" width="220">
                <template #default="{ row }">
                    <el-select v-model="row.status" placeholder="상태 변경" @change="changeStatus(row)">
                        <el-option label="ACTIVE" value="ACTIVE" />
                        <el-option label="INACTIVE" value="INACTIVE" />
                        <el-option label="BLOCKED" value="BLOCKED" />
                    </el-select>

                    <el-select v-model="row.roleName" placeholder="권한 변경" @change="changeRole(row)">
                        <el-option label="USER" value="USER" />
                        <el-option label="ADMIN" value="ADMIN" />
                    </el-select>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" :current-page.sync="page"
            @current-change="loadMembers" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchMembers, updateMemberStatus, updateMemberRole } from '@/api/adminMemberApi'
import { ElMessage } from 'element-plus'

const members = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
const searchKeyword = ref('')

const loadMembers = async () => {
    try {
        const { data } = await fetchMembers({
            page: page.value,
            size: size.value,
            keyword: searchKeyword.value,
        })
        members.value = data.content || data.data?.content || []
        total.value = data.totalElements || 0
    } catch (err) {
        console.error('회원 목록 불러오기 실패:', err)
    }
}

const changeStatus = async (row) => {
    try {
        await updateMemberStatus(row.id, row.status)
        ElMessage.success(`상태 변경 완료: ${row.status}`)
    } catch (err) {
        ElMessage.error('상태 변경 실패')
    }
}

const changeRole = async (row) => {
    try {
        await updateMemberRole(row.id, row.roleName)
        ElMessage.success(`권한 변경 완료: ${row.roleName}`)
    } catch (err) {
        ElMessage.error('권한 변경 실패')
    }
}

onMounted(loadMembers)
</script>

<style scoped>
.admin-page {
    padding: 30px;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
}
</style>
