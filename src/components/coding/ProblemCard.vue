<template>
  <el-card
    class="problem-card"
    shadow="hover"
    @click="onCardClick"
    :body-style="{ padding: '20px 20px 16px' }"
  >
    <!-- 상단 배지 -->
    <div class="badge-row">
      <div class="platform-tag" :style="{ background: platformStyle }">
        <span class="tag-text">{{ platformLabel }}</span>
      </div>
      <div class="difficulty-tag">
        <span class="tag-text">{{ difficulty }}</span>
      </div>
    </div>

    <!-- 제목 -->
    <p class="title">{{ problemTitle }}</p>

    <!-- 풀이수 / 외부 링크 -->
    <div class="meta">
      <div class="meta-item">
        <img src="@/assets/icons/post.svg" alt="풀이 아이콘" class="icon" />
        <span class="meta-label">등록된 풀이글</span>
        <span class="count-number">{{ postCount }}</span>
        <span class="count-unit">개</span>
      </div>

      <div class="meta-item">
        <img src="@/assets/icons/Vector.svg" alt="링크 아이콘" class="icon" />
        <span class="meta-label">문제사이트 바로가기</span>
        <a
          v-if="link"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="external-link"
          @click.stop
        >
          클릭
        </a>
        <span v-else class="no-link">없음</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  platform: 'BOJ' | 'PGS' | 'ETC'
  difficulty: string
  problemTitle: string
  postCount: number
  link?: string
}>()

const emit = defineEmits(['click'])

const platformLabel = computed(() => {
  switch (props.platform) {
    case 'BOJ': return '백준'
    case 'PGS': return '프로그래머스'
    case 'ETC': return '리트코드'
    default: return props.platform
  }
})

const platformStyle = computed(() => {
  switch (props.platform) {
    case 'BOJ': return 'linear-gradient(135deg, #0BB0FF, #1CCAFF)'
    case 'PGS': return 'linear-gradient(135deg, #66cc8a, #82d09a)'
    case 'ETC': return 'linear-gradient(135deg, #C96C6C, #E57B7B)'
    default: return '#bdbebe'
  }
})

function onCardClick() {
  emit('click', { title: props.problemTitle })
}
</script>

<style scoped>
.problem-card {
  width: 100%;
  border-radius: 14px;
  transition: all 0.15s ease-in-out;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  cursor: pointer;
}

.problem-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.07);
  transform: translateY(-4px);
}

/* 상단 태그 줄 */
.badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.platform-tag,
.difficulty-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 20px;
}

.difficulty-tag {
  background-color: #bdbebe;
}

.tag-text {
  color: white;
  font-weight: 700;
  font-size: 11px;
  font-family: 'Noto Sans KR', sans-serif;
}

/* 제목 */
.title {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: #111;
  margin: 4px 0 12px 0;
}

/* 메타 */
.meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon {
  width: 14px;
  height: 14px;
  opacity: 0.8;
}

.meta-label {
  color: #888;
  font-weight: 500;
  font-size: 13px;
}

.count-number {
  color: #DC6A6A;
  font-weight: 700;
  font-size: 13px;
}

.count-unit {
  color: #888;
  font-size: 13px;
  font-weight: 600;
}

.external-link {
  color: #0AA2EB;
  text-decoration: underline;
  font-weight: 700;
  font-size: 13px;
}
.external-link:hover {
  color: #0975b3;
}

.no-link {
  color: #ccc;
}
</style>
