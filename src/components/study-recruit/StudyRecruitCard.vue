<template>
  <div class="study-card" @click="handleClick">
    <!-- 모집 상태 배지 -->
    <RecruitBadge :status="status" />

    <!-- 제목 -->
    <h3 class="title">{{ title }}</h3>

    <!-- 모집 기간 -->
    <p class="period">{{ period }}</p>

    <!-- 하단 프로필 + 메타 정보 -->
    <div class="footer">
      <!-- 작성자 -->
      <MiniProfile :nickname="authorName" :rankName="rankName" />

      <!-- 신청자 수 / 댓글 수 -->
      <div class="meta">
        <EmojiText type="grayPeople" :count="members" />
        <EmojiText type="grayComment" :count="comments" />
      </div>
    </div>
  </div>
</template>

<script setup>
import RecruitBadge from '@/components/study-recruit/RecruitBadge.vue'
import MiniProfile from '@/components/common/MiniProfile.vue'
import EmojiText from '@/components/common/EmojiText.vue'

const props = defineProps({
  status: { type: String, required: true }, // OPEN | CLOSED
  title: { type: String, required: true },
  period: { type: String, required: true },
  authorName: { type: String, required: true },
  rankName: { type: String, required: true },
  members: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.study-card {
  width: 100%;
  max-width: 320px;
  min-width: 250px;
  border: 1px solid #e4e4e4;
  border-radius: 14px;
  padding: 14px 18px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.study-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.study-card:active {
  transform: translateY(0);
}

.title {
  font-size: 18px;
  font-weight: 700;
  margin: 4px 0;
  color: #222;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
}

.period {
  font-size: 13px;
  color: #888;
  white-space: nowrap;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  gap: 8px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .study-card {
    max-width: 100%;
  }

  .title {
    font-size: 15px;
  }

  .period {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .study-card {
    padding: 12px 14px;
  }

  .footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .meta {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
