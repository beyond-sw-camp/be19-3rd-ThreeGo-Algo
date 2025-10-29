// src/api/adminCareerInfoApi.js
import coreApi from './coreApi'

/**
 * 관리자용 기업별 정보 공유 API
 * (Career Info - Admin)
 */

// ✅ 게시물 목록 조회
// GET /admin/career-info/posts?visibility=Y&status=APPROVED&keyword=카카오&page=0&size=10
export const fetchCareerPosts = (params) => {
    return coreApi.get('/admin/career-info/posts', { params })
}

// ✅ 게시물 상세 조회
// GET /admin/career-info/posts/{postId}
export const fetchCareerPostDetail = (postId) => {
    return coreApi.get(`/admin/career-info/posts/${postId}`)
}

// ✅ 게시물 상태 변경 (승인/거절/대기중)
export const updateCareerPostStatus = (postId, { status, rejectReason }) => {
    return coreApi.put(`/admin/career-info/posts/${postId}/status`, {
        status,
        rejectReason,
    })
}

// ✅ 게시물 삭제 (Soft delete)
export const deleteCareerPost = (postId) => {
    return coreApi.delete(`/admin/career-info/posts/${postId}`)
}

// ✅ 댓글 전체 조회
// GET /admin/career-info/comments
export const fetchCareerComments = () => {
    return coreApi.get('/admin/career-info/comments')
}

// ✅ 댓글 삭제 (Soft delete)
export const deleteCareerComment = (commentId) => {
    return coreApi.delete(`/admin/career-info/comments/${commentId}`)
}
