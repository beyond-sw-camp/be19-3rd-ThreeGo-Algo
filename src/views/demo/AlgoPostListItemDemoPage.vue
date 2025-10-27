<template>
    <div>
        <AlgoPostListItem v-for="item in algoPosts" :key="item.postId" :id="item.postId" :title="item.title"
            :quizIds="item.quizIds" :solvedQuizIds="item.solvedQuizIds" @click="onClick(item.postId)" />
    </div>
</template>

<script setup>
import AlgoPostListItem from '@/components/algo/AlgoPostListItem.vue';
import { ref } from 'vue';

const algoPosts = ref([
    { postId: 1, title: '알고리즘 1', quizIds: [1, 2, 3, 10, 11, 12, 13], solvedQuizIds: [1, 3] },
    { postId: 2, title: '알고리즘 2', quizIds: [4, 6] },
    { postId: 3, title: '알고리즘 3', quizIds: [8], solvedQuizIds: [8] },
]);

function onClick(id) {
    console.log('Clicked post with id:', id);
}
</script>

<style scoped></style>