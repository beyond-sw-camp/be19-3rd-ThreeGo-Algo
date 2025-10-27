<template>
    <div class="career-post-detail-page">
        <div class="career-post-detail">
            <!-- 상단: 뒤로가기 -->
            <div class="header-row">
                <BackButton text="목록으로 돌아가기" to="/career-info" />
            </div>

            <!-- 본문 -->
            <div class="content-layout">
                <!-- 왼쪽: 게시글 -->
                <div class="post-section">
                    <!-- 제목 -->
                    <!-- 제목 -->
                    <div class="post-title-row">
                        <h2 class="post-title">{{ post.title }}</h2>
                        <img v-if="post.status === 'APPROVED'" src="@/assets/icons/certification.svg"
                            class="verified-icon" />
                    </div>

                    <!-- 작성자 정보 -->
                    <div class="author-info">
                        <MiniProfile :nickname="post.nickname" :rankName="post.rankName" />
                        <span class="post-date">{{ post.createdAt }}</span>
                        <button class="action-link">수정</button>
                        <button class="action-link">삭제</button>
                    </div>

                    <!-- 본문 -->
                    <div class="post-content">
                        <p v-html="formattedContent"></p>
                    </div>

                    <!-- 댓글 -->
                    <Comment :comments="comments" :currentUser="currentUser" @submit-comment="addComment" />
                </div>

                <!-- 오른쪽: 관련글 -->
                <aside class="side-box">
                    <RelatedCompanyPosts :company="post.company" :posts="relatedPosts" @write="goWritePage" />
                </aside>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BackButton from "@/components/common/BackButton.vue";
import MiniProfile from "@/components/common/MiniProfile.vue";
import Comment from "@/components/common/Comment.vue";
import RelatedCompanyPosts from "@/components/career/RelatedCompanyPosts.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 더미 게시글 데이터
const post = ref({
    id: 1,
    title: "2025년 하반기 카카오 공채 1차 코테 후기",
    nickname: "라이언",
    rankName: "코뉴비",
    createdAt: "2025.10.13 14:06",
    status: "APPROVED",
    company: "카카오",
    content: `1번
문제를 처음 읽었을 때 살짝 복잡하게 느껴졌다. 그런데 막상 풀이를 작성하다보니 그렇게 복잡하지는 않은 구현 문제였던 것 같다.
 
2번 (신호등)
각 신호등마다 일정한 주기가 존재하므로, 나머지 연산을 활용하면 특정 시간에 신호등이 무슨 색인지 판별할 수 있을 것이라 생각했다. 또한 신호등 개수의 최댓값과 신호등 주기의 최댓값이 크지 않아서, 최소공배수를 구한 후 최소공배수 이하의 모든 값을 조사하는 방식이 시간 안에 가능할 것이라고 생각했다. 수학 + 완전탐색?
 
3번 (분배노드 그래프)
이런 문제에 나름 강한 편이라고 생각했기 때문에 시간을 들여서 풀이를 구상해봤다. 여러 가지 방법을 생각해봤는데, 증명이 쉽게 되지 않았다. 이 이상으로 시간을 더 들이는 것은 위험하다고 판단하여 우선 스킵하고 다른 문제로 넘어갔다.
 
4번 (바이러스)
제한이 크지 않아서 일단 완전탐색의 느낌으로 접근해봤다. 최대 10번까지 파이프를 열 수 있고, 파이프 종류는 직전에 선택한 종류와 다르게 선택하면 모든 경우의 수를 탐색하기에 충분하므로, 최대 3 * 2^9 = 1536가지의 경우가 나올 수 있고 시간 안에 충분히 모든 경우를 탐색할 수 있을 것이라고 판단했다.
 
5번 (앱 밀기)
시뮬레이션 문제였다. 일단 풀 수 있을 거 같아서 구현을 했는데, 기본 테케 중 하나에서 답이 나오지 않았다. 한번 떼었다가 다시 붙힌 앱은 움직이지 않도록 구현했는데, 밀린 앱이 한바퀴 돌아서 다시 붙힌 앱을 또 밀게 되는 경우가 있다는 것을 간과했다. 그래서 이 부분을 고치다보니까 또 다른 오류가 발생하고 다시 고치고.. 의 반복이었다.
 
구현을 좀 더 잘했으면 쉽게 풀 수 있었을까? 라는 아쉬움과 답답함이 크게 남은 문제였다. 작은 화면에서 자동완성이 안되는 환경으로 긴 구현 문제를 풀이하려고 하니 디버깅과 리팩토링에도 많은 어려움을 겪었다. 리팩토링도 물론 고려했지만, 현재 응시 환경과 남은 시간을 고려하면 위험 부담이 더 크다고 판단해서 로직 보완에 더 초점을 두고 풀이를 이어나갔다. 그런데 다른 문제에 대한 제출을 실패하게 되면서 결과적으로는 아쉬운 선택이 되었던 것 같다.`,
});

const formattedContent = computed(() => post.value.content.replace(/\n/g, "<br>"));

// 관련글 더미 데이터
const relatedPosts = ref([
    { id: 2, title: "카카오 코테 2차 후기 ✍️", createdAt: "2025.10.13", likeCount: 123, commentCount: 12 },
    { id: 3, title: "카카오 2025 코테 문제 복기", createdAt: "2025.10.12", likeCount: 88, commentCount: 5 },
]);

// 댓글
const currentUser = ref({ nickname: "나", rankName: "코뉴비" });
const comments = ref([
    { id: 1, nickname: "하이요", rankName: "코뉴비", content: "코테 준비가 막막했는데 공유 감사합니다! 덕분에 잘 준비할 수 있을 것 같아요 👍👍", createdAt: "2025.10.13 16:06" },
    { id: 2, nickname: "마요네즈", rankName: "코잘알", content: "좀 치네", createdAt: "2025.10.14 19:12" },
]);

// 댓글 추가 함수
const addComment = (text) => {
    comments.value.push({
        id: comments.value.length + 1,
        nickname: currentUser.value.nickname,
        rankName: currentUser.value.rankName,
        content: text,
        createdAt: new Date().toLocaleString("ko-KR"),
    });
};

const goWritePage = () => {
    router.push("/career-info/post");
};
</script>

<style scoped>
.career-post-detail-page {
    display: flex;
    justify-content: center;
    background-color: #fff;
    min-height: 100vh;
    padding: 40px 0;
}

.career-post-detail {
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
}

.header-row {
    margin-bottom: 16px;
}

.content-layout {
    display: flex;
    gap: 36px;
    align-items: flex-start;
}

.post-section {
    flex: 1;
    max-width: 740px;
}

.post-title {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1a1a1a;
}

.post-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.post-title {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
}

.verified-icon {
    width: 30px;
}

.author-info {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 16px;
    margin-bottom: 24px;
}

.post-date {
    font-size: 14px;
    color: #666;
}

.action-link {
    font-size: 13px;
    color: #666;
    background: none;
    border: none;
    cursor: pointer;
}

.action-link:hover {
    color: #0aa2eb;
    text-decoration: underline;
}

.post-content {
    font-size: 15px;
    line-height: 1.8;
    color: #333;
    white-space: pre-wrap;
    margin-bottom: 40px;
}

/* 우측 박스 */
.side-box {
    width: 340px;
    flex-shrink: 0;
    position: sticky;
    top: 20px;
}
</style>
