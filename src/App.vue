<template>
  <div id="app" :class="{ 'full-page': hideHeaderFooter }">
    <Header v-if="showDefaultHeader" />

    <StudyHeader v-if="showStudyHeader" />

    <main class="main-content">
      <router-view />
    </main>
    <RankUpPopup v-model:visible="showRankUpPopup" :rankName="newRankName" />
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/common/Header.vue'
import StudyHeader from './components/study/StudyHeader.vue'
import Footer from './components/common/Footer.vue'
import RankUpPopup from '@/components/common/RankUpPopup.vue'
import { useRankWatcher } from '@/hooks/useRankWatcher'

const route = useRoute()

const hideHeaderFooter = computed(() => {
  return route.path === '/signup' || route.path === '/login'
})

const isStudyPage = computed(() => {
  return route.path.startsWith('/study/')
})

const showDefaultHeader = computed(() => {
  return !hideHeaderFooter.value && !isStudyPage.value
})

const showStudyHeader = computed(() => {
  return isStudyPage.value
})

const showFooter = computed(() => {
  return !hideHeaderFooter.value
})

watch(hideHeaderFooter, (val) => {
  document.body.style.paddingTop = val ? '0px' : '70px'
}, { immediate: true })

const memberId = localStorage.getItem('memberId')

let showRankUpPopup = null
let newRankName = null

if (memberId) {
  const watcher = useRankWatcher(memberId)
  showRankUpPopup = watcher.showRankUpPopup
  newRankName = watcher.newRankName
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}

#app.full-page {
  display: block;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

#app.full-page .main-content {
  flex: none;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: #ffffff;
}
</style>