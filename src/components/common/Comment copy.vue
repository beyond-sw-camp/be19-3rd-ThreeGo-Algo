<template>
    <div class="comment-section">
        <!-- 댓글 입력 영역 -->
        <div class="comment-input-wrapper">
            <div class="mini-profile-wrapper">
                <MiniProfile :nickname="currentUser.nickname" :rankName="currentUser.rankName" />
            </div>
            <div class="comment-input">
                <el-input v-model="newCommentContent" type="textarea" :rows="3" placeholder="내용을 입력하세요" resize="none" />
                <el-button type="primary" size="small" @click="handleSubmitComment"
                    :disabled="!newCommentContent.trim()">
                    댓글 작성
                </el-button>
            </div>
        </div>

        <!-- 댓글 개수 표시 -->
        <div class="comment-header">
            <span class="comment-count">댓글 {{ totalComments }}</span>
            <el-dropdown trigger="click" @command="handleSort">
                <span class="sort-dropdown">
                    등록순
                    <el-icon><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="oldest">등록순</el-dropdown-item>
                        <el-dropdown-item command="latest">최신순</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

        <!-- 댓글 목록 -->
        <div class="comment-list">
            <div class="comment-item" v-for="comment in comments" :key="comment.commentId">
                <!-- 댓글 수정 모드 -->
                <div v-if="editingCommentId === comment.commentId" class="comment-edit-mode">
                    <div class="mini-profile-wrapper">
                        <MiniProfile :nickname="comment.nickname" :rankName="comment.rankName" />
                    </div>
                    <div class="edit-content">
                        <el-input v-model="editContent" type="textarea" :rows="3" resize="none" />
                        <div class="edit-actions">
                            <el-button size="small" @click="cancelEdit">취소</el-button>
                            <el-button type="primary" size="small" @click="submitEditComment(comment.commentId)"
                                :disabled="!editContent.trim()">
                                수정 완료
                            </el-button>
                        </div>
                    </div>
                </div>

                <!-- 댓글 일반 모드 -->
                <div v-else class="comment-main">
                    <div class="comment-body">
                        <div class="comment-header-info">
                            <MiniProfile :nickname="comment.nickname" :rankName="comment.rankName" />
                            <span class="comment-time">{{ formatCreatedAt(comment.createdAt) }}</span>

                            <!-- 케밥 메뉴 (본인 댓글) -->
                            <template v-if="isMyComment(comment) && comment.visibility === 'Y'">
                                <el-dropdown trigger="click" @command="(cmd) => handleCommentAction(cmd, comment)"
                                    class="kebab-menu">
                                    <el-icon class="kebab-icon"><more-filled /></el-icon>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="edit">수정</el-dropdown-item>
                                            <el-dropdown-item command="delete">삭제</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </template>

                            <template v-else-if="comment.visibility === 'N'">
                            </template>

                            <template v-else>
                                <!-- 신고 버튼 (남의 댓글) -->
                                <el-button type="text" class="report-btn" @click="handleReport(comment)">
                                    <img src="@/assets/icons/report.svg" alt="신고" class="report-icon" />
                                    신고
                                </el-button>
                            </template>
                        </div>

                        <template v-if="comment.visibility === 'Y'">
                            <div class="comment-content">{{ comment.content }}</div>
                            <div class="comment-actions">
                                <el-button type="text" class="action-btn reply-btn" @click="toggleReply(comment.commentId)">
                                    답글
                                </el-button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="comment-content-delete">삭제되거나 신고당한 댓글입니다.</div>
                        </template>

                    </div>
                </div>

                <!-- 답글 입력 영역 -->
                <div class="reply-input-wrapper" v-if="replyStates[comment.commentId]?.showInput">
                    <div class="mini-profile-wrapper">
                        <MiniProfile :nickname="currentUser.nickname" :rankName="currentUser.rankName" />
                    </div>
                    <div class="reply-input">
                        <el-input v-model="replyStates[comment.commentId].content" type="textarea" :rows="2"
                            placeholder="답글을 입력하세요" resize="none" />
                        <div class="reply-actions-buttons">
                            <el-button size="small" @click="cancelReply(comment.commentId)">
                                취소
                            </el-button>
                            <el-button type="primary" size="small" @click="handleSubmitReply(comment)"
                                :disabled="!replyStates[comment.commentId]?.content.trim()">
                                답글 작성
                            </el-button>
                        </div>
                    </div>
                </div>

                <!-- 답글 목록 -->
                <div class="reply-list" v-if="comment.children && comment.children.length > 0">
                    <div class="reply-item" v-for="reply in comment.children" :key="reply.commentId">
                        <!-- 답글 수정 모드 -->
                        <div v-if="editingReplyId === reply.commentId" class="reply-edit-mode">
                            <img src="@/assets/icons/reply-kebab.svg" alt="답글 아이콘" class="reply-kebab-icon" />
                            <div class="mini-profile-wrapper">
                                <MiniProfile :nickname="reply.nickname" :rankName="reply.rankName" />
                            </div>
                            <div class="edit-content">
                                <el-input v-model="editReplyContent" type="textarea" :rows="2" resize="none" />
                                <div class="edit-actions">
                                    <el-button size="small" @click="cancelReplyEdit">취소</el-button>
                                    <el-button type="primary" size="small"
                                        @click="submitEditReply(reply.commentId, comment.commentId)"
                                        :disabled="!editReplyContent.trim()">
                                        수정 완료
                                    </el-button>
                                </div>
                            </div>
                        </div>

                        <!-- 답글 일반 모드 -->
                        <div v-else class="reply-content-wrapper">
                            <img src="@/assets/icons/reply-kebab.svg" alt="답글 아이콘" class="reply-kebab-icon" />
                            <div class="reply-body">
                                <div class="reply-header-info">
                                    <MiniProfile :nickname="reply.nickname" :rankName="reply.rankName" />
                                    <span class="reply-time">{{ formatCreatedAt(reply.createdAt) }}</span>

                                    <template v-if="isMyReply(reply) && reply.visibility === 'Y'">
                                        <!-- 케밥 메뉴 (본인 답글) -->
                                        <el-dropdown trigger="click" @command="(cmd) => handleReplyAction(cmd, reply, comment.commentId)"
                                            class="kebab-menu">
                                            <el-icon class="kebab-icon"><more-filled /></el-icon>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item command="edit">수정</el-dropdown-item>
                                                    <el-dropdown-item command="delete">삭제</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </template>

                                    <template v-else-if="reply.visibility === 'N'"></template>

                                    <template v-else>
                                        <!-- 신고 버튼 (남의 답글) -->
                                        <el-button type="text" class="report-btn" @click="handleReportReply(reply)">
                                            <img src="@/assets/icons/report.svg" alt="신고" class="report-icon" />
                                            신고
                                        </el-button>
                                    </template>
                                </div>
                                <template v-if="reply.visibility === 'Y'">
                                    <div class="reply-content">{{ reply.content }}</div>
                                </template>
                                <template v-else>
                                    <div class="reply-content-delete">
                                        삭제되거나 신고당한 댓글입니다.
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 신고 모달 -->
        <ReportModal v-model="isReportModalVisible" :targetType="reportTarget?.type"
            :targetNickname="reportTarget?.nickname" :targetContent="reportTarget?.content" 
            :targetId="reportTarget?.commentId" @submit="handleReportSubmit" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ArrowDown, MoreFilled } from '@element-plus/icons-vue';
import MiniProfile from '@/components/common/MiniProfile.vue';
import ReportModal from '@/components/common/ReportModal.vue';

const props = defineProps({
    comments: {
        type: Array,
        required: true,
        default: () => []
    },
    currentUser: {
        type: Object,
        required: true
    }
});

const emit = defineEmits([
    'submit-comment',
    'submit-reply',
    'edit-comment',
    'delete-comment',
    'edit-reply',
    'delete-reply',
    'report-comment',
    'report-reply',
    'report-submit'
]);

// 상태 관리
const newCommentContent = ref('');
const replyStates = ref({});
const editingCommentId = ref(null);
const editContent = ref('');
const editingReplyId = ref(null);
const editReplyContent = ref('');
const isReportModalVisible = ref(false);
const reportTarget = ref(null);
const reportReason = ref('');
const reportContent = ref('');

// ✅ 전체 댓글 개수 (commentId 기반, children 사용)
const totalComments = computed(() => {
    return props.comments.reduce((total, comment) => {
        const isParent = comment.visibility === 'Y' ? 1 : 0;
        const childrenCount = (comment.children || []).filter(
            child => child.visibility === 'Y'
        ).length;
        return total + isParent + childrenCount;
    }, 0);
});

// ✅ 댓글 작성
const handleSubmitComment = () => {
    if (!newCommentContent.value.trim()) return;

    emit('submit-comment', {
        content: newCommentContent.value.trim()
    });

    newCommentContent.value = '';
};

// ✅ 답글 토글
const toggleReply = (commentId) => {
    replyStates.value = {
        ...replyStates.value,
        [commentId]: {
            showInput: !replyStates.value[commentId]?.showInput,
            content: replyStates.value[commentId]?.content || ''
        }
    };

    // 다른 답글 입력창 닫기
    Object.keys(replyStates.value).forEach((key) => {
        if (parseInt(key) !== commentId) {
            replyStates.value[key].showInput = false;
        }
    });
};

// ✅ 답글 취소
const cancelReply = (commentId) => {
    if (replyStates.value[commentId]) {
        replyStates.value[commentId] = { showInput: false, content: '' };
    }
};

// ✅ 답글 작성
const handleSubmitReply = (comment) => {
    const content = replyStates.value[comment.commentId]?.content;
    if (!content?.trim()) return;

    emit('submit-reply', {
        commentId: comment.commentId,
        content: content.trim()
    });

    replyStates.value[comment.commentId] = { showInput: false, content: '' };
};

// ✅ 본인 댓글 확인 (memberId 기반)
const isMyComment = (comment) => {
    // memberId로 비교 (백엔드 DTO 기준)
    if (comment.memberId !== undefined && props.currentUser?.id !== undefined) {
        return comment.memberId === props.currentUser.id;
    }
    // nickname으로 비교 (fallback)
    return comment.nickname === props.currentUser.nickname;
};

// ✅ 본인 답글 확인
const isMyReply = (reply) => {
    if (reply.memberId !== undefined && props.currentUser?.id !== undefined) {
        return reply.memberId === props.currentUser.id;
    }
    return reply.nickname === props.currentUser.nickname;
};

// ✅ 댓글 케밥 메뉴 액션
const handleCommentAction = (command, comment) => {
    if (comment.visibility === 'N') return;
    
    if (command === 'edit') {
        editingCommentId.value = comment.commentId;
        editContent.value = comment.content;
    } else if (command === 'delete') {
        emit('delete-comment', comment.commentId);
    }
};

// ✅ 답글 케밥 메뉴 액션
const handleReplyAction = (command, reply, parentCommentId) => {
    if (reply.visibility === 'N') return;
    
    if (command === 'edit') {
        editingReplyId.value = reply.commentId;
        editReplyContent.value = reply.content;
    } else if (command === 'delete') {
        emit('delete-reply', { 
            replyId: reply.commentId, 
            commentId: parentCommentId 
        });
    }
};

// ✅ 댓글 수정 제출
const submitEditComment = (commentId) => {
    if (!editContent.value.trim()) return;

    emit('edit-comment', {
        commentId,
        content: editContent.value.trim()
    });

    cancelEdit();
};

// ✅ 댓글 수정 취소
const cancelEdit = () => {
    editingCommentId.value = null;
    editContent.value = '';
};

// ✅ 답글 수정 제출
const submitEditReply = (replyId, parentCommentId) => {
    if (!editReplyContent.value.trim()) return;

    emit('edit-reply', {
        replyId,
        commentId: parentCommentId,
        content: editReplyContent.value.trim()
    });

    cancelReplyEdit();
};

// ✅ 답글 수정 취소
const cancelReplyEdit = () => {
    editingReplyId.value = null;
    editReplyContent.value = '';
};

// ✅ 댓글 신고
const handleReport = (comment) => {
    if (comment.visibility === 'N') return;
    
    reportTarget.value = { ...comment, type: 'comment' };
    isReportModalVisible.value = true;
    reportReason.value = '';
    reportContent.value = '';
};

// ✅ 답글 신고
const handleReportReply = (reply) => {
    if (reply.visibility === 'N') return;
    
    reportTarget.value = { ...reply, type: 'reply' };
    isReportModalVisible.value = true;
    reportReason.value = '';
    reportContent.value = '';
    emit('report-reply', reply);
};

// ✅ 신고 제출
const handleReportSubmit = (reportData) => {
    emit('report-submit', reportData);
    isReportModalVisible.value = false;
    reportTarget.value = null;
};

// ✅ 정렬 핸들러
const handleSort = (command) => {
    console.log('정렬:', command);
};

// ✅ 시간 포맷팅
const formatCreatedAt = (createdAt) => {
    if (!createdAt) return '';

    const date = new Date(createdAt);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hour}:${minute}`;
};
</script>

<style scoped>
.comment-section {
    width: 100%;
}

.comment-input-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 24px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
}

.mini-profile-wrapper {
    position: relative;
    top: 6px;
}

.comment-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.comment-input :deep(.el-textarea__inner) {
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    font-size: 14px;
}

.comment-input .el-button {
    align-self: flex-end;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e4e7ed;
}

.comment-count {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.sort-dropdown {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    user-select: none;
}

.sort-dropdown:hover {
    color: #409eff;
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.comment-item {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
}

.comment-item:last-child {
    border-bottom: none;
}

.comment-main,
.comment-edit-mode {
    display: flex;
    gap: 12px;
}

.comment-body,
.edit-content {
    flex: 1;
    min-width: 0;
}

.comment-header-info,
.reply-header-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.comment-author,
.reply-author {
    font-size: 14px;
    font-weight: 600;
    color: #303133;
}

.comment-time,
.reply-time {
    font-size: 12px;
    color: #909399;
}

.kebab-menu {
    margin-left: auto;
    cursor: pointer;
}

.kebab-icon {
    font-size: 18px;
    color: #909399;
    transition: color 0.3s;
}

.kebab-icon:hover {
    color: #606266;
}

.report-btn {
    margin-left: auto;
    padding: 4px 8px;
    font-size: 13px;
    color: #000000;
    display: flex;
    align-items: center;
    gap: 4px;
}

.report-btn:hover {
    color: #f56c6c;
    background: #fef0f0;
}

.report-icon {
    width: 14px;
    height: 14px;
}

.comment-content,
.reply-content {
    font-size: 14px;
    line-height: 1.6;
    color: #303133;
    margin-bottom: 8px;
    white-space: pre-wrap;
    word-break: break-word;
}

.comment-content-delete,
.reply-content-delete {
    font-size: 14px;
    color: #CFCFCF;
    font-weight: 600;
    margin-bottom: 8px;
}

.comment-actions {
    display: flex;
    gap: 4px;
    margin-top: 8px;
}

.action-btn {
    padding: 4px 8px;
    font-size: 13px;
    color: #606266;
}

.reply-btn {
    color: #409eff;
}

.reply-btn:hover {
    background: #ecf5ff;
}

.edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
}

.reply-input-wrapper {
    margin-left: 37px;
    margin-top: 12px;
    padding: 12px;
    background: #ffffff;
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    display: flex;
    gap: 12px;
}

.reply-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.reply-input :deep(.el-textarea__inner) {
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    font-size: 14px;
}

.reply-actions-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.reply-list {
    margin-top: 16px;
    margin-left: 37px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-left: 16px;
}

.reply-item {
    display: flex;
    flex-direction: column;
}

.reply-content-wrapper,
.reply-edit-mode {
    display: flex;
    gap: 12px;
    align-items: flex-start;
}

/* ✅ 답글 케밥 아이콘 스타일 */
.reply-kebab-icon {
    width: 14px;
    height: 14px;
    margin-top: 6px;
    flex-shrink: 0;
}

.reply-body {
    flex: 1;
    min-width: 0;
}
</style>