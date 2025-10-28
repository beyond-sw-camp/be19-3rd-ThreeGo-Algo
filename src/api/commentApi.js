import api from '@/api/coreApi'

// 댓글 등록 (parentId 있으면 답글로 처리)
export const createComment = (postId, data, parentId = null) => {
  const params = parentId ? { parentId } : {}
  return api.post(`/posts/${postId}/comments`, data, { params })
}

// 댓글 수정
export const updateComment = (commentId, data) => {
  return api.put(`/comments/${commentId}`, data)
}

// 댓글 삭제
export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`)
}
