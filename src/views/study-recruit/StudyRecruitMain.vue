<template>
  <div class="study-recruit-page">
    <div class="study-recruit-main">
      <TabTitle title="스터디 모집" />

      <div class="banner-wrapper">
        <PageInfoBanner
          title="함께할 코알라를 찾아 성장하세요 🐨🌱"
          subtitle="코딩, 면접 준비해야 하는데… 의지가 부족하신가요? 동료들과 함께 준비해보세요!"
          :image="bannerImage"
        />
      </div>

      <div class="filter-search-action">
        <TabMenu :items="filterTabs" :onClick="handleFilterChange" />

        <div class="search-center">
          <SearchBar
            v-model="searchKeyword"
            placeholder="스터디명, 내용을 검색해보세요"
            buttonText="검색"
            @search="handleSearch"
          />
        </div>

        <CustomButton variant="primary" height="md" @click="goToCreatePage">
          + 스터디 모집하기
        </CustomButton>
      </div>

      <div class="divider"></div>

      <!-- ✅ 카드 목록 (이제 filteredStudies 사용) -->
      <div class="cards-container">
        <div v-if="filteredStudies.length > 0" class="card-grid">
          <StudyRecruitCard
            v-for="study in filteredStudies"
            :key="study.id"
            :status="study.status"
            :title="study.title"
            :period="study.period"
            :authorName="study.authorName"
            :rankName="study.rankName"
            :members="study.members"
            :comments="study.comments"
            @click="handleCardClick(study.id)"
          />
        </div>

        <div v-else-if="!isLoading" class="empty-state">
          <p>검색 결과가 없습니다.</p>
        </div>
      </div>

      <!-- ✅ 로딩 / 종료 -->
      <div v-if="isLoading" class="loading-indicator">
        <div class="spinner"></div>
        <p>로딩 중...</p>
      </div>

      <div v-if="!hasMore && filteredStudies.length > 0" class="end-message">
        <p>모든 스터디를 확인했습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import StudyRecruitCard from "@/components/study-recruit/StudyRecruitCard.vue";
import TabTitle from "@/components/common/TabTitle.vue";
import TabMenu from "@/components/common/TabMenu.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import PageInfoBanner from "@/components/common/PageInfoBanner.vue";
import CustomButton from "@/components/common/CustomButton.vue";
import bannerImage from "@/assets/images/banner_study_recruit.png";
import coreApi from "@/api/coreApi";

const router = useRouter();

// 상태 관리
const allStudies = ref([]);
const searchKeyword = ref("");
const activeFilter = ref("ALL");
const currentPage = ref(0);
const isLoading = ref(false);
const hasMore = ref(true);
const pageSize = 9;

// 필터 탭
const filterTabs = [
  { value: "ALL", label: "전체" },
  { value: "OPEN", label: "모집중" },
  { value: "CLOSED", label: "모집완료" },
];

// ✅ API 호출 (페이지네이션 포함)
const fetchStudies = async (page = 0) => {
  try {
    isLoading.value = true;

    const response = await coreApi.get("/study-recruit/posts", {
      params: { page, size: pageSize },
    });

    const data = response.data;
    const content = data.content || data;

    const newStudies = content.map((post) => ({
      id: post.id,
      status: post.status || "OPEN",
      title: post.title,
      period: `${post.startDate} ~ ${post.endDate}`,
      authorName: post.memberNickname || "익명",
      rankName: post.rankName || "코뉴비",
      members: post.capacity || 0,
      comments: post.commentCount || 0,
    }));

    if (page === 0) allStudies.value = newStudies;
    else allStudies.value.push(...newStudies);

    hasMore.value = !data.last && newStudies.length > 0;
    currentPage.value = page + 1;
  } catch (error) {
    console.error("❌ 스터디 목록 불러오기 실패:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ 필터링 + 검색
const filteredStudies = computed(() => {
  let result = allStudies.value;

  if (activeFilter.value !== "ALL") {
    result = result.filter((study) => study.status === activeFilter.value);
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(keyword) ||
        s.authorName.toLowerCase().includes(keyword)
    );
  }

  return result;
});

// ✅ 스크롤 감지
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= documentHeight - 200) {
    loadMoreStudies();
  }
};

const loadMoreStudies = async () => {
  if (isLoading.value || !hasMore.value) return;
  await fetchStudies(currentPage.value);
};

// ✅ 이벤트
const handleFilterChange = (item) => {
  activeFilter.value = item.value;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleCardClick = (studyId) => {
  router.push(`/study-recruit/${studyId}`);
};

const goToCreatePage = () => {
  router.push("/study-recruit/post");
};

// ✅ Lifecycle
onMounted(() => {
  fetchStudies(0);
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>


<style scoped>
.study-recruit-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.study-recruit-main {
  flex: 1;
  background-color: #fff;
  padding: 50px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.banner-wrapper {
  margin-top: 12px;
  margin-bottom: 36px;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.filter-search-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 24px;
  padding: 0 20px;
  box-sizing: border-box;
}

.search-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 500px;
}

.divider {
  height: 1px;
  background-color: #e6e6e6;
  margin-bottom: 30px;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.cards-container {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto 60px;
  padding: 0 20px;
  box-sizing: border-box;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  row-gap: 26px;
}

.empty-state {
  text-align: center;
  color: #999;
  font-size: 15px;
  padding: 100px 0;
}

.loading-indicator,
.end-message {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 20px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #0aa2eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .study-recruit-main {
    padding: 32px 16px 80px;
  }

  .filter-search-action {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 0;
  }

  .search-center {
    max-width: 100%;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
