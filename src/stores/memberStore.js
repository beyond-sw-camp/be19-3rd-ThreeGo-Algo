import { defineStore } from 'pinia'
import memberApi from '@/api/memberApi'

export const useMemberStore = defineStore('member', {
  state: () => ({
    memberInfo: null,
  }),
  actions: {
    async fetchMemberInfo(id) {
      try {
        const res = await memberApi.get(`/member/rank`)
        this.memberInfo = res.data
        return res.data
      } catch (err) {
        console.error('회원 정보 조회 실패:', err)
      }
    },
  },
})
