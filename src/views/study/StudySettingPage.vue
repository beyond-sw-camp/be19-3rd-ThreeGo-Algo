<template>
  <div class="study-setting-page">
    <!-- 좌측 사이드바 -->
    <aside class="sidebar">
      <StudyProfile />
      <StudySetting :userRole="userRole" :currentRoute="currentRoute" />
    </aside>

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <!-- 상단 안내 배너 -->
      <PageInfoBanner
        title="스터디원 관리"
        subtitle="멤버를 스터디에서 제외하거나, 스터디장 권한을 다른 멤버에게 위임할 수 있습니다."
        :image="bannerBoard"
        bgColor="#F0FAFF"
      />

      <!-- 멤버 리스트 -->
      <div class="member-list">
        <div class="table-header">
          <div class="col checkbox"></div>
          <div class="col no">NO</div>
          <div class="col nickname">닉네임</div>
          <div class="col rank">등급</div>
          <div class="col role">권한</div>
        </div>

        <div class="member-items">
          <MemberList
            v-for="(member, index) in members"
            :key="member.memberId"
            :no="index + 1"
            :nickname="member.memberNickname"
            :rankName="member.memberRank"
            :role="getRoleVariant(member.role)"
            :selected="selectedMember === member.memberId"
            @click="selectMember(member.memberId)"
          />
        </div>
      </div>

      <!-- 하단 버튼 -->
      <div class="actions">
        <CustomButton @click="delegateRole">권한 위임</CustomButton>
        <CustomButton variant="danger" @click="removeMember">스터디에서 제외</CustomButton>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import MemberList from '@/components/study/MemberList.vue'
import StudyProfile from '@/components/study/StudyProfile.vue'
import StudySetting from '@/components/study/StudySetting.vue'
import CustomButton from '@/components/common/CustomButton.vue'
import bannerBoard from '@/assets/images/study_blog_banner_board.png'
import coreApi from '@/api/coreApi'

const studyId = ref(null)
const members = ref([])
const route = useRoute()
const router = useRouter()

const userRole = ref('leader')
const currentRoute = computed(() => route.path)

const selectedMember = ref(null)
const currentUserNickname = ref(null)

onMounted(async () => {
  studyId.value = localStorage.getItem('studyId')
  currentUserNickname.value = localStorage.getItem('nickname')

  if (!studyId.value) {
    console.error('studyId가 없습니다.')
    return
  }

  await fetchMembers()
})

const fetchMembers = async () => {
  try {
    const response = await coreApi.get(`/study/${studyId.value}/members`)
    members.value = response.data
    console.log('멤버 목록:', members.value)
  } catch (error) {
    console.error('멤버 목록 조회 실패:', error)
    alert('멤버를 불러올 수 없습니다.')
  }
}

const selectMember = (memberId) => {
  selectedMember.value = memberId
  const selectedInfo = members.value.find(m => m.memberId === memberId)
  console.log('선택된 멤버:', selectedInfo)
  console.log('memberId:', memberId)
  console.log('nickname:', selectedInfo?.memberNickname)
  console.log('role:', selectedInfo?.role)
}

const delegateRole = async () => {
  if (!selectedMember.value) {
    alert('권한을 위임할 멤버를 선택해주세요!')
    return
  }

  // 선택된 멤버 정보 찾기
  const selectedMemberInfo = members.value.find(m => m.memberId === selectedMember.value)
  
  if (!selectedMemberInfo) {
    alert('선택된 멤버 정보를 찾을 수 없습니다.')
    return
  }

  console.log('🔍 권한 위임 시도:', {
    selectedMemberId: selectedMember.value,
    selectedMemberNickname: selectedMemberInfo.memberNickname,
    currentUserNickname: currentUserNickname.value
  })
  
  if (selectedMemberInfo.memberNickname === currentUserNickname.value) {
    alert('자기 자신에게는 권한을 위임할 수 없습니다.')
    return
  }

  if (!confirm('정말로 이 멤버에게 리더 권한을 위임하시겠습니까?\n위임 후에는 일반 멤버가 되며, 되돌릴 수 없습니다.')) {
    return
  }

  try {
    await coreApi.patch(`/study/${studyId.value}/leader/${selectedMember.value}`)
    
    alert('권한이 성공적으로 위임되었습니다!')
    
    router.push('/study/home')
    
  } catch (error) {
    alert('권한 위임에 실패했습니다. 다시 시도해주세요.')
  }
}

const removeMember = async () => {
  if (!selectedMember.value) {
    alert('제외할 멤버를 선택해주세요!')
    return
  }

  // 선택된 멤버 정보 찾기
  const selectedMemberInfo = members.value.find(m => m.memberId === selectedMember.value)

  console.log('선택된 멤버:', {
    selectedMemberId: selectedMember.value,
    selectedMemberNickname: selectedMemberInfo.memberNickname,
    currentUserNickname: currentUserNickname.value
  })
  
  if (selectedMemberInfo.memberNickname === currentUserNickname.value) {
    alert('자기 자신을 제외할 수 없습니다.')
    return
  }

  if (!confirm('정말로 이 멤버를 스터디에서 제외하시겠습니까?')) {
    return
  }

  try {
    await coreApi.delete(`/study/${studyId.value}/members/${selectedMember.value}`)
    
    alert('스터디에서 멤버가 제외되었습니다!')
    
    // 멤버 목록 새로고침
    await fetchMembers()
    selectedMember.value = null
    
  } catch (error) {
    alert('멤버 제외에 실패했습니다.')
  }
}

const getRoleVariant = (role) => {
  if (role === 'LEADER') return 'leader'
  if (role === 'NOT_MEMBER') return 'NOT_MEMBER'
  return 'member'
}
</script>

<style scoped>
.study-setting-page {
  display: flex;
  gap: 40px;
  padding: 40px 80px;
}

.sidebar {
  width: 200px;
  margin-left: 150px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-content {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.member-list {
  background: #fff;
  border: 1px solid #dbf4ff;
  border-radius: 12px;
  overflow: hidden;
  width: 800px;
  margin: 0 auto;
}

.table-header {
  display: flex;
  align-items: center;
  background: #f8faff;
  font-weight: 600;
  font-size: 14px;
  color: #555;
  border-bottom: 2px solid #dbf4ff;
  padding: 12px 20px;
}

.table-header .col {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.table-header .col.checkbox {
  width: 40px;
  justify-content: flex-start;
  margin-right: 20px;
}

.table-header .col.no {
  width: 60px;
  justify-content: center;
  margin-right: 60px;
}

.table-header .col.nickname {
  flex: 1;
  min-width: 200px;
  justify-content: flex-start;
  margin-left: 80px;
}

.table-header .col.rank {
  width: 190px;
  justify-content: flex-start;
}

.table-header .col.role {
  width: 90px;
  justify-content: flex-start;
}

.member-items {
  display: flex;
  flex-direction: column;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 800px;
  margin: 0 auto;
}
</style>