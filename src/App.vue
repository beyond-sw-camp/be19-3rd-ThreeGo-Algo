<template>
  <div id="app" :class="{ 'full-page': hideHeaderFooter }">
    <!-- 회원가입, 로그인 페이지는 제외-->
    <Header v-if="!hideHeaderFooter" />

    <main class="main-content">
      <router-view />
    </main>

    <Footer v-if="!hideHeaderFooter" /> 
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

const route = useRoute()

const hideHeaderFooter = computed(() => {
  return route.path === '/signup' || route.path === '/login'
})

watch(hideHeaderFooter, (val) => {
  document.body.style.paddingTop = val ? '0px' : '70px'
}, { immediate: true })

</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
}

/* hideHeaderFooter가 true일 때 (회원가입/로그인 페이지) */
#app.full-page {
  display: block;  /* flex 대신 block */
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

#app.full-page .main-content {
  flex: none;  /* flex 속성 제거 */
  min-height: 100vh;
}

/* hideHeaderFooter가 false일 때 (일반 페이지) */
.main-content {
  flex: 1;
  background-color: #ffffff;
}
</style>