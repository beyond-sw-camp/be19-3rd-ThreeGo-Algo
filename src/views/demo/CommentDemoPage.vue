<template>
    <div class="demo-page">
    <div class="page-header">
        <h1>댓글 데모 페이지</h1>
    </div>

    <div class="demo-content">
        <Comment 
            :comments="comments" 
            :currentUser="currentUser"
            @submit-comment="handleSubmitComment"
            @submit-reply="handleSubmitReply"
            @edit-comment="handleEditComment"
            @delete-comment="handleDeleteComment"
            @edit-reply="handleEditReply"
            @delete-reply="handleDeleteReply"
            @report-comment="handleReportComment"
            @report-reply="handleReportReply" />
        </div>

    <!-- 신고 모달 -->
    <ReportModal
      v-model="reportModal.visible"
      :targetType="reportModal.targetType"
      :targetNickname="reportModal.targetNickname"
      :targetContent="reportModal.targetContent"
      :targetId="reportModal.targetId"
      @submit="handleReportSubmit"
    />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Comment from '@/components/common/Comment.vue'
import ReportModal from '@/components/common/reportModal.vue'

// 현재 로그인한 사용자
const currentUser = ref({
    id: 1,
    nickname: '김멍띠',
    rankName: '코잘알'
})

// 댓글 데이터
const comments = ref([
    {
        id: 1,
        userId: 2,
        nickname: '강멍띠',
        rankName: '코알못',
        content: '오늘 스택에 대해 알아서 좋아요! ㅎㅎ',
        createdAt: '2025-10-14T10:30:00',
        replies: [
        {
            id: 1,
            userId: 3,
            nickname: '알코알라',
            rankName: '코좀알',
            content: '저도요! 너무 기뻐요!',
            createdAt: '2025-10-14T11:26:00'
        },
        {
            id: 2,
            userId: 1,
            nickname: '김멍띠',
            rankName: '코잘알',
            content: '저도 좋아요~',
            createdAt: '2025-10-14T10:30:00'
        }
        ]
    },
    {
        id: 2,
        userId: 1,
        nickname: '김멍띠',
        rankName: '코잘알',
        content: '이런 답변한 점 좋아요 좋아요!',
        createdAt: '2025-10-14T10:30:00',
        replies: []
    },
    {
        id: 3,
        userId: 4,
        nickname: '통멍띠',
        rankName: '코신',
        content: '제가 작성한 댓글입니다',
        createdAt: '2025-10-14T09:15:00',
        replies: []
    }
])

// 신고 모달 상태
const reportModal = reactive({
  visible: false,
  targetType: '댓글',
  targetNickname: '',
  targetContent: '',
  targetId: 0
})

// 댓글 ID 생성기
let nextCommentId = 4
let nextReplyId = 3

// 댓글 작성 핸들러
const handleSubmitComment = (data) => {
    const newComment = {
        id: nextCommentId++,
        userId: currentUser.value.id,
        nickname: currentUser.value.nickname,
        rankName: currentUser.value.rankName,
        content: data.content,
        createdAt: new Date().toISOString(),
        replies: []
    }

    comments.value.unshift(newComment)
    ElMessage.success('댓글이 작성되었습니다.')
}

// 답글 작성 핸들러
const handleSubmitReply = (data) => {
    const comment = comments.value.find(c => c.id === data.commentId)
    if (comment) {
        const newReply = {
        id: nextReplyId++,
        userId: currentUser.value.id,
        nickname: currentUser.value.nickname,
        rankName: currentUser.value.rankName,
        content: data.content,
        createdAt: new Date().toISOString()
    }

    if (!comment.replies) {
        comment.replies = []
    }
        comment.replies.push(newReply)
        ElMessage.success('답글이 작성되었습니다.')
    }
}

// 댓글 수정 핸들러
const handleEditComment = ({ commentId, content }) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
        comment.content = content
        ElMessage.success('댓글이 수정되었습니다.')
    }
}

// 댓글 삭제 핸들러
const handleDeleteComment = async (commentId) => {
    try {
        await ElMessageBox.confirm(
        '댓글을 삭제하시겠습니까?',
        '삭제 확인',
        {
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            type: 'warning'
        }
    )

    const index = comments.value.findIndex(c => c.id === commentId)
    if (index !== -1) {
        comments.value.splice(index, 1)
        ElMessage.success('댓글이 삭제되었습니다.')
    }
    } catch {
    // 취소한 경우
    }
}

// 답글 수정 핸들러
const handleEditReply = ({ replyId, commentId, content }) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment && comment.replies) {
        const reply = comment.replies.find(r => r.id === replyId)
        if (reply) {
        reply.content = content
        ElMessage.success('답글이 수정되었습니다.')
        }
    }
}

// 답글 삭제 핸들러
const handleDeleteReply = async ({ replyId, commentId }) => {
    try {
        await ElMessageBox.confirm(
        '답글을 삭제하시겠습니까?',
        '삭제 확인',
            {
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                type: 'warning'
            }
        )

    const comment = comments.value.find(c => c.id === commentId)
    if (comment && comment.replies) {
        const index = comment.replies.findIndex(r => r.id === replyId)
        if (index !== -1) {
            comment.replies.splice(index, 1)
            ElMessage.success('답글이 삭제되었습니다.')
        }
    }
        } catch {
    // 취소한 경우
    }
}

// 댓글 신고 핸들러
const handleReportComment = (comment) => {
  reportModal.visible = true
  reportModal.targetType = '댓글'
  reportModal.targetNickname = comment.nickname
  reportModal.targetContent = comment.content
  reportModal.targetId = comment.id
}

// 답글 신고 핸들러
const handleReportReply = (reply) => {
  reportModal.visible = true
  reportModal.targetType = '답글'
  reportModal.targetNickname = reply.nickname
  reportModal.targetContent = reply.content
  reportModal.targetId = reply.id
}

// 신고 제출 핸들러
const handleReportSubmit = (data) => {
  console.log('신고 제출:', {
    targetType: reportModal.targetType,
    targetId: data.targetId,
    reason: data.reason,
    detailReason: data.detailReason
  })
  
  // TODO: 실제 신고 API 호출
  // await axios.post('/reports', {
  //   type: reportModal.targetType === '댓글' ? 'COMMENT' : 'REPLY',
  //   targetId: data.targetId,
  //   reason: data.reason,
  //   detailReason: data.detailReason
  // })
  
  ElMessage.success('신고가 접수되었습니다.')
}
</script>

<style scoped>
.demo-page {
    min-height: 100vh;
    background: #f5f7fa;
    padding: 40px 20px;
}

.page-header {
    max-width: 1000px;
    margin: 0 auto 40px;
    text-align: center;
}

.page-header h1 {
    font-size: 32px;
    font-weight: 700;
    color: #303133;
    margin-bottom: 12px;
}

.page-header p {
    font-size: 16px;
    color: #909399;
}

.demo-content {
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>