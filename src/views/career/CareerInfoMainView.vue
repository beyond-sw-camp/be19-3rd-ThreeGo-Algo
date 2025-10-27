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

// 상태
const searchKeyword = ref('')
const selectedCompany = ref('ALL')
const selectedYear = ref('ALL')
const selectedVerified = ref('ALL')
const showVerifiedOnly = ref(false)
const selectedCompanies = ref([])

const allPosts = ref([])

// 게시글 불러오기
const fetchPosts = async () => {
    try {
        const params = {}
        if (selectedCompany.value !== 'ALL') params.company = selectedCompany.value
        if (selectedYear.value !== 'ALL') params.year = selectedYear.value
        if (selectedVerified.value !== 'ALL') params.status = selectedVerified.value
        if (searchKeyword.value) params.keyword = searchKeyword.value

        const res = await fetchCareerPosts(params)
        allPosts.value = res
    } catch (err) {
        console.error('❌ 게시글 불러오기 실패:', err)
    }
}

// 화면 로드 시 초기 데이터 가져오기
onMounted(() => {
    fetchPosts()
})

// 필터링은 서버 기반으로 (즉시 fetch)
const handleSearch = async (keyword) => {
    searchKeyword.value = keyword
    await fetchPosts()
}
const handleCompanySelect = async (val) => {
    selectedCompany.value = val
    await fetchPosts()
}
const handleYearSelect = async (val) => {
    selectedYear.value = val
    await fetchPosts()
}
const handleVerifiedSelect = async (val) => {
    selectedVerified.value = val
    await fetchPosts()
}

const resetFilters = () => {
    showVerifiedOnly.value = false
    selectedCompanies.value = []
    selectedCompany.value = 'ALL'
    selectedYear.value = 'ALL'
    selectedVerified.value = 'ALL'
    fetchPosts()
}
const updateFilters = (filters) => {
    showVerifiedOnly.value = filters.showVerifiedOnly
    selectedCompanies.value = filters.selectedCompanies
    fetchPosts()
}

const goToCreatePage = () => router.push('/career-info/post')

const displayedPosts = computed(() => allPosts.value)
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
