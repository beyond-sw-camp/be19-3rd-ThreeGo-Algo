// src/api/adminMemberApi.js
import memberApi from './memberApi'

// ✅ 전체 회원 목록 조회
export const fetchMembers = (params) => {
    return memberApi.get('/admin/member/info', { params })
}

// ✅ 개별 회원 상세 조회
export const fetchMemberDetail = (id) => {
    return memberApi.get(`/admin/member/${id}/info`)
}

// ✅ 회원 상태 변경
export const updateMemberStatus = (id, status) => {
    return memberApi.put(`/admin/member/${id}/status`, null, {
        params: { status },
    })
}

// ✅ 회원 권한 변경
export const updateMemberRole = (id, roleName) => {
    return memberApi.put(`/admin/member/${id}/role`, null, {
        params: { roleName },
    })
}
