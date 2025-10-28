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
                        :initialValue="selectedCompany" :onSelect="handleCompanySelect" />

                    <CustomSelect :options="yearOptions" placeholder="모든 년도" icon="calendar.svg"
                        :initialValue="selectedYear" :onSelect="handleYearSelect" />

                    <CustomSelect :options="verifiedOptions" placeholder="전체 보기" icon="certification.svg"
                        :initialValue="selectedVerified" :onSelect="handleVerifiedSelect" />
                </div>
            </div>

            <!-- 본문 -->
            <div class="content-layout">
                <CompanyPostSection :posts="displayedPosts" />

                <CompanyFilterSidebar :showVerifiedOnly="showVerifiedOnly" :selectedCompanies="selectedCompanies"
                    :companies="companiesForSidebar" @updateFilters="updateFilters" @reset="resetFilters"
                    @create="goToCreatePage" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCareerPosts } from '@/api/careerApi'

import TabTitle from '@/components/common/TabTitle.vue'
import PageInfoBanner from '@/components/common/PageInfoBanner.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import CustomSelect from '@/components/common/CustomSelect.vue'
import CompanyFilterSidebar from '@/components/career/CompanyFilterSidebar.vue'
import CompanyPostSection from '@/components/career/CompanyPostSection.vue'
import bannerImage from '@/assets/images/banner-career.png'

const router = useRouter()

// 상태 관리
const searchKeyword = ref('')
const selectedCompany = ref('ALL')
const selectedYear = ref('ALL')
const selectedVerified = ref('ALL')
const showVerifiedOnly = ref(false)
const selectedCompanies = ref([])

const allPosts = ref([])

const companiesForSidebar = computed(() => {
    const names = allPosts.value.map(p => p.company).filter(Boolean)
    const uniqueNames = [...new Set(names)]
    // 가나다순 정렬
    return uniqueNames.sort((a, b) => a.localeCompare(b, 'ko'))
})

// 프론트에서 필터링 처리
const displayedPosts = computed(() => {
    return allPosts.value.filter(post => {
        // 검색어 필터
        const matchKeyword =
            !searchKeyword.value ||
            post.title?.includes(searchKeyword.value) ||
            post.company?.includes(searchKeyword.value)

        // 기업 필터
        let matchCompany = true
        if (selectedCompanies.value.length > 0) {
            // 사이드바에서 선택된 기업 우선 적용
            matchCompany = selectedCompanies.value.includes(post.company)
        } else if (selectedCompany.value !== 'ALL') {
            // 드롭다운 선택 적용
            matchCompany = post.company === selectedCompany.value
        }

        // 연도 필터
        const matchYear =
            selectedYear.value === 'ALL' ||
            String(post.year) === String(selectedYear.value)

        // 인증 상태 필터
        let matchVerified = true
        if (selectedVerified.value !== 'ALL') {
            if (selectedVerified.value === 'UNVERIFIED') {
                // NONE, PENDING, REJECTED 포함
                matchVerified = ['NONE', 'PENDING', 'REJECTED'].includes(post.status)
            } else {
                matchVerified = post.status === selectedVerified.value
            }
        }

        // 사이드바: 인증된 글만 보기
        const matchShowVerified =
            !showVerifiedOnly.value || post.status === 'APPROVED'

        return (
            matchKeyword &&
            matchCompany &&
            matchYear &&
            matchVerified &&
            matchShowVerified
        )
    })
})

// 최초 한 번만 전체 데이터 fetch
const fetchPosts = async () => {
    try {
        const res = await fetchCareerPosts()
        allPosts.value = res
    } catch (err) {
        console.error('❌ 게시글 불러오기 실패:', err)
    }
}
onMounted(fetchPosts)

// 이벤트 핸들러 (서버 재요청 없음)
const handleSearch = (keyword) => {
    searchKeyword.value = keyword
}
const handleCompanySelect = (val) => {
    selectedCompany.value = val
}
const handleYearSelect = (val) => {
    selectedYear.value = val
}
const handleVerifiedSelect = (val) => {
    selectedVerified.value = val
}

const resetFilters = () => {
    showVerifiedOnly.value = false
    selectedCompanies.value = []
    selectedCompany.value = 'ALL'
    selectedYear.value = 'ALL'
    selectedVerified.value = 'ALL'
    searchKeyword.value = ''
}

const updateFilters = (filters) => {
    showVerifiedOnly.value = filters.showVerifiedOnly
    selectedCompanies.value = [...filters.selectedCompanies]
}

const goToCreatePage = () => router.push('/career-info/post')

// 예시용 옵션 (필요 시 실제 API나 상수로 교체)
const companyOptions = [
    { label: '모든 기업', value: 'ALL' },
    { label: '삼성전자', value: '삼성전자' },
    { label: '카카오', value: '카카오' },
    { label: '네이버', value: '네이버' },
    { label: 'LG전자', value: 'LG전자' },
]
const yearOptions = [
    { label: '모든 년도', value: 'ALL' },
    { label: '2025', value: '_2025' },
    { label: '2024', value: '_2024' },
    { label: '2023', value: '_2023' },
]
const verifiedOptions = [
    { label: '전체 보기', value: 'ALL' },
    { label: '인증된 글만', value: 'APPROVED' },
    { label: '미인증 글만', value: 'UNVERIFIED' },
]
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
