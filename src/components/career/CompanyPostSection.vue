<template>
    <div class="post-section">
        <PostCount :count="posts.length" />
        <div class="post-list">
            <router-link v-for="post in posts" :key="post.id" :to="`/career-info/${post.id}`" class="post-link">
                <PostListItem :id="post.id" :title="post.title" :nickname="post.nickname" :rankName="post.rankName"
                    :createdAt="post.createdAt" :status="post.status" :likeCount="post.likeCount"
                    :company="post.company" :year="post.year" :commentCount="post.commentCount" />
            </router-link>
        </div>
    </div>
</template>

<script setup>
import PostCount from '@/components/common/PostCount.vue'
import PostListItem from '@/components/common/PostListItem.vue'
defineProps({ posts: Array })
</script>

<style scoped>
.post-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.post-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.post-link {
    text-decoration: none;
    color: inherit;
}

.post-link:hover {
    background-color: #f9f9f9;
    border-radius: 8px;
}
</style>
