<template>
    <div class="career-admin-page">
        <h2 class="page-title">기업별 댓글 관리</h2>

        <el-table :data="comments" stripe v-loading="loading" style="width: 100%">
            <el-table-column prop="id" label="번호" width="70" />
            <el-table-column prop="writerNickname" label="작성자" width="120" />
            <el-table-column prop="content" label="내용" min-width="250" />
            <el-table-column prop="createdAt" label="작성일" width="130" />
            <el-table-column label="게시물" min-width="200">
                <template #default="{ row }">
                    <span class="link" @click="goToPost(row.postId)">
                        {{ row.postTitle }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="관리" width="120">
                <template #default="{ row }">
                    <el-button type="danger" size="small" @click="deleteComment(row.id)">
                        삭제
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchCareerComments, deleteCareerComment } from '@/api/adminCareerInfoApi'
import { ElMessage, ElMessageBox } from 'element-plus'

const comments = ref([])
const loading = ref(false)

const fetchData = async () => {
    loading.value = true
    try {
        const res = await fetchCareerComments()
        comments.value = res.data
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

const deleteComment = (id) => {
    ElMessageBox.confirm('정말 삭제하시겠습니까?', '확인', {
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        type: 'warning',
    }).then(async () => {
        await deleteCareerComment(id)
        ElMessage.success('삭제되었습니다.')
        fetchData()
    })
}

const goToPost = (id) => {
    window.location.href = `/admin/career-info/posts/${id}`
}

onMounted(fetchData)
</script>

<style scoped>
.page-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
}

.link {
    color: #0aa2eb;
    cursor: pointer;
}

.link:hover {
    text-decoration: underline;
}
</style>
