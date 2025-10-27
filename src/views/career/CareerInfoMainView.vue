<template>
    <div class="company-info-page">
        <div class="company-info-main">
            <!-- 제목 -->
            <TabTitle title="기업별 정보 공유 게시판" />

            <!-- 배너 -->
            <div class="banner-wrapper">
                <PageInfoBanner title="코테와 면접, 이제 같이 준비하지 마세요." subtitle="기업별 면접 후기와 꿀팁을 공유하세요 💬"
                    :image="bannerImage" />
            </div>

            <!-- 검색 & 필터 -->
            <div class="filter-row">
                <SearchBar v-model="searchKeyword" placeholder="기업명, 게시글을 검색해보세요" buttonText="검색"
                    @search="handleSearch" />

                <div class="filter-selects">
                    <CustomSelect :options="companyOptions" placeholder="모든 기업" icon="company.svg"
                        :onSelect="handleCompanySelect" />
                    <CustomSelect :options="yearOptions" placeholder="모든 년도" icon="calendar.svg"
                        :onSelect="handleYearSelect" />
                    <CustomSelect :options="verifiedOptions" placeholder="전체 보기" icon="certification.svg"
                        :onSelect="handleVerifiedSelect" />
                </div>
            </div>

            <!-- 본문 -->
            <div class="content-layout">
                <CompanyPostSection :posts="displayedPosts" />

                <CompanyFilterSidebar :showVerifiedOnly="showVerifiedOnly" :selectedCompanies="selectedCompanies"
                    @updateFilters="updateFilters" @reset="resetFilters" @create="goToCreatePage" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import TabTitle from '@/components/common/TabTitle.vue'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import CompanyFilterSidebar from '@/components/career/CompanyFilterSidebar.vue'
import CompanyPostSection from '@/components/career/CompanyPostSection.vue'
import bannerImage from '@/assets/images/banner-career.png'

const router = useRouter()

// 상태
const searchKeyword = ref('')
const selectedCompany = ref('ALL')
const selectedYear = ref('ALL')
const selectedVerified = ref('ALL')
const showVerifiedOnly = ref(false)
const selectedCompanies = ref([])

// Select 옵션
const companies = ['네이버', '카카오', '삼성전자', '현대오토에버', 'LG전자', 'SK', '쿠팡']
const companyOptions = [{ label: '모든 기업', value: 'ALL' }, ...companies.map(c => ({ label: c, value: c }))]
const yearOptions = [{ label: '모든 년도', value: 'ALL' }, { label: '2025년', value: '2025' }, { label: '2024년', value: '2024' }]
const verifiedOptions = [{ label: '전체 보기', value: 'ALL' }, { label: '인증된 글만 보기', value: 'APPROVED' }]

// 더미 게시글
const allPosts = ref([
    {
        id: 1,
        title: '현대오토에버 면접 후기 공유합니다 (문제 복기)',
        nickname: '하이요',
        rankName: '코뉴비',
        createdAt: '2025.10.13',
        status: 'APPROVED',
        likeCount: 123,
        commentCount: 9,
        company: '현대오토에버',
    },
    {
        id: 2,
        title: '삼성전자 DX 면접 후기 (코테 포함)',
        nickname: '코테왕',
        rankName: '코잘알',
        createdAt: '2025.10.12',
        status: '',
        likeCount: 88,
        commentCount: 3,
        company: '삼성전자',
    },
    {
        id: 3,
        title: '네이버 2025 상반기 코테 후기 공유합니다 ☘️',
        nickname: '코알린',
        rankName: '코좀알',
        createdAt: '2025.10.08',
        status: 'APPROVED',
        likeCount: 75,
        commentCount: 5,
        company: '네이버',
    },
    {
        id: 4,
        title: 'LG전자 DX 직무 면접 후기 (기술면접 중심)',
        nickname: '취준중',
        rankName: '코뉴비',
        createdAt: '2025.09.28',
        status: '',
        likeCount: 64,
        commentCount: 7,
        company: 'LG전자',
    },
    {
        id: 5,
        title: '카카오 코테 2차 후기 및 문제 복기 ✍️',
        nickname: '디벨로퍼K',
        rankName: '코잘알',
        createdAt: '2025.09.15',
        status: 'APPROVED',
        likeCount: 101,
        commentCount: 8,
        company: '카카오',
    },
    {
        id: 6,
        title: 'SK C&C 면접 후기 (AI면접 포함)',
        nickname: '준코알라',
        rankName: '코뉴비',
        createdAt: '2025.09.10',
        status: '',
        likeCount: 42,
        commentCount: 2,
        company: 'SK',
    },
    {
        id: 7,
        title: '쿠팡 SDE 코테 후기 (2024 하반기)',
        nickname: '알고러버',
        rankName: '코좀알',
        createdAt: '2024.11.22',
        status: 'APPROVED',
        likeCount: 58,
        commentCount: 6,
        company: '쿠팡',
    },
    {
        id: 8,
        title: '삼성전자 반도체 SW개발 직무 1차 면접 후기',
        nickname: '프로그맨',
        rankName: '코잘알',
        createdAt: '2024.11.10',
        status: 'APPROVED',
        likeCount: 90,
        commentCount: 10,
        company: '삼성전자',
    },
    {
        id: 9,
        title: '현대오토에버 2차 면접 후기 - 실무진 중심',
        nickname: '면접봄',
        rankName: '코신',
        createdAt: '2024.10.25',
        status: '',
        likeCount: 34,
        commentCount: 1,
        company: '현대오토에버',
    },
    {
        id: 10,
        title: '네이버 2024 하반기 최종면접 후기',
        nickname: '알고장인',
        rankName: '코잘알',
        createdAt: '2024.09.18',
        status: 'APPROVED',
        likeCount: 112,
        commentCount: 12,
        company: '네이버',
    },
])

// 필터링 로직
const displayedPosts = computed(() => {
    let result = allPosts.value
    if (searchKeyword.value)
        result = result.filter(p => p.title.toLowerCase().includes(searchKeyword.value.toLowerCase()))
    if (selectedCompany.value !== 'ALL')
        result = result.filter(p => p.company === selectedCompany.value)
    if (selectedYear.value !== 'ALL')
        result = result.filter(p => p.createdAt.startsWith(selectedYear.value))
    if (selectedVerified.value === 'APPROVED' || showVerifiedOnly.value)
        result = result.filter(p => p.status === 'APPROVED')
    if (selectedCompanies.value.length > 0)
        result = result.filter(p => selectedCompanies.value.includes(p.company))
    return result
})

// 이벤트 핸들러
const handleSearch = keyword => (searchKeyword.value = keyword)
const handleCompanySelect = val => (selectedCompany.value = val)
const handleYearSelect = val => (selectedYear.value = val)
const handleVerifiedSelect = val => (selectedVerified.value = val)
const resetFilters = () => {
    showVerifiedOnly.value = false
    selectedCompanies.value = []
}
const updateFilters = filters => {
    showVerifiedOnly.value = filters.showVerifiedOnly
    selectedCompanies.value = filters.selectedCompanies
}
const goToCreatePage = () => router.push('/career-info/post')
</script>

<style scoped>
.company-info-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.company-info-main {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px 60px;
}

.banner-wrapper {
    margin: 16px 0 36px;
}

.filter-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
}

.filter-selects {
    display: flex;
    align-items: center;
    gap: 12px;
}

.content-layout {
    display: flex;
    gap: 24px;
}
</style>
