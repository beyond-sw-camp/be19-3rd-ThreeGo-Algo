<template>
    <div class="career-detail-page" v-loading="loading">
        <div v-if="post" class="detail-container">
            <!-- 🧭 상단: 목록으로 버튼 -->
            <div class="top-bar">
                <el-button type="default" plain size="small" @click="goBack" class="back-btn">
                    ← 목록으로
                </el-button>
            </div>

            <!-- 헤더 -->
            <div class="header">
                <div class="title-section">
                    <h2 class="page-title">{{ post.title }}</h2>
                    <p class="meta">
                        작성자: <b>{{ post.nickname }}</b> |
                        작성일: {{ post.createdAt }}
                    </p>
                </div>

                <!-- 상태 선택 -->
                <div class="status-box">
                    <el-select v-model="selectedStatus" size="small" placeholder="상태 선택" @change="handleStatusChange"
                        style="width: 150px">
                        <el-option label="승인" value="APPROVED" />
                        <el-option label="거절" value="REJECTED" />
                        <el-option label="대기중" value="PENDING" />
                    </el-select>
                </div>
            </div>

            <el-divider />

            <!-- 대표 이미지 -->
            <div v-if="post.imageUrl" class="image-wrapper">
                <el-image :src="post.imageUrl" fit="contain" class="main-image" :preview-src-list="[post.imageUrl]">
                    <template #error>
                        <div class="image-error">이미지를 불러올 수 없습니다 😢</div>
                    </template>
                </el-image>
            </div>

            <!-- 본문 내용 -->
            <div class="content" v-html="post.content"></div>

            <!-- ✅ 거절 사유 입력 / 표시 -->
            <div class="reject-section" v-if="selectedStatus === 'REJECTED'">
                <p class="reject-label">거절 사유</p>

                <!-- 이미 사유가 저장된 경우 -->
                <div v-if="post.rejectReason && !rejectReason.trim()" class="reject-view">
                    <p class="reject-text">{{ post.rejectReason }}</p>
                    <el-button type="primary" plain size="small" @click="enableEditReject">
                        수정
                    </el-button>
                </div>

                <!-- 새로 입력 또는 수정 중인 경우 -->
                <div v-else>
                    <el-input v-model="rejectReason" type="textarea" rows="3" placeholder="거절 사유를 입력하세요" />
                    <div class="reject-actions">
                        <el-button type="warning" size="small" @click="submitReject">
                            저장
                        </el-button>
                        <el-button size="small" @click="cancelReject">취소</el-button>
                    </div>
                </div>
            </div>

            <!-- 삭제 버튼 -->
            <div class="actions">
                <el-popconfirm title="정말 삭제하시겠습니까?" confirm-button-text="삭제" cancel-button-text="취소"
                    confirm-button-type="danger" @confirm="deletePost">
                    <template #reference>
                        <el-button type="danger" plain>삭제</el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
    fetchCareerPostDetail,
    updateCareerPostStatus,
    deleteCareerPost,
} from '@/api/adminCareerInfoApi'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(false)
const selectedStatus = ref('')
const rejectReason = ref('')

// ✅ 데이터 불러오기
const fetchData = async () => {
    loading.value = true
    try {
        const res = await fetchCareerPostDetail(route.params.id)
        post.value = res.data
        selectedStatus.value = post.value.status
        rejectReason.value = ''
    } catch (e) {
        console.error('게시물 상세 불러오기 실패:', e)
    } finally {
        loading.value = false
    }
}

// ✅ 상태 변경
const handleStatusChange = async (val) => {
    if (val === 'REJECTED') return
    try {
        await updateCareerPostStatus(post.value.id, { status: val })
        ElMessage.success('상태가 변경되었습니다.')
        fetchData()
    } catch {
        ElMessage.error('상태 변경 실패')
    }
}

// ✅ 거절 사유 저장
const submitReject = async () => {
    if (!rejectReason.value.trim()) {
        return ElMessage.warning('거절 사유를 입력해주세요.')
    }
    try {
        await updateCareerPostStatus(post.value.id, {
            status: 'REJECTED',
            rejectReason: rejectReason.value,
        })
        ElMessage.success('거절 사유가 저장되었습니다.')
        fetchData()
    } catch {
        ElMessage.error('거절 처리 실패')
    }
}

// ✅ 수정 모드 활성화
const enableEditReject = () => {
    rejectReason.value = post.value.rejectReason
}

// ✅ 거절 취소
const cancelReject = () => {
    rejectReason.value = ''
    selectedStatus.value = post.value.status
}

// ✅ 삭제
const deletePost = async () => {
    try {
        await deleteCareerPost(post.value.id)
        ElMessage.success('삭제되었습니다.')
        router.push('/admin/career-info/posts')
    } catch {
        ElMessage.error('삭제 실패')
    }
}

// ✅ 목록으로 돌아가기
const goBack = () => {
    router.push('/admin/career-info/posts')
}

onMounted(fetchData)
</script>

<style scoped>
.career-detail-page {
    background: #fff;
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    max-width: 900px;
    margin: 0 auto;
}

.top-bar {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
}

.back-btn {
    border-color: #ccc;
    color: #555;
}

.back-btn:hover {
    border-color: #0aa2eb;
    color: #0aa2eb;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 10px;
}

.page-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
}

.meta {
    color: #888;
    font-size: 14px;
    margin-top: 6px;
}

.status-box {
    display: flex;
    align-items: center;
}

.image-wrapper {
    margin: 30px 0 25px;
    text-align: center;
}

.main-image {
    width: 100%;
    max-width: 650px;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: transform 0.2s ease;
}

.main-image:hover {
    transform: scale(1.02);
}

.image-error {
    color: #999;
    font-size: 14px;
    padding: 20px;
}

.content {
    line-height: 1.8;
    font-size: 15px;
    color: #333;
    margin-top: 15px;
    white-space: pre-wrap;
}

.reject-section {
    margin-top: 30px;
    background: #fff7e6;
    border: 1px solid #f3d19e;
    border-radius: 8px;
    padding: 15px 20px;
}

.reject-label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #b25b00;
}

.reject-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.reject-text {
    color: #333;
    font-size: 15px;
    white-space: pre-line;
}

.reject-actions {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.actions {
    margin-top: 40px;
    text-align: right;
}
</style>
