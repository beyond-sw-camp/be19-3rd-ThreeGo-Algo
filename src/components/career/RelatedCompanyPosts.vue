<template>
    <div class="related-box">
        <!-- 제목 -->
        <h3 class="title">
            더 많은 <span class="company">{{ company }}</span> 정보글 보기
        </h3>

        <!-- 게시글 목록 -->
        <ul class="related-list">
            <li v-for="post in posts" :key="post.id" class="related-item">
                <router-link :to="`/career-info/${post.id}`" class="item-link">
                    <div class="title-row">
                        <span class="post-title">{{ post.title }}</span>
                        <img v-if="post.status === 'APPROVED'" src="@/assets/icons/certification.svg" alt="certified"
                            class="verified-icon" />
                    </div>

                    <div class="meta-row">
                        <span class="date">{{ post.createdAt }}</span>
                        <div class="icons">
                            <span class="icon-group">
                                <img src="@/assets/icons/gray_like.svg" alt="like" />
                                {{ post.likeCount }}
                            </span>
                            <span class="icon-group">
                                <img src="@/assets/icons/gray_comment.svg" alt="comment" />
                                {{ post.commentCount }}
                            </span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>

        <!-- 작성 버튼 -->
        <CustomButton variant="primary" width="100%" @click="handleWriteClick">
            + 기업 정보 공유글 작성하기
        </CustomButton>
    </div>
</template>

<script setup>
import CustomButton from "@/components/common/CustomButton.vue";

const props = defineProps({
    company: { type: String, required: true },
    posts: { type: Array, required: true },
});

const emit = defineEmits(["write"]);

const handleWriteClick = () => {
    emit("write");
};
</script>

<style scoped>
.related-box {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    padding: 24px 20px;
}

.title {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 18px;
}

.company {
    color: #0aa2eb;
}

.related-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.related-item {
    border-bottom: 1px solid #eee;
    padding-bottom: 14px;
}

.item-link {
    text-decoration: none;
    color: inherit;
}

.title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
}

.post-title {
    font-size: 15px;
    font-weight: 400;
    color: #1a1a1a;
}

.item-link:hover .post-title {
    color: #0aa2eb;
}

.verified-icon {
    width: 18px;
    height: 18px;
}

.meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #888;
}

.icons {
    display: flex;
    gap: 10px;
}

.icon-group {
    display: flex;
    align-items: center;
    gap: 4px;
}

.icon-group img {
    width: 16px;
    height: 16px;
    opacity: 0.7;
}
</style>
