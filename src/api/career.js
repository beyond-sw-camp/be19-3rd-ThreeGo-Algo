import coreApi from '@/api/coreApi'

// 게시글 목록 조회
export const fetchCareerPosts = async (params = {}) => {
    const res = await coreApi.get('/career-info/posts', { params })
    return res.data
}

// 게시글 등록 (FormData)
export const createCareerPost = async (formData) => {
    const res = await coreApi.post('/career-info/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
}

// 게시글 상세 조회
export const fetchCareerPostDetail = async (postId) => {
    const res = await coreApi.get(`/career-info/posts/${postId}`)
    return res.data
}

