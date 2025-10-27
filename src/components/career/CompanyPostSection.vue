<template>
    <div class="post-section">
        <PostCount :count="posts.length" />
        <div class="post-list">
            <PostListItem v-for="post in posts" :key="post.id" :id="post.id" :title="post.title"
                :nickname="post.nickname" :rankName="post.rankName" :createdAt="post.createdAt" :status="post.status"
                :likeCount="post.likeCount" :commentCount="post.commentCount" />
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
</style>
